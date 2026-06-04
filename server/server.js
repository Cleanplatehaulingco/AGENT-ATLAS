'use strict';

// ─── Environment ──────────────────────────────────────────────────────────────
require('dotenv').config();

const PORT            = process.env.PORT            || 3000;
const ETSY_CLIENT_ID  = process.env.ETSY_CLIENT_ID  || '';
const ETSY_SHOP_ID    = process.env.ETSY_SHOP_ID    || '';
const APP_URL         = process.env.APP_URL         || `http://localhost:${PORT}`;
const FRONTEND_URL    = process.env.FRONTEND_URL    || 'https://cleanplatehaulingco.github.io';

const ETSY_API_BASE   = 'https://openapi.etsy.com/v3';
const ETSY_AUTH_BASE  = 'https://www.etsy.com/oauth/connect';
const ETSY_TOKEN_URL  = 'https://api.etsy.com/v3/public/oauth/token';
const SCOPES          = 'listings_r listings_w listings_d transactions_r shops_r';

// ─── Imports ──────────────────────────────────────────────────────────────────
const express     = require('express');
const helmet      = require('helmet');
const cors        = require('cors');
const rateLimit   = require('express-rate-limit');
const crypto      = require('crypto');

// ─── App ──────────────────────────────────────────────────────────────────────
const app = express();

// Render (and most cloud hosts) sit behind a reverse proxy — trust the first
// hop so express-rate-limit can read the real client IP from X-Forwarded-For.
app.set('trust proxy', 1);

// ─── Security: Helmet (API server — no HTML, no CSP needed) ──────────────────
app.use(helmet({
  contentSecurityPolicy: false,   // API only, no HTML served
  crossOriginEmbedderPolicy: false,
}));

// ─── CORS ─────────────────────────────────────────────────────────────────────
const CORS_WHITELIST = [
  'https://cleanplatehaulingco.github.io',
  'http://localhost:3000',
  'https://www.etsy.com',
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (curl, Render health checks, same-origin)
    if (!origin) return callback(null, true);
    if (CORS_WHITELIST.includes(origin)) return callback(null, true);
    callback(new Error(`CORS: origin not allowed — ${origin}`));
  },
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

// ─── Rate limiting ────────────────────────────────────────────────────────────
app.use(rateLimit({
  windowMs: 60 * 1000,   // 1 minute
  max: 120,
  standardHeaders: true,
  legacyHeaders: false,
  message: { ok: false, error: 'Too many requests — try again in a minute.' },
}));

// ─── Body parsing ─────────────────────────────────────────────────────────────
app.use(express.json({ limit: '10mb' }));   // 10 MB for base64 image uploads

// ─── Request logger ───────────────────────────────────────────────────────────
app.use((req, _res, next) => {
  const ts = new Date().toISOString();
  console.log(`[${ts}] ${req.method} ${req.path} — ip:${req.ip}`);
  next();
});

// ─── In-memory stores ─────────────────────────────────────────────────────────

/**
 * _tokenStore: { access_token, refresh_token, expires_at, shop_name, authenticated_at }
 */
let _tokenStore = null;

/**
 * _pkceStore: { verifier, challenge } — single active PKCE session
 */
let _pkceStore = null;

/**
 * _relayStore: Map<key, { data, expiresAt }>
 */
const _relayStore = new Map();
const RELAY_TTL_MS = 10 * 60 * 1000;  // 10 minutes

// ─── PKCE helpers ─────────────────────────────────────────────────────────────
function generateVerifier() {
  return crypto.randomBytes(48).toString('base64url');
}

function generateChallenge(verifier) {
  return crypto.createHash('sha256').update(verifier).digest('base64url');
}

// ─── Etsy fetch helper with auto token refresh ────────────────────────────────
async function etsyFetch(path, options = {}, retried = false) {
  if (!_tokenStore) throw Object.assign(new Error('Not authenticated'), { status: 401 });

  // Auto-refresh if token expires within 60 seconds
  if (Date.now() >= (_tokenStore.expires_at - 60_000)) {
    await refreshToken();
  }

  const url = path.startsWith('http') ? path : `${ETSY_API_BASE}${path}`;
  const headers = {
    'Authorization': `Bearer ${_tokenStore.access_token}`,
    'x-api-key': ETSY_CLIENT_ID,
    ...options.headers,
  };

  const res = await fetch(url, { ...options, headers });

  if (res.status === 401 && !retried) {
    // Token may have just expired — refresh and retry once
    logInfo('etsyFetch: 401 received — refreshing token and retrying');
    await refreshToken();
    return etsyFetch(path, options, true);
  }

  return res;
}

