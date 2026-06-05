/**
 * lead-finder.js
 * Google Places API lead finder for trade contractors.
 * Finds HVAC, plumbing, electrical, flooring, and roofing businesses
 * in a given city/state and returns enriched lead objects.
 */

const CHAIN_BLACKLIST = ['home depot', 'lowes', "lowe's", 'menards'];
const MAX_PAGES = 3;

/**
 * Extracts the domain from a URL string.
 * @param {string} url
 * @returns {string|null}
 */
function extractDomain(url) {
  if (!url) return null;
  try {
    const parsed = new URL(url.startsWith('http') ? url : `https://${url}`);
    // Strip www prefix so Hunter.io domain search works cleanly
    return parsed.hostname.replace(/^www\./, '');
  } catch {
    return null;
  }
}

/**
 * Returns true if the business name matches a known chain/franchise.
 * @param {string} name
 * @returns {boolean}
 */
function isChain(name) {
  const lower = name.toLowerCase();
  return CHAIN_BLACKLIST.some((chain) => lower.includes(chain));
}

/**
 * Maps a Google Places result object to our normalized lead shape.
 * @param {object} place
 * @returns {object}
 */
function mapPlace(place) {
  const website = place.website || null;
  return {
    name: place.name || '',
    address: place.formatted_address || '',
    phone: place.formatted_phone_number || place.international_phone_number || null,
    website,
    placeId: place.place_id || null,
    rating: place.rating || null,
    reviewCount: place.user_ratings_total || 0,
    domain: extractDomain(website),
  };
}

/**
 * Fetches a single page of Google Places Text Search results.
 * Returns { results, nextPageToken }.
 *
 * @param {string} query
 * @param {string} apiKey
 * @param {string|null} pageToken
 * @returns {Promise<{ results: object[], nextPageToken: string|null }>}
 */
async function fetchPage(query, apiKey, pageToken = null) {
  let url =
    `https://maps.googleapis.com/maps/api/place/textsearch/json` +
    `?query=${encodeURIComponent(query)}&type=establishment&key=${apiKey}`;

  if (pageToken) {
    url += `&pagetoken=${encodeURIComponent(pageToken)}`;
  }

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Google Places HTTP ${response.status}: ${response.statusText}`);
  }

  const data = await response.json();

  if (data.status !== 'OK' && data.status !== 'ZERO_RESULTS') {
    throw new Error(`Google Places API error: ${data.status} — ${data.error_message || ''}`);
  }

  return {
    results: data.results || [],
    nextPageToken: data.next_page_token || null,
  };
}

/**
 * Waits for ms milliseconds. Google requires a short delay before using
 * a next_page_token (typically ~2 seconds).
 * @param {number} ms
 * @returns {Promise<void>}
 */
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Finds trade contractor leads via Google Places Text Search API.
 * Paginates up to 3 pages (up to 60 results) and filters out chains.
 *
 * @param {string} trade    e.g. "HVAC", "plumbing", "electrical"
 * @param {string} city     e.g. "Austin"
 * @param {string} state    e.g. "TX"
 * @param {string} apiKey   Google Places API key
 * @returns {Promise<Array<{
 *   name: string,
 *   address: string,
 *   phone: string|null,
 *   website: string|null,
 *   placeId: string|null,
 *   rating: number|null,
 *   reviewCount: number,
 *   domain: string|null
 * }>>}
 */
export async function findLeads(trade, city, state, apiKey) {
  const query = `${trade} contractor ${city} ${state}`;
  const allLeads = [];
  let pageToken = null;
  let page = 0;

  while (page < MAX_PAGES) {
    try {
      // Google requires a 2-second pause before using a next_page_token
      if (pageToken) {
        await sleep(2200);
      }

      const { results, nextPageToken } = await fetchPage(query, apiKey, pageToken);

      for (const place of results) {
        if (isChain(place.name || '')) continue;
        allLeads.push(mapPlace(place));
      }

      pageToken = nextPageToken;
      page++;

      if (!pageToken) break;
    } catch (err) {
      console.error(`[lead-finder] Error on page ${page + 1} for "${query}": ${err.message}`);
      break; // Stop pagination on error; return what we have so far
    }
  }

  return allLeads;
}
