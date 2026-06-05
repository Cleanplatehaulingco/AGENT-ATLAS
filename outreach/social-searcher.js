/**
 * social-searcher.js
 * Web and social intelligence gatherer for TradeOpsVault outreach.
 * Finds decision makers, checks job postings, and searches LinkedIn.
 */

const USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';
const RATE_LIMIT_MS = 1000; // 1 second between requests

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Fetches a URL with a realistic User-Agent. Returns null on error.
 * Handles 429/captcha gracefully.
 */
async function safeFetch(url) {
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': USER_AGENT,
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
      },
      signal: AbortSignal.timeout(8000),
    });

    if (response.status === 429 || response.status === 403) {
      console.warn(`[social-searcher] Got ${response.status} for ${url} — returning null`);
      return null;
    }

    if (!response.ok) return null;

    return await response.text();
  } catch (err) {
    // Timeout, network error, CAPTCHA redirect, etc.
    return null;
  }
}

/**
 * Extracts an owner/founder name from HTML text using regex patterns.
 */
function extractOwnerFromHtml(html) {
  if (!html) return null;

  const patterns = [
    // "Founded by John Smith"
    /founded\s+by\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+){1,2})/i,
    // "Owner: John Smith" or "Owner - John Smith"
    /\bowner[:\s\-–]+([A-Z][a-z]+(?:\s+[A-Z][a-z]+){1,2})/i,
    // "President John Smith" or "President: John Smith"
    /\bpresident[:\s\-–]+([A-Z][a-z]+(?:\s+[A-Z][a-z]+){1,2})/i,
    // "CEO John Smith"
    /\bCEO[:\s\-–]+([A-Z][a-z]+(?:\s+[A-Z][a-z]+){1,2})/i,
    // "Principal John Smith"
    /\bprincipal[:\s\-–]+([A-Z][a-z]+(?:\s+[A-Z][a-z]+){1,2})/i,
    // "Founder John Smith"
    /\bfounder[:\s\-–]+([A-Z][a-z]+(?:\s+[A-Z][a-z]+){1,2})/i,
    // JSON-LD or meta: "name": "John Smith"
    /"name"\s*:\s*"([A-Z][a-z]+(?:\s+[A-Z][a-z]+){1,2})"/,
  ];

  for (const pattern of patterns) {
    const match = html.match(pattern);
    if (match && match[1]) {
      const name = match[1].trim();
      // Sanity check: at least 2 words, no HTML
      if (name.split(' ').length >= 2 && !name.includes('<')) {
        return name;
      }
    }
  }
  return null;
}

/**
 * Extracts a title from matched text.
 */
function extractTitleFromContext(html, name) {
  if (!html || !name) return null;
  const titleMap = [
    { pattern: /founded\s+by/i, title: 'Founder' },
    { pattern: /\bowner\b/i, title: 'Owner' },
    { pattern: /\bpresident\b/i, title: 'President' },
    { pattern: /\bCEO\b/, title: 'CEO' },
    { pattern: /\bprincipal\b/i, title: 'Principal' },
    { pattern: /\bfounder\b/i, title: 'Founder' },
  ];
  for (const { pattern, title } of titleMap) {
    if (pattern.test(html)) return title;
  }
  return null;
}

// ─── findDecisionMaker ────────────────────────────────────────────────────────

/**
 * Finds the decision maker for a business via website pages and Google fallback.
 *
 * @param {string} businessName
 * @param {string} website
 * @param {string} city
 * @returns {Promise<{ name: string|null, title: string|null, source: 'website'|'google'|null }>}
 */
export async function findDecisionMaker(businessName, website, city) {
  // Step 1: Try website pages
  if (website) {
    const base = website.replace(/\/$/, '');
    const pagesToTry = ['/about', '/team', '/contact'];

    for (const page of pagesToTry) {
      try {
        const html = await safeFetch(`${base}${page}`);
        await sleep(RATE_LIMIT_MS);

        if (html) {
          const name = extractOwnerFromHtml(html);
          if (name) {
            const title = extractTitleFromContext(html, name);
            return { name, title, source: 'website' };
          }
        }
      } catch {
        // continue to next page
      }
    }
  }

  // Step 2: Google search fallback
  try {
    const query = encodeURIComponent(
      `${businessName} ${city} owner OR "founded by" OR president site:linkedin.com`
    );
    const googleUrl = `https://www.google.com/search?q=${query}&num=3`;

    const html = await safeFetch(googleUrl);
    await sleep(RATE_LIMIT_MS);

    if (html) {
      // Parse first 3 result snippets for name patterns
      const name = extractOwnerFromHtml(html);
      if (name) {
        const title = extractTitleFromContext(html, name);
        return { name, title, source: 'google' };
      }
    }
  } catch {
    // Google blocked or error
  }

  return { name: null, title: null, source: null };
}

// ─── checkJobPostings ────────────────────────────────────────────────────────

