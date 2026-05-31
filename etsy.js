/**
 * etsy.js — Etsy API v3 scaffold for Agent Atlas
 *
 * Usage:
 *   1. Fill in ETSY_CONFIG.clientId with your Etsy app's keystring.
 *   2. Fill in ETSY_CONFIG.shopId with your numeric Etsy shop ID.
 *   3. In your Etsy app settings, add the redirectUri below to your
 *      "Callback URLs" list.
 *   4. Call EtsyAPI.startAuth() to kick off the OAuth flow.
 *   5. On your callback page, call EtsyAPI.handleCallback(code) where
 *      `code` is the `code` query parameter Etsy sends back.
 *
 * No bundler required — include this with a plain <script> tag.
 * Exposes a single global: EtsyAPI
 */

// ---------------------------------------------------------------------------
// 1. CONFIG — fill these in before using
// ---------------------------------------------------------------------------

const ETSY_CONFIG = {
  clientId:    '',    // Paste your Etsy app keystring (found in App Settings)
  redirectUri: window.location.origin + '/etsy-callback',
  scopes: ['listings_r', 'listings_w', 'transactions_r', 'shops_r'],
  shopId:      '',    // Paste your numeric Etsy shop ID (e.g. "12345678")
};

const ETSY_BASE_URL = 'https://api.etsy.com/v3';

// ---------------------------------------------------------------------------
// 2. OAUTH PKCE HELPERS
// ---------------------------------------------------------------------------

/**
 * Generates a cryptographically random 64-character code verifier and saves
 * it in sessionStorage so it survives the redirect but not a closed tab.
 * @returns {string}
 */
function generateCodeVerifier() {
  const array = new Uint8Array(48); // 48 bytes → 64 base64url chars
  crypto.getRandomValues(array);
  const verifier = btoa(String.fromCharCode(...array))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
  sessionStorage.setItem('etsy_code_verifier', verifier);
  return verifier;
}

/**
 * Produces the S256 code challenge from a verifier.
 * @param {string} verifier
 * @returns {Promise<string>} base64url-encoded SHA-256 hash
 */
