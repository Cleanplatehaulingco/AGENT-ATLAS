/**
 * email-enricher.js
 * Hunter.io email finder for trade contractor leads.
 * Resolves the best contact email for a given domain/company.
 */

const HUNTER_BASE = 'https://api.hunter.io/v2/domain-search';
const MIN_CONFIDENCE = 70;
const RATE_LIMIT_MS = 1000; // 1 request per second

/**
 * Selects the best email from a Hunter.io domain-search response.
 * Preference order:
 *   1. Personal email with confidence >= MIN_CONFIDENCE
 *   2. Any email (generic/role) with confidence >= MIN_CONFIDENCE
 *   3. null if nothing qualifies
 *
 * @param {object[]} emails  Array from Hunter.io response data.emails
 * @returns {object|null}    { email, firstName, lastName, confidence, position }
 */
function pickBestEmail(emails) {
  if (!Array.isArray(emails) || emails.length === 0) return null;

  const qualified = emails.filter((e) => (e.confidence || 0) >= MIN_CONFIDENCE);
  if (qualified.length === 0) return null;

  // Prefer personal over generic/role addresses
  const personal = qualified.find((e) => e.type === 'personal');
  const chosen = personal || qualified[0];

  return {
    email: chosen.value,
    firstName: chosen.first_name || null,
    lastName: chosen.last_name || null,
    confidence: chosen.confidence,
    position: chosen.position || null,
  };
}

/**
 * Rate-limit helper — resolves after RATE_LIMIT_MS milliseconds.
 * @returns {Promise<void>}
 */
function rateLimit() {
  return new Promise((resolve) => setTimeout(resolve, RATE_LIMIT_MS));
}

/**
 * Finds the best contact email for a company domain via Hunter.io.
 *
 * @param {string} domain       e.g. "acmeplumbing.com"
 * @param {string} companyName  e.g. "Acme Plumbing"
 * @param {string} apiKey       Hunter.io API key
 * @returns {Promise<{
 *   email: string,
 *   firstName: string|null,
 *   lastName: string|null,
 *   confidence: number,
 *   position: string|null
 * }|null>}
 */
export async function enrichLead(domain, companyName, apiKey) {
  if (!domain) return null;

  // Enforce rate limit before every request
  await rateLimit();

  const url =
    `${HUNTER_BASE}` +
    `?domain=${encodeURIComponent(domain)}` +
    `&company=${encodeURIComponent(companyName)}` +
    `&api_key=${apiKey}`;

  let response;
  try {
    response = await fetch(url);
  } catch (err) {
    console.error(`[email-enricher] Network error for domain "${domain}": ${err.message}`);
    return null;
  }

  if (response.status === 429) {
    console.warn(`[email-enricher] Rate limited by Hunter.io for domain "${domain}". Skipping.`);
    return null;
  }

  if (!response.ok) {
    console.error(
      `[email-enricher] Hunter.io HTTP ${response.status} for domain "${domain}"`
    );
    return null;
  }

  let payload;
  try {
    payload = await response.json();
  } catch (err) {
    console.error(`[email-enricher] Failed to parse Hunter.io response for "${domain}": ${err.message}`);
    return null;
  }

  if (payload.errors && payload.errors.length > 0) {
    console.error(
      `[email-enricher] Hunter.io API error for "${domain}": ${JSON.stringify(payload.errors)}`
    );
    return null;
  }

  const emails = payload.data?.emails || [];
  return pickBestEmail(emails);
}