async function refreshToken() {
  if (!_tokenStore?.refresh_token) {
    _tokenStore = null;
    throw Object.assign(new Error('No refresh token — re-authenticate'), { status: 401 });
  }

  logInfo('Refreshing Etsy access token');
  const body = new URLSearchParams({
    grant_type:    'refresh_token',
    client_id:     ETSY_CLIENT_ID,
    refresh_token: _tokenStore.refresh_token,
  });

  const res = await fetch(ETSY_TOKEN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body,
  });

  if (!res.ok) {
    const text = await res.text();
    logError('Token refresh failed', { status: res.status, body: text.slice(0, 200) });
    _tokenStore = null;
    throw Object.assign(new Error('Token refresh failed — re-authenticate'), { status: 401 });
  }

  const data = await res.json();
  _tokenStore = {
    ..._tokenStore,
    access_token:  data.access_token,
    refresh_token: data.refresh_token || _tokenStore.refresh_token,
    expires_at:    Date.now() + (data.expires_in || 3600) * 1000,
  };
  logInfo('Token refreshed successfully');
}

// ─── Logging helpers (no secrets) ────────────────────────────────────────────
function logInfo(msg, meta = {}) {
  const safe = sanitizeMeta(meta);
  console.log(`[${new Date().toISOString()}] INFO  ${msg}`, Object.keys(safe).length ? safe : '');
}

function logError(msg, meta = {}) {
  const safe = sanitizeMeta(meta);
  console.error(`[${new Date().toISOString()}] ERROR ${msg}`, Object.keys(safe).length ? safe : '');
}

function sanitizeMeta(meta) {
  const out = { ...meta };
  // Truncate client_id to first 8 chars if present — never log full secrets
  if (out.client_id) out.client_id = String(out.client_id).slice(0, 8) + '…';
  if (out.access_token) out.access_token = '[redacted]';
  if (out.refresh_token) out.refresh_token = '[redacted]';
  return out;
}

// ─── Auth middleware ──────────────────────────────────────────────────────────
function requireAuth(req, res, next) {
  if (!_tokenStore) {
    return res.status(401).json({ ok: false, error: 'Not authenticated — visit /auth/etsy to connect' });
  }
  next();
}