async function generateCodeChallenge(verifier) {
  const data = new TextEncoder().encode(verifier);
  const digest = await crypto.subtle.digest('SHA-256', data);
  return btoa(String.fromCharCode(...new Uint8Array(digest)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

/**
 * Builds the full Etsy OAuth 2.0 authorization URL.
 * Call this just before redirecting the user.
 * @returns {Promise<string>}
 */
async function buildAuthUrl() {
  const verifier   = generateCodeVerifier();
  const challenge  = await generateCodeChallenge(verifier);
  const state      = crypto.randomUUID();           // CSRF protection
  sessionStorage.setItem('etsy_oauth_state', state);

  const params = new URLSearchParams({
    response_type:         'code',
    client_id:             ETSY_CONFIG.clientId,
    redirect_uri:          ETSY_CONFIG.redirectUri,
    scope:                 ETSY_CONFIG.scopes.join(' '),
    state:                 state,
    code_challenge:        challenge,
    code_challenge_method: 'S256',
  });

  return `https://www.etsy.com/oauth/connect?${params.toString()}`;
}

/**
 * Exchanges the authorization code Etsy sends to your callback URL for an
 * access token + refresh token. Stores the token bundle in localStorage.
 *
 * Call this on your /etsy-callback page:
 *   const code = new URLSearchParams(location.search).get('code');
 *   await EtsyAPI.handleCallback(code);
 *
 * @param {string} code  The `code` query param from the callback URL
 * @returns {Promise<object>} The raw token response from Etsy
 */
async function handleCallback(code) {
  const verifier = sessionStorage.getItem('etsy_code_verifier');
  if (!verifier) throw new Error('No code verifier found — did the session expire?');

  // NOTE: Etsy's token endpoint does NOT require a client_secret for PKCE
  // public clients. The verifier proves possession of the code challenge.
  const body = new URLSearchParams({
    grant_type:    'authorization_code',
    client_id:     ETSY_CONFIG.clientId,
    redirect_uri:  ETSY_CONFIG.redirectUri,
    code:          code,
    code_verifier: verifier,
  });

  const response = await fetch('https://api.etsy.com/v3/public/oauth/token', {
    method:  'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body:    body.toString(),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Token exchange failed: ${err}`);
  }

  const token = await response.json();
  // Store with an expiry timestamp so we can detect staleness
  token.expires_at = Date.now() + token.expires_in * 1000;
  localStorage.setItem('etsy_token', JSON.stringify(token));

  sessionStorage.removeItem('etsy_code_verifier');
  sessionStorage.removeItem('etsy_oauth_state');

  return token;
}

/**
 * Returns the stored token object, or null if none exists.
 * @returns {object|null}
 */
function getToken() {
  const raw = localStorage.getItem('etsy_token');
  return raw ? JSON.parse(raw) : null;
}

/**
 * Returns true if a token is stored and has not yet expired.
 * @returns {boolean}
 */
function isConnected() {
  const token = getToken();
  if (!token) return false;
  return token.expires_at > Date.now();
}

// ---------------------------------------------------------------------------
// 3. INTERNAL FETCH WRAPPER
// ---------------------------------------------------------------------------

/**
 * Authenticated fetch against the Etsy v3 API.
 * Automatically attaches the Bearer token and the required x-api-key header.
 * @param {string} path   e.g. '/shops/12345'
 * @param {object} opts   fetch options (method, body, etc.)
 * @returns {Promise<object>}
 */
async function etsyFetch(path, opts = {}) {
  const token = getToken();
  if (!token) throw new Error('Not authenticated — call EtsyAPI.startAuth() first.');

  const headers = {
    Authorization: `Bearer ${token.access_token}`,
    'x-api-key':   ETSY_CONFIG.clientId,   // required on every request
    'Content-Type': 'application/json',
    ...(opts.headers || {}),
  };

  const response = await fetch(`${ETSY_BASE_URL}${path}`, {
    ...opts,
    headers,
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Etsy API error ${response.status}: ${err}`);
  }

  return response.json();
}

// ---------------------------------------------------------------------------
// 4. MOCK DATA — shown when isConnected() is false
// ---------------------------------------------------------------------------

const MOCK_SHOP = {
  shop_id:    99990001,
  shop_name:  'AtlasDemoShop',
  title:      'Atlas Demo — Your Shop Name Here',
  url:        'https://www.etsy.com/shop/AtlasDemoShop',
  icon_url_fullxfull: '',
  num_favorers: 128,
};

const MOCK_LISTINGS = [
  {
    listing_id:   111001,
    title:        'Handmade Ceramic Mug (Demo)',
    description:  'A beautiful handcrafted ceramic mug.',
    price:        { amount: 2800, divisor: 100, currency_code: 'USD' },
    quantity:     12,
    state:        'active',
    views:        320,
    num_favorers: 47,
    url:          'https://www.etsy.com/listing/111001',
    images:       [],
  },
  {
    listing_id:   111002,
    title:        'Woven Wall Hanging (Demo)',
    description:  'Hand-woven wall art in natural fibers.',
    price:        { amount: 6500, divisor: 100, currency_code: 'USD' },
    quantity:     4,
    state:        'active',
    views:        180,
    num_favorers: 23,
    url:          'https://www.etsy.com/listing/111002',
    images:       [],
  },
];

const MOCK_TRANSACTIONS = [
  {
    transaction_id: 201001,
    title:          'Handmade Ceramic Mug (Demo)',
    quantity:       2,
    price:          { amount: 2800, divisor: 100, currency_code: 'USD' },
    create_timestamp: Math.floor(Date.now() / 1000) - 86400,
  },
  {
    transaction_id: 201002,
    title:          'Woven Wall Hanging (Demo)',
    quantity:       1,
    price:          { amount: 6500, divisor: 100, currency_code: 'USD' },
    create_timestamp: Math.floor(Date.now() / 1000) - 172800,
  },
];

// ---------------------------------------------------------------------------
// 5. API METHODS
// ---------------------------------------------------------------------------

/**
 * Fetch basic shop info.
 * @returns {Promise<object>}
 */
async function getShop() {
  if (!isConnected()) return MOCK_SHOP;
  return etsyFetch(`/shops/${ETSY_CONFIG.shopId}`);
}

/**
 * Fetch all shop listings, handling Etsy's pagination automatically.
 * @param {string} state  'active' | 'draft' | 'inactive' | 'sold_out'
 * @returns {Promise<Array>}
 */
async function getListings(state = 'active') {
  if (!isConnected()) return MOCK_LISTINGS;

  const limit  = 100; // max per page Etsy allows
  let offset   = 0;
  let results  = [];

  while (true) {
    const page = await etsyFetch(
      `/shops/${ETSY_CONFIG.shopId}/listings?state=${state}&limit=${limit}&offset=${offset}`
    );
    results = results.concat(page.results || []);
    if (results.length >= page.count || (page.results || []).length < limit) break;
    offset += limit;
  }

  return results;
}

/**
 * Fetch a single listing by ID.
 * @param {number|string} listingId
 * @returns {Promise<object>}
 */
async function getListing(listingId) {
  if (!isConnected()) {
    return MOCK_LISTINGS.find(l => l.listing_id === Number(listingId)) || MOCK_LISTINGS[0];
  }
  return etsyFetch(`/listings/${listingId}`);
}

/**
 * Create a new listing draft.
 * @param {object} data  See Etsy docs for required fields (title, description,
 *                       price, quantity, who_made, when_made, taxonomy_id, etc.)
 * @returns {Promise<object>}
 */
async function createListing(data) {
  if (!isConnected()) {
    console.warn('EtsyAPI: not connected — createListing is a no-op in mock mode.');
    return { ...MOCK_LISTINGS[0], ...data, listing_id: Date.now() };
  }
  return etsyFetch(`/shops/${ETSY_CONFIG.shopId}/listings`, {
    method: 'POST',
    body:   JSON.stringify(data),
  });
}

/**
 * Update an existing listing.
 * @param {number|string} listingId
 * @param {object} data  Only the fields you want to change
 * @returns {Promise<object>}
 */
async function updateListing(listingId, data) {
  if (!isConnected()) {
    console.warn('EtsyAPI: not connected — updateListing is a no-op in mock mode.');
    return { ...MOCK_LISTINGS[0], ...data };
  }
  return etsyFetch(`/listings/${listingId}`, {
    method: 'PATCH',
    body:   JSON.stringify(data),
  });
}

/**
 * Fetch stats (views, visits, revenue) for a specific listing.
 * Note: stats require the listings_r scope and a connected shop.
 * @param {number|string} listingId
 * @returns {Promise<object>}
 */
async function getListingStats(listingId) {
  if (!isConnected()) {
    return { listing_id: listingId, views: 0, visits: 0, revenue: 0 };
  }
  return etsyFetch(`/shops/${ETSY_CONFIG.shopId}/listings/${listingId}/stats`);
}

/**
 * Fetch recent shop transactions (sales).
 * @param {number} limit  Max results (1–100)
 * @returns {Promise<Array>}
 */
async function getTransactions(limit = 25) {
  if (!isConnected()) return MOCK_TRANSACTIONS;
  const data = await etsyFetch(
    `/shops/${ETSY_CONFIG.shopId}/transactions?limit=${limit}`
  );
  return data.results || [];
}

// ---------------------------------------------------------------------------
// 6. SYNC TO ATLAS
// ---------------------------------------------------------------------------

/**
 * Pull fresh Etsy data and return a state patch compatible with Agent Atlas.
 *
 * Usage:
 *   const patch = await EtsyAPI.syncToAtlas(appState);
 *   Object.assign(appState, patch);  // or however Atlas merges state
 *
 * @param {object} atlasState  The current Agent Atlas state object (read-only here)
 * @returns {Promise<{ listings: Array, activity: Array }>}
 */
async function syncToAtlas(atlasState) {
  const [listings, transactions] = await Promise.all([
    getListings('active'),
    getTransactions(25),
  ]);

  // Map Etsy listings → Atlas listing shape
  const mappedListings = listings.map(l => ({
    id:          String(l.listing_id),
    title:       l.title,
    description: l.description || '',
    price:       l.price ? (l.price.amount / l.price.divisor).toFixed(2) : '0.00',
    currency:    l.price ? l.price.currency_code : 'USD',
    quantity:    l.quantity || 0,
    state:       l.state,
    views:       l.views || 0,
    favorites:   l.num_favorers || 0,
    url:         l.url || '',
    source:      'etsy',
  }));

  // Map Etsy transactions → Atlas activity shape
  const mappedActivity = transactions.map(t => ({
    id:        String(t.transaction_id),
    type:      'sale',
    title:     t.title,
    quantity:  t.quantity,
    amount:    t.price ? ((t.price.amount / t.price.divisor) * t.quantity).toFixed(2) : '0.00',
    currency:  t.price ? t.price.currency_code : 'USD',
    timestamp: t.create_timestamp ? new Date(t.create_timestamp * 1000).toISOString() : new Date().toISOString(),
    source:    'etsy',
  }));

  return {
    listings: mappedListings,
    activity: mappedActivity,
  };
}

// ---------------------------------------------------------------------------
// 7. AUTH FLOW HELPERS
// ---------------------------------------------------------------------------

/**
 * Saves whatever state you pass (e.g. scroll position, draft form data) to
 * sessionStorage, then redirects the browser to the Etsy consent screen.
 * After the user approves, Etsy redirects to ETSY_CONFIG.redirectUri.
 * @param {object} [pageState]  Optional state to preserve across the redirect
 */
async function startAuth(pageState) {
  if (pageState) {
    sessionStorage.setItem('etsy_pre_auth_state', JSON.stringify(pageState));
  }
  const url = await buildAuthUrl();
  window.location.href = url;
}

/**
 * Clears the stored access token, effectively disconnecting the integration.
 * The user will need to go through startAuth() again to reconnect.
 */
function disconnect() {
  localStorage.removeItem('etsy_token');
  sessionStorage.removeItem('etsy_code_verifier');
  sessionStorage.removeItem('etsy_oauth_state');
  sessionStorage.removeItem('etsy_pre_auth_state');
}

// ---------------------------------------------------------------------------
// 8. CONNECTION STATUS UI HELPER
// ---------------------------------------------------------------------------

/**
 * Returns an HTML string for a status badge you can inject into your UI.
 *
 * Example:
 *   document.getElementById('etsy-status').innerHTML = EtsyAPI.statusBadgeHTML();
 *
 * The "Connect" button calls EtsyAPI.startAuth() directly so no extra wiring
 * is needed — just make sure this script is loaded on the page.
 *
 * @returns {string}
 */
function statusBadgeHTML() {
  if (isConnected()) {
    return `
      <span style="
        display:inline-flex;align-items:center;gap:6px;
        background:#d1fae5;color:#065f46;
        border:1px solid #6ee7b7;border-radius:9999px;
        padding:4px 12px;font-size:13px;font-weight:500;
      ">
        Connected to Etsy &#10003;
        <button
          onclick="EtsyAPI.disconnect(); location.reload();"
          style="
            background:none;border:none;color:#065f46;
            cursor:pointer;font-size:12px;text-decoration:underline;
          "
        >Disconnect</button>
      </span>
    `.trim();
  }

  return `
    <span style="
      display:inline-flex;align-items:center;gap:8px;
      background:#f3f4f6;color:#6b7280;
      border:1px solid #d1d5db;border-radius:9999px;
      padding:4px 12px;font-size:13px;font-weight:500;
    ">
      Etsy: Not Connected
      <button
        onclick="EtsyAPI.startAuth();"
        style="
          background:#f97316;color:#fff;border:none;border-radius:9999px;
          padding:3px 10px;font-size:12px;font-weight:600;cursor:pointer;
        "
      >Connect</button>
    </span>
  `.trim();
}

// ---------------------------------------------------------------------------
// GLOBAL EXPORT
// ---------------------------------------------------------------------------

var EtsyAPI = {
  // Auth
  startAuth:       startAuth,
  handleCallback:  handleCallback,
  disconnect:      disconnect,
  isConnected:     isConnected,
  getToken:        getToken,
  buildAuthUrl:    buildAuthUrl,

  // API methods
  getShop:         getShop,
  getListings:     getListings,
  getListing:      getListing,
  createListing:   createListing,
  updateListing:   updateListing,
  getListingStats: getListingStats,
  getTransactions: getTransactions,

  // Atlas integration
  syncToAtlas:     syncToAtlas,

  // UI
  statusBadgeHTML: statusBadgeHTML,

  // Expose config so other scripts can read/override it if needed
  config: ETSY_CONFIG,
};
