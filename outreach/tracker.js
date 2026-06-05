/**
 * tracker.js
 * Outreach tracking system for TradeOpsVault.
 * Logs and manages all outreach activity in NDJSON format.
 *
 * Data file: ./outreach-log.json (one JSON object per line)
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import https from 'https';
import http from 'http';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const LOG_FILE = path.resolve(__dirname, 'outreach-log.json');

// ─── File helpers ─────────────────────────────────────────────────────────────

/**
 * Reads all records from the NDJSON log file.
 * Returns an empty array if the file doesn't exist or is empty.
 * @returns {object[]}
 */
function readLog() {
  try {
    if (!fs.existsSync(LOG_FILE)) return [];
    const raw = fs.readFileSync(LOG_FILE, 'utf8').trim();
    if (!raw) return [];
    return raw
      .split('\n')
      .filter(Boolean)
      .map((line) => {
        try { return JSON.parse(line); } catch { return null; }
      })
      .filter(Boolean);
  } catch (err) {
    console.error(`[tracker] Failed to read log: ${err.message}`);
    return [];
  }
}

/**
 * Writes all records back to the NDJSON log file.
 * @param {object[]} records
 */
function writeLog(records) {
  const ndjson = records.map((r) => JSON.stringify(r)).join('\n') + (records.length ? '\n' : '');
  fs.writeFileSync(LOG_FILE, ndjson, 'utf8');
}

// ─── Exported functions ───────────────────────────────────────────────────────

/**
 * Appends a new outreach record to the log.
 * Adds a unique id and createdAt if not present.
 *
 * @param {object} record
 * @returns {object} The stored record (with id and createdAt)
 */