// ─── Relay cleanup helper ─────────────────────────────────────────────────────
function cleanExpiredRelay() {
  const now = Date.now();
  for (const [key, entry] of _relayStore) {
    if (now > entry.expiresAt) _relayStore.delete(key);
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// ROUTES
// ═══════════════════════════════════════════════════════════════════════════════

// ─── Health ───────────────────────────────────────────────────────────────────
app.get('/health', (_req, res) => {
  res.json({
    status:       'ok',
    service:      'agent-atlas-api',
    shop:         ETSY_SHOP_ID || 'not configured',
    authenticated: !!_tokenStore,
    tokenExpires: _tokenStore?.expires_at
      ? new Date(_tokenStore.expires_at).toISOString()
      : null,
    timestamp:    new Date().toISOString(),
    version:      '1.0.0',
  });
});

// ─── Root ─────────────────────────────────────────────────────────────────────
app.get('/', (_req, res) => {
  res.json({
    service:     'Agent Atlas API — TradeOpsVault Etsy Shop Management',
    shopUrl:     'https://www.etsy.com/shop/TradeOpsVault',
    frontendUrl: FRONTEND_URL,
    endpoints: {
      health:           'GET  /health',
      authEtsy:         'GET  /auth/etsy',
      authCallback:     'GET  /auth/callback',
      authStatus:       'GET  /auth/status',
      authLogout:       'DELETE /auth/logout',
      shop:             'GET  /api/shop',
      listings:         'GET  /api/listings',
      createListing:    'POST /api/listings',
      updateListing:    'PATCH /api/listings/:id',
      uploadImage:      'POST /api/listings/:id/images',
      transactions:     'GET  /api/transactions',
      relayStore:       'POST /relay/store',
      relayLoad:        'GET  /relay/load/:key',
    },
  });
});

// ─── OAuth: initiate ──────────────────────────────────────────────────────────
app.get('/auth/etsy', (req, res) => {
  const verifier  = generateVerifier();
  const challenge = generateChallenge(verifier);
  const state     = crypto.randomBytes(16).toString('hex');

  _pkceStore = { verifier, state };

  const params = new URLSearchParams({
    response_type:         'code',
    client_id:             ETSY_CLIENT_ID,
    redirect_uri:          `${APP_URL}/auth/callback`,
    scope:                 SCOPES,
    state,
    code_challenge:        challenge,
    code_challenge_method: 'S256',
  });

  logInfo('OAuth: initiating PKCE flow', { client_id: ETSY_CLIENT_ID });
  res.redirect(`${ETSY_AUTH_BASE}?${params.toString()}`);
});

// ─── OAuth: callback ──────────────────────────────────────────────────────────
app.get('/auth/callback', async (req, res) => {
  const { code, state, error } = req.query;

  if (error) {
    logError('OAuth callback error', { error });
    return res.redirect(`${FRONTEND_URL}/AGENT-ATLAS/?app=1&auth=error&reason=${encodeURIComponent(error)}`);
  }

  if (!_pkceStore || state !== _pkceStore.state) {
    logError('OAuth callback: state mismatch or missing PKCE session');
    return res.status(400).json({ ok: false, error: 'Invalid state — possible CSRF. Restart OAuth flow.' });
  }

  try {
    const body = new URLSearchParams({
      grant_type:    'authorization_code',
      client_id:     ETSY_CLIENT_ID,
      redirect_uri:  `${APP_URL}/auth/callback`,
      code,
      code_verifier: _pkceStore.verifier,
    });

    const tokenRes = await fetch(ETSY_TOKEN_URL, {
      method:  'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body,
    });

    if (!tokenRes.ok) {
      const text = await tokenRes.text();
      logError('OAuth token exchange failed', { status: tokenRes.status, body: text.slice(0, 200) });
      return res.redirect(`${FRONTEND_URL}/AGENT-ATLAS/?app=1&auth=error&reason=token_exchange_failed`);
    }

    const tokenData = await tokenRes.json();
    _pkceStore = null;  // Consumed

    // Fetch shop name
    let shopName = 'TradeOpsVault';
    try {
      const shopRes = await fetch(
        `${ETSY_API_BASE}/application/shops/${ETSY_SHOP_ID}`,
        { headers: { 'Authorization': `Bearer ${tokenData.access_token}`, 'x-api-key': ETSY_CLIENT_ID } }
      );
      if (shopRes.ok) {
        const shopData = await shopRes.json();
        shopName = shopData.shop_name || shopName;
      }
    } catch (shopErr) {
      logError('Could not fetch shop name after auth', { message: shopErr.message });
    }

    _tokenStore = {
      access_token:      tokenData.access_token,
      refresh_token:     tokenData.refresh_token,
      expires_at:        Date.now() + (tokenData.expires_in || 3600) * 1000,
      shop_name:         shopName,
      authenticated_at:  new Date().toISOString(),
    };

    logInfo('OAuth: authentication successful', { shop: shopName });
    res.redirect(`${FRONTEND_URL}/AGENT-ATLAS/?app=1&auth=success`);

  } catch (err) {
    logError('OAuth callback exception', { message: err.message });
    res.redirect(`${FRONTEND_URL}/AGENT-ATLAS/?app=1&auth=error&reason=server_error`);
  }
});

// ─── OAuth: status ────────────────────────────────────────────────────────────
app.get('/auth/status', (req, res) => {
  if (!_tokenStore) {
    return res.json({ authenticated: false });
  }
  res.json({
    authenticated: true,
    expiresAt:     new Date(_tokenStore.expires_at).toISOString(),
    shopName:      _tokenStore.shop_name,
    authenticatedAt: _tokenStore.authenticated_at,
  });
});

// ─── OAuth: logout ────────────────────────────────────────────────────────────
app.delete('/auth/logout', (req, res) => {
  _tokenStore = null;
  logInfo('Auth: token cleared (logout)');
  res.json({ ok: true, message: 'Logged out' });
});

// ═══════════════════════════════════════════════════════════════════════════════
// API PROXY — all require valid token
// ═══════════════════════════════════════════════════════════════════════════════

// ─── Shop info ────────────────────────────────────────────────────────────────
app.get('/api/shop', requireAuth, async (req, res) => {
  try {
    const r = await etsyFetch(`/application/shops/${ETSY_SHOP_ID}`);
    const data = await r.json();
    if (!r.ok) return res.status(r.status).json({ ok: false, error: data.error || 'Etsy API error', details: data });
    res.json({ ok: true, shop: data });
  } catch (err) {
    logError('GET /api/shop failed', { message: err.message });
    res.status(err.status || 500).json({ ok: false, error: err.message });
  }
});

// ─── Listings: get active ────────────────────────────────────────────────────
app.get('/api/listings', requireAuth, async (req, res) => {
  try {
    const shopId = req.query.shop_id || ETSY_SHOP_ID;
    const params = new URLSearchParams({ state: 'active', limit: '100' });
    const r = await etsyFetch(`/application/shops/${shopId}/listings?${params}`);
    const data = await r.json();
    if (!r.ok) return res.status(r.status).json({ ok: false, error: data.error || 'Etsy API error', details: data });
    res.json({ ok: true, ...data });
  } catch (err) {
    logError('GET /api/listings failed', { message: err.message });
    res.status(err.status || 500).json({ ok: false, error: err.message });
  }
});

// ─── Listings: create ────────────────────────────────────────────────────────
app.post('/api/listings', requireAuth, async (req, res) => {
  try {
    const r = await etsyFetch(`/application/shops/${ETSY_SHOP_ID}/listings`, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(req.body),
    });
    const data = await r.json();
    if (!r.ok) return res.status(r.status).json({ ok: false, error: data.error || 'Etsy API error', details: data });
    res.status(201).json({ ok: true, listing: data });
  } catch (err) {
    logError('POST /api/listings failed', { message: err.message });
    res.status(err.status || 500).json({ ok: false, error: err.message });
  }
});

// ─── Listings: update ────────────────────────────────────────────────────────
app.patch('/api/listings/:id', requireAuth, async (req, res) => {
  try {
    const r = await etsyFetch(`/application/listings/${req.params.id}`, {
      method:  'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(req.body),
    });
    const data = await r.json();
    if (!r.ok) return res.status(r.status).json({ ok: false, error: data.error || 'Etsy API error', details: data });
    res.json({ ok: true, listing: data });
  } catch (err) {
    logError(`PATCH /api/listings/${req.params.id} failed`, { message: err.message });
    res.status(err.status || 500).json({ ok: false, error: err.message });
  }
});

// ─── Listings: upload image (base64 dataUrl) ──────────────────────────────────
app.post('/api/listings/:id/images', requireAuth, async (req, res) => {
  try {
    const { dataUrl, rank = 1 } = req.body;
    if (!dataUrl) return res.status(400).json({ ok: false, error: 'dataUrl is required' });

    // Parse base64 data URL
    const match = dataUrl.match(/^data:([^;]+);base64,(.+)$/);
    if (!match) return res.status(400).json({ ok: false, error: 'Invalid dataUrl format' });

    const mimeType    = match[1];  // e.g. image/jpeg
    const base64Data  = match[2];
    const imageBuffer = Buffer.from(base64Data, 'base64');

    // Determine file extension from MIME type
    const ext = mimeType === 'image/png' ? 'png'
              : mimeType === 'image/webp' ? 'webp'
              : 'jpg';
    const filename = `listing_image_${rank}.${ext}`;

    // Build multipart/form-data manually — no form-data library needed
    const boundary = `----AtlasBoundary${crypto.randomBytes(12).toString('hex')}`;
    const CRLF     = '\r\n';

    const partHeader = Buffer.from(
      `--${boundary}${CRLF}` +
      `Content-Disposition: form-data; name="image"; filename="${filename}"${CRLF}` +
      `Content-Type: ${mimeType}${CRLF}${CRLF}`
    );

    const rankHeader = Buffer.from(
      `${CRLF}--${boundary}${CRLF}` +
      `Content-Disposition: form-data; name="rank"${CRLF}${CRLF}` +
      `${rank}`
    );

    const overwriteHeader = Buffer.from(
      `${CRLF}--${boundary}${CRLF}` +
      `Content-Disposition: form-data; name="overwrite"${CRLF}${CRLF}` +
      `true`
    );

    const terminator = Buffer.from(`${CRLF}--${boundary}--${CRLF}`);

    const body = Buffer.concat([partHeader, imageBuffer, rankHeader, overwriteHeader, terminator]);

    const r = await etsyFetch(
      `/application/shops/${ETSY_SHOP_ID}/listings/${req.params.id}/images`,
      {
        method:  'POST',
        headers: { 'Content-Type': `multipart/form-data; boundary=${boundary}` },
        body,
      }
    );

    const data = await r.json();
    if (!r.ok) return res.status(r.status).json({ ok: false, error: data.error || 'Image upload failed', details: data });
    res.status(201).json({ ok: true, image: data });

  } catch (err) {
    logError(`POST /api/listings/${req.params.id}/images failed`, { message: err.message });
    res.status(err.status || 500).json({ ok: false, error: err.message });
  }
});

// ─── Transactions ─────────────────────────────────────────────────────────────
app.get('/api/transactions', requireAuth, async (req, res) => {
  try {
    const limit = Math.min(parseInt(req.query.limit || '25', 10), 100);
    const r = await etsyFetch(`/application/shops/${ETSY_SHOP_ID}/transactions?limit=${limit}`);
    const data = await r.json();
    if (!r.ok) return res.status(r.status).json({ ok: false, error: data.error || 'Etsy API error', details: data });
    res.json({ ok: true, ...data });
  } catch (err) {
    logError('GET /api/transactions failed', { message: err.message });
    res.status(err.status || 500).json({ ok: false, error: err.message });
  }
});

// ═══════════════════════════════════════════════════════════════════════════════
// CROSS-ORIGIN RELAY — no auth required (used by bookmarklet on etsy.com)
// ═══════════════════════════════════════════════════════════════════════════════

// ─── Relay: store ─────────────────────────────────────────────────────────────
app.post('/relay/store', (req, res) => {
  const { key, data } = req.body;

  if (!key || typeof key !== 'string' || key.length > 128) {
    return res.status(400).json({ ok: false, error: 'key must be a string ≤128 chars' });
  }

  // Clean expired entries on every write to prevent unbounded growth
  cleanExpiredRelay();

  _relayStore.set(key, {
    data,
    expiresAt: Date.now() + RELAY_TTL_MS,
  });

  logInfo('relay/store', { key, size: _relayStore.size });
  res.json({ ok: true, key, expiresIn: '10 minutes' });
});

// ─── Relay: load ──────────────────────────────────────────────────────────────
app.get('/relay/load/:key', (req, res) => {
  const entry = _relayStore.get(req.params.key);

  if (!entry || Date.now() > entry.expiresAt) {
    _relayStore.delete(req.params.key);
    return res.status(404).json({ ok: false, error: 'Key not found or expired' });
  }

  res.json({ ok: true, data: entry.data });
});

// ═══════════════════════════════════════════════════════════════════════════════
// ERROR HANDLING
// ═══════════════════════════════════════════════════════════════════════════════

// ─── 404 ──────────────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ ok: false, error: `Route not found: ${req.method} ${req.path}` });
});