/**
 * Checks whether a business is actively hiring.
 *
 * @param {string} businessName
 * @param {string} city
 * @param {string} trade
 * @returns {Promise<{ isHiring: boolean, jobTitle: string|null, source: string|null }>}
 */
export async function checkJobPostings(businessName, city, trade) {
  try {
    const query1 = encodeURIComponent(
      `${businessName} ${city} ${trade} jobs site:indeed.com OR site:linkedin.com/jobs`
    );
    const html1 = await safeFetch(`https://www.google.com/search?q=${query1}&num=5`);
    await sleep(RATE_LIMIT_MS);

    if (html1) {
      // Check for job posting signals
      const jobSignals = [
        /indeed\.com\/viewjob/i,
        /linkedin\.com\/jobs/i,
        /apply\s+now/i,
        /job\s+opening/i,
        /now\s+hiring/i,
        /we('re|\s+are)\s+hiring/i,
        /position\s+available/i,
        /careers\s+at/i,
      ];

      const hasJobSignals = jobSignals.some((p) => p.test(html1));

      if (hasJobSignals) {
        // Try to extract a job title
        const titleMatch = html1.match(
          /\b(HVAC\s+Tech(?:nician)?|Plumb(?:er|ing\s+Tech)|Electrician|Service\s+Tech(?:nician)?|Field\s+Tech(?:nician)?|Install(?:er|ation\s+Tech)|Apprentice|Mechanic)\b/i
        );
        const jobTitle = titleMatch ? titleMatch[1] : trade + ' Technician';
        return { isHiring: true, jobTitle, source: 'indeed/linkedin' };
      }
    }

    // Also try a broader hiring search
    const query2 = encodeURIComponent(`${businessName} hiring ${trade} ${city}`);
    const html2 = await safeFetch(`https://www.google.com/search?q=${query2}&num=3`);
    await sleep(RATE_LIMIT_MS);

    if (html2) {
      const hiringMatch = html2.match(/now\s+hiring|we('re|\s+are)\s+hiring|job\s+opening/i);
      if (hiringMatch) {
        return { isHiring: true, jobTitle: null, source: 'web_search' };
      }
    }
  } catch (err) {
    console.warn(`[social-searcher] checkJobPostings error for ${businessName}: ${err.message}`);
  }

  return { isHiring: false, jobTitle: null, source: null };
}

// ─── searchLinkedIn ───────────────────────────────────────────────────────────

/**
 * Searches for a company's LinkedIn page via Google.
 *
 * @param {string} businessName
 * @param {string} city
 * @returns {Promise<{ found: boolean, url: string|null, employeeCount: string|null }>}
 */
export async function searchLinkedIn(businessName, city) {
  try {
    const query = encodeURIComponent(`${businessName} ${city} site:linkedin.com/company`);
    const html = await safeFetch(`https://www.google.com/search?q=${query}&num=3`);
    await sleep(RATE_LIMIT_MS);

    if (html) {
      // Look for a LinkedIn company URL in results
      const urlMatch = html.match(/linkedin\.com\/company\/([a-zA-Z0-9\-_]+)/);
      if (urlMatch) {
        const url = `https://www.linkedin.com/company/${urlMatch[1]}`;

        // Try to parse employee count from snippet
        const employeeMatch = html.match(/(\d+(?:,\d+)?(?:\+)?)\s*employee/i);
        const employeeCount = employeeMatch ? employeeMatch[1] : null;

        return { found: true, url, employeeCount };
      }
    }
  } catch (err) {
    console.warn(`[social-searcher] searchLinkedIn error for ${businessName}: ${err.message}`);
  }

  return { found: false, url: null, employeeCount: null };
}

// ─── enrichLead ───────────────────────────────────────────────────────────────

/**
 * Runs all social searches in parallel and returns an enriched lead object.
 * Never throws — returns nulls on any failure.
 *
 * @param {object} lead - { name, trade, city, website, ... }
 * @returns {Promise<object>} enriched lead
 */
export async function enrichLead(lead) {
  const { name, trade, city, website } = lead;

  let decisionMaker = { name: null, title: null, source: null };
  let hiringInfo = { isHiring: false, jobTitle: null, source: null };
  let linkedIn = { found: false, url: null, employeeCount: null };

  try {
    [decisionMaker, hiringInfo, linkedIn] = await Promise.all([
      findDecisionMaker(name, website, city).catch(() => ({ name: null, title: null, source: null })),
      checkJobPostings(name, city, trade).catch(() => ({ isHiring: false, jobTitle: null, source: null })),
      searchLinkedIn(name, city).catch(() => ({ found: false, url: null, employeeCount: null })),
    ]);
  } catch (err) {
    console.warn(`[social-searcher] enrichLead parallel error for ${name}: ${err.message}`);
  }

  return {
    ...lead,
    decisionMaker,
    isHiring: hiringInfo.isHiring,
    jobTitle: hiringInfo.jobTitle,
    hiringSource: hiringInfo.source,
    linkedIn,
    decisionMakerFound: !!(decisionMaker && decisionMaker.name),
  };
}