export function logOutreach(record) {
  const entry = {
    id: record.id || `out_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    createdAt: record.createdAt || new Date().toISOString(),
    businessName:     record.businessName     || null,
    trade:            record.trade            || null,
    city:             record.city             || null,
    state:            record.state            || null,
    email:            record.email            || null,
    phone:            record.phone            || null,
    website:          record.website          || null,
    googleRating:     record.googleRating     ?? null,
    googleReviews:    record.googleReviews    ?? null,
    businessStatus:   record.businessStatus   || 'unverified',
    facebookPage:     record.facebookPage     || null,
    facebookStatus:   record.facebookStatus   || 'unchecked',
    emailSentAt:      record.emailSentAt      || null,
    emailSubject:     record.emailSubject     || null,
    emailStatus:      record.emailStatus      || 'queued',
    openedAt:         record.openedAt         || null,
    repliedAt:        record.repliedAt        || null,
    convertedAt:      record.convertedAt      || null,
    notes:            record.notes            || null,
    campaignId:       record.campaignId       || null,
  };

  // Ensure log file directory exists
  const dir = path.dirname(LOG_FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  // Append single line
  fs.appendFileSync(LOG_FILE, JSON.stringify(entry) + '\n', 'utf8');
  return entry;
}

/**
 * Updates an existing outreach record by id.
 * Merges the updates into the existing record (shallow merge).
 *
 * @param {string} id
 * @param {object} updates
 * @returns {object|null} The updated record, or null if not found
 */
export function updateOutreach(id, updates) {
  const records = readLog();
  const idx = records.findIndex((r) => r.id === id);
  if (idx === -1) {
    console.error(`[tracker] updateOutreach: record ${id} not found`);
    return null;
  }
  records[idx] = { ...records[idx], ...updates, id }; // id is immutable
  writeLog(records);
  return records[idx];
}

/**
 * Returns all outreach records.
 * @returns {object[]}
 */
export function getOutreachLog() {
  return readLog();
}

/**
 * Returns aggregate statistics across all outreach records.
 *
 * @returns {{
 *   total: number,
 *   sent: number,
 *   opened: number,
 *   replied: number,
 *   converted: number,
 *   bounced: number,
 *   byTrade: object,
 *   byCity: object,
 *   verifiedLive: number,
 *   facebookFound: number
 * }}
 */
export function getStats() {
  const records = readLog();
  const stats = {
    total: records.length,
    sent: 0,
    opened: 0,
    replied: 0,
    converted: 0,
    bounced: 0,
    byTrade: {},
    byCity: {},
    verifiedLive: 0,
    facebookFound: 0,
  };

  for (const r of records) {
    const status = r.emailStatus || '';
    if (status === 'sent')      stats.sent++;
    if (status === 'bounced')   stats.bounced++;
    if (r.openedAt)             stats.opened++;
    if (r.repliedAt)            stats.replied++;
    if (r.convertedAt)          stats.converted++;
    if (r.businessStatus === 'verified_live') stats.verifiedLive++;
    if (r.facebookStatus === 'found')         stats.facebookFound++;

    // Tally by trade
    if (r.trade) {
      stats.byTrade[r.trade] = (stats.byTrade[r.trade] || 0) + 1;
    }

    // Tally by city
    const cityKey = r.city ? (r.state ? `${r.city}, ${r.state}` : r.city) : null;
    if (cityKey) {
      stats.byCity[cityKey] = (stats.byCity[cityKey] || 0) + 1;
    }
  }

  return stats;
}

/**
 * Makes a HEAD request to the given website URL with a 5-second timeout.
 * Returns 'live' if we get any HTTP response, 'down' on connection error,
 * and 'unknown' on any other error or if the URL is missing/malformed.
 *
 * Never throws.
 *
 * @param {string} website  Full URL, e.g. "https://example.com"
 * @returns {Promise<'live'|'down'|'unknown'>}
 */
export async function verifyBusinessLive(website) {
  if (!website) return 'unknown';

  let url;
  try {
    url = new URL(website.startsWith('http') ? website : `https://${website}`);
  } catch {
    return 'unknown';
  }

  return new Promise((resolve) => {
    try {
      const lib = url.protocol === 'https:' ? https : http;
      const req = lib.request(
        { hostname: url.hostname, path: url.pathname || '/', method: 'HEAD', port: url.port || (url.protocol === 'https:' ? 443 : 80), timeout: 5000 },
        (res) => {
          // Any HTTP response (including 4xx/5xx) means the server is live
          resolve('live');
          res.resume(); // consume to free socket
        }
      );
      req.on('timeout', () => { req.destroy(); resolve('down'); });
      req.on('error', () => resolve('down'));
      req.end();
    } catch {
      resolve('unknown');
    }
  });
}

/**
 * Searches for a Facebook page for a business using the Graph API.
 * Requires META_ACCESS_TOKEN environment variable.
 * Best-effort: returns { found: false, url: null } on any failure.
 *
 * @param {string} businessName
 * @param {string} city
 * @returns {Promise<{ found: boolean, url: string|null }>}
 */
export async function searchFacebookPage(businessName, city) {
  const token = process.env.META_ACCESS_TOKEN;
  if (!token) return { found: false, url: null };
  if (!businessName) return { found: false, url: null };

  const query = encodeURIComponent(`${businessName} ${city || ''}`.trim());
  const apiUrl = `https://graph.facebook.com/search?q=${query}&type=page&fields=id,name,link&access_token=${encodeURIComponent(token)}`;

  return new Promise((resolve) => {
    try {
      const req = https.get(apiUrl, { timeout: 8000 }, (res) => {
        let body = '';
        res.on('data', (chunk) => { body += chunk; });
        res.on('end', () => {
          try {
            const json = JSON.parse(body);
            const pages = json.data || [];
            if (pages.length === 0) {
              resolve({ found: false, url: null });
              return;
            }
            const page = pages[0];
            const pageUrl = page.link || `https://www.facebook.com/${page.id}`;
            resolve({ found: true, url: pageUrl });
          } catch {
            resolve({ found: false, url: null });
          }
        });
      });
      req.on('timeout', () => { req.destroy(); resolve({ found: false, url: null }); });
      req.on('error', () => resolve({ found: false, url: null }));
    } catch {
      resolve({ found: false, url: null });
    }
  });
}