// ─── Global error handler ─────────────────────────────────────────────────────
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, _next) => {
  const status = err.status || err.statusCode || 500;
  logError(`Unhandled error on ${req.method} ${req.path}`, {
    message: err.message,
    status,
    stack: process.env.NODE_ENV === 'production' ? undefined : err.stack,
  });

  // Never expose stack traces in production
  const body = { ok: false, error: status < 500 ? err.message : 'Internal server error' };
  if (process.env.NODE_ENV !== 'production' && err.stack) {
    body.stack = err.stack;
  }
  res.status(status).json(body);
});

// ─── Start ────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  logInfo(`Agent Atlas API listening on port ${PORT}`, {
    env:     process.env.NODE_ENV || 'development',
    shop:    ETSY_SHOP_ID || '(not configured — set ETSY_SHOP_ID)',
    client:  ETSY_CLIENT_ID ? ETSY_CLIENT_ID.slice(0, 8) + '…' : '(not configured — set ETSY_CLIENT_ID)',
    appUrl:  APP_URL,
    frontend: FRONTEND_URL,
  });

  // Self-ping every 10 minutes so Render free tier stays warm even when
  // UptimeRobot has a gap or the dashboard tab is closed. Silently skipped
  // in development to avoid unnecessary local noise.
  if (process.env.NODE_ENV === 'production' && APP_URL) {
    setInterval(() => {
      const http = require('http');
      const https = require('https');
      const url = new URL('/health', APP_URL);
      const lib = url.protocol === 'https:' ? https : http;
      const req = lib.get(url.toString(), (res) => { res.resume(); });
      req.on('error', () => {}); // silent — UptimeRobot is the real alert layer
      req.setTimeout(8000, () => req.destroy());
    }, 10 * 60 * 1000);
  }
});

module.exports = app;  // Export for testing
