'use strict';

// ─── Environment ──────────────────────────────────────────────────────────────
require('dotenv').config();

const PORT              = process.env.PORT              || 3000;
const ETSY_CLIENT_ID    = process.env.ETSY_CLIENT_ID    || '';
const ETSY_SHOP_ID      = process.env.ETSY_SHOP_ID      || '';
const APP_URL           = process.env.APP_URL           || 'https://agent-atlas.onrender.com';
const FRONTEND_URL      = process.env.FRONTEND_URL      || 'https://tradeopsvault.com';
const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY || '';
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY || '';
const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET || '';
const STRIPE_PRICE_ID   = process.env.STRIPE_PRICE_ID   || ''; // $14.99/mo recurring price ID
const META_PIXEL_ID     = process.env.META_PIXEL_ID     || '1566084278857732';
const META_ACCESS_TOKEN = process.env.META_ACCESS_TOKEN || '';
const SENDGRID_API_KEY  = process.env.SENDGRID_API_KEY  || '';

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
const Anthropic   = require('@anthropic-ai/sdk');
const Stripe      = require('stripe');

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
  'https://tradeopsvault.com',
  'https://www.tradeopsvault.com',
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

/**
 * _downloadTokens: Map<token, { listingId, email, expiresAt, downloadCount, maxDownloads }>
 * Signed download tokens issued after a successful template purchase.
 */
const _downloadTokens = new Map();
const RELAY_TTL_MS = 10 * 60 * 1000;  // 10 minutes

/**
 * _usageStore: Map<`${deviceId}-${year}-${month}`, count>
 * Tracks AI analysis calls per device per month. Resets on server restart (acceptable for MVP).
 */
const _usageStore = new Map();
const AI_FREE_CALLS_PER_MONTH = 5;

// Clean up _usageStore entries older than 2 months to prevent unbounded growth.
setInterval(() => {
  const now = new Date();
  const cutoff = new Date(now.getFullYear(), now.getMonth() - 2, 1);
  for (const key of _usageStore.keys()) {
    // Key format: `${deviceId}-${year}-${month}` — extract year-month suffix
    const parts = key.split('-');
    if (parts.length >= 2) {
      const month = parseInt(parts[parts.length - 1], 10);
      const year  = parseInt(parts[parts.length - 2], 10);
      if (!isNaN(year) && !isNaN(month)) {
        const entryDate = new Date(year, month - 1, 1);
        if (entryDate < cutoff) _usageStore.delete(key);
      }
    }
  }
}, 24 * 60 * 60 * 1000);  // run daily

// ─── PKCE helpers ─────────────────────────────────────────────────────────────
function generateVerifier() {
  return crypto.randomBytes(48).toString('base64url');
}

function generateChallenge(verifier) {
  return crypto.createHash('sha256').update(verifier).digest('base64url');
}

// ─── Download token helpers ───────────────────────────────────────────────────
function generateDownloadToken(listingId, email) {
  const token = crypto.randomBytes(32).toString('hex');
  _downloadTokens.set(token, {
    listingId,
    email,
    expiresAt:     Date.now() + 24 * 60 * 60 * 1000, // 24 hours
    downloadCount: 0,
    maxDownloads:  5, // allow re-download up to 5 times
  });
  return token;
}

async function sendDownloadEmail(email, listingId, downloadUrl, listingTitle) {
  if (!SENDGRID_API_KEY) return;
  const body = {
    personalizations: [{ to: [{ email }] }],
    from: { email: 'mgleichner@tradeopsvault.com', name: 'TradeOpsVault' },
    subject: `Your download is ready — ${listingTitle}`,
    content: [{
      type: 'text/html',
      value: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#0d1526;color:#e2e8f0;padding:40px;border-radius:12px;">
          <div style="font-size:22px;font-weight:800;color:#ffffff;margin-bottom:8px;">TradeOps<span style="color:#e85d04">Vault</span></div>
          <h2 style="color:#ffffff;margin:24px 0 8px;">Your download is ready</h2>
          <p style="color:#94a3b8;margin:0 0 24px;">Thanks for your purchase. Click the button below to download your template. This link expires in 24 hours.</p>
          <a href="${downloadUrl}" style="display:inline-block;background:#e85d04;color:#ffffff;text-decoration:none;padding:14px 28px;border-radius:8px;font-weight:700;font-size:16px;margin-bottom:24px;">Download ${listingTitle}</a>
          <p style="color:#64748b;font-size:13px;margin:0;">Link expires in 24 hours. You can download up to 5 times.<br>Questions? Reply to this email or visit <a href="https://tradeopsvault.com" style="color:#e85d04;">tradeopsvault.com</a></p>
        </div>
      `
    }]
  };
  try {
    await fetch('https://api.sendgrid.com/v3/mail/send', {
      method:  'POST',
      headers: { 'Authorization': `Bearer ${SENDGRID_API_KEY}`, 'Content-Type': 'application/json' },
      body:    JSON.stringify(body),
    });
  } catch (e) { console.error('[email] SendGrid error:', e.message); }
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
// PRO SUBSCRIBERS — deviceId → { stripeCustomerId, subscriptionId, status, email }
// ═══════════════════════════════════════════════════════════════════════════════

const _proStore = new Map(); // key: deviceId

function isProSubscriber(deviceId) {
  const sub = _proStore.get(deviceId);
  return sub && sub.status === 'active';
}

// ═══════════════════════════════════════════════════════════════════════════════
// AI ANALYSIS — no auth required, open CORS (used by locally-opened templates)
// ═══════════════════════════════════════════════════════════════════════════════

const _aiCors = cors({ origin: '*', methods: ['GET', 'POST', 'OPTIONS'], allowedHeaders: ['Content-Type'] });

// ─── AI: analyze form ─────────────────────────────────────────────────────────
app.post('/ai/analyze', _aiCors, async (req, res) => {
  const { formType, formData, deviceId } = req.body || {};

  if (!formType || !formData || !deviceId) {
    return res.status(400).json({ ok: false, error: 'formType, formData, and deviceId are required' });
  }

  // Pro subscribers get unlimited calls — skip usage check
  const isPro = isProSubscriber(deviceId);
  const now   = new Date();
  const year  = now.getFullYear();
  const month = now.getMonth() + 1;
  const usageKey   = `${deviceId}-${year}-${month}`;
  const callsUsed  = _usageStore.get(usageKey) || 0;

  if (!isPro && callsUsed >= AI_FREE_CALLS_PER_MONTH) {
    return res.status(200).json({
      ok:           false,
      limitReached: true,
      message:      "You've used your 5 free AI analyses this month. Upgrade at tradeopsvault.com for unlimited access.",
    });
  }

  if (!ANTHROPIC_API_KEY) {
    logError('POST /ai/analyze: ANTHROPIC_API_KEY not set');
    return res.status(500).json({ ok: false, error: 'AI service not configured' });
  }

  try {
    const anthropic = new Anthropic({ apiKey: ANTHROPIC_API_KEY });

    const message = await anthropic.messages.create({
      model:      'claude-haiku-4-5-20251001',
      max_tokens: 1024,
      system:     'You are a trade business advisor analyzing a completed job form. Give specific, actionable insights in 3-5 bullet points. Be direct and practical — your user is a working contractor, not an office worker. Focus on: missed revenue opportunities, follow-up actions, safety flags, and business improvement tips.',
      messages: [
        {
          role:    'user',
          content: `Form type: ${formType}\n\nForm data:\n${JSON.stringify(formData, null, 2)}`,
        },
      ],
    });

    // Increment usage after successful call
    _usageStore.set(usageKey, callsUsed + 1);

    const analysis      = message.content.find(b => b.type === 'text')?.text || '';
    const newCallsUsed  = isPro ? callsUsed : callsUsed + 1;
    if (!isPro) _usageStore.set(usageKey, newCallsUsed);
    const callsRemaining = isPro ? Infinity : Math.max(0, AI_FREE_CALLS_PER_MONTH - newCallsUsed);

    res.json({ ok: true, analysis, callsUsed: newCallsUsed, callsRemaining: isPro ? 9999 : callsRemaining, isPro });

  } catch (err) {
    logError('POST /ai/analyze: Claude API error', { message: err.message });
    res.status(500).json({ ok: false, error: 'AI analysis failed — please try again' });
  }
});

// ─── AI: usage ────────────────────────────────────────────────────────────────
app.get('/ai/usage/:deviceId', _aiCors, (req, res) => {
  const { deviceId } = req.params;
  const now   = new Date();
  const year  = now.getFullYear();
  const month = now.getMonth() + 1;  // 1-based

  const usageKey    = `${deviceId}-${year}-${month}`;
  const callsUsed   = _usageStore.get(usageKey) || 0;
  const callsRemaining = Math.max(0, AI_FREE_CALLS_PER_MONTH - callsUsed);

  // Reset date is the 1st of next month
  const resetDate = new Date(year, month, 1).toISOString().slice(0, 10);

  res.json({ callsUsed, callsRemaining, resetDate });
});

// ═══════════════════════════════════════════════════════════════════════════════
// STRIPE SUBSCRIPTION
// ═══════════════════════════════════════════════════════════════════════════════

// ─── Create Stripe checkout session ──────────────────────────────────────────
app.post('/subscribe/create-session', _aiCors, async (req, res) => {
  if (!STRIPE_SECRET_KEY || !STRIPE_PRICE_ID) {
    return res.status(503).json({ ok: false, error: 'Subscription not yet configured' });
  }
  const { deviceId } = req.body || {};
  if (!deviceId) return res.status(400).json({ ok: false, error: 'deviceId required' });

  try {
    const stripe = Stripe(STRIPE_SECRET_KEY);
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [{ price: STRIPE_PRICE_ID, quantity: 1 }],
      client_reference_id: deviceId,
      success_url: `${APP_URL}/subscribe/success?session_id={CHECKOUT_SESSION_ID}&deviceId=${deviceId}`,
      cancel_url:  `https://tradeopsvault.com?cancelled=1`,
      metadata: { deviceId },
    });
    res.json({ ok: true, url: session.url });
  } catch (err) {
    logError('POST /subscribe/create-session failed', { message: err.message });
    res.status(500).json({ ok: false, error: 'Could not create checkout session' });
  }
});

// ─── Stripe webhook — raw body required ──────────────────────────────────────
app.post('/webhook/stripe', express.raw({ type: 'application/json' }), (req, res) => {
  if (!STRIPE_SECRET_KEY) return res.sendStatus(200);

  const stripe = Stripe(STRIPE_SECRET_KEY);
  const sig    = req.headers['stripe-signature'];
  let event;

  try {
    event = STRIPE_WEBHOOK_SECRET
      ? stripe.webhooks.constructEvent(req.body, sig, STRIPE_WEBHOOK_SECRET)
      : JSON.parse(req.body);
  } catch (err) {
    logError('Stripe webhook signature invalid', { message: err.message });
    return res.status(400).send(`Webhook error: ${err.message}`);
  }

  const obj = event.data.object;

  if (event.type === 'checkout.session.completed') {
    const listingId = obj.metadata?.listingId;

    if (listingId) {
      // ── Template purchase (shop) ──
      const email    = obj.customer_details?.email || '';
      const token    = generateDownloadToken(listingId, email);
      const listing  = LISTING_DATA[listingId] || {};
      const downloadUrl = `${APP_URL}/shop/download/${token}`;
      sendDownloadEmail(email, listingId, downloadUrl, listing.title || listingId).catch(() => {});
      logInfo('webhook: template purchase — download token issued', { listingId, email: email.slice(0, 4) + '…' });
    } else {
      // ── Pro subscription ──
      const deviceId = obj.client_reference_id || obj.metadata?.deviceId;
      if (deviceId) {
        _proStore.set(deviceId, {
          status:           'active',
          stripeCustomerId: obj.customer,
          subscriptionId:   obj.subscription,
          email:            obj.customer_details?.email || '',
          activatedAt:      new Date().toISOString(),
        });
        logInfo('Pro subscriber activated', { deviceId });
      }
    }
  }

  if (event.type === 'customer.subscription.deleted' || event.type === 'customer.subscription.paused') {
    // Find deviceId by subscriptionId
    for (const [deviceId, sub] of _proStore) {
      if (sub.subscriptionId === obj.id) {
        _proStore.set(deviceId, { ...sub, status: 'cancelled' });
        logInfo('Pro subscriber cancelled', { deviceId });
        break;
      }
    }
  }

  res.sendStatus(200);
});

// ─── Success page — activated confirmation ─────────────────────────────────
app.get('/subscribe/success', (req, res) => {
  const { deviceId } = req.query;
  if (deviceId && _proStore.has(deviceId)) {
    res.send(`<!DOCTYPE html><html><head><title>TradeOpsVault Pro Activated</title>
<style>body{font-family:Segoe UI,Arial,sans-serif;background:#0d1526;color:#fff;display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0;}
.card{background:#1a2744;border:1.5px solid #e85d04;border-radius:16px;padding:48px;text-align:center;max-width:480px;}
h1{color:#e85d04;font-size:2rem;margin-bottom:12px;}p{color:rgba(255,255,255,0.7);line-height:1.6;}
.badge{background:#e85d04;color:#fff;padding:8px 20px;border-radius:20px;font-weight:800;display:inline-block;margin-top:20px;}
</style></head><body><div class="card">
<div style="font-size:48px;margin-bottom:16px">✦</div>
<h1>You're Pro!</h1>
<p>TradeOpsVault Pro is now active on this device.<br>Your AI analyses are now <strong style="color:#fff">unlimited</strong>.</p>
<p style="margin-top:16px">Go back to your template and click <strong style="color:#e85d04">Analyze with AI</strong> — no more limits.</p>
<div class="badge">Pro Active · $14.99/mo</div>
</div></body></html>`);
  } else {
    res.send(`<!DOCTYPE html><html><head><title>Processing...</title>
<meta http-equiv="refresh" content="3;url=/subscribe/success?deviceId=${deviceId}">
<style>body{font-family:Segoe UI,Arial,sans-serif;background:#0d1526;color:#fff;display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0;}</style>
</head><body><p>Activating your Pro access... one moment.</p></body></html>`);
  }
});

// ─── Check pro status ─────────────────────────────────────────────────────────
app.get('/subscribe/status/:deviceId', _aiCors, (req, res) => {
  const sub = _proStore.get(req.params.deviceId);
  res.json({ isPro: !!(sub && sub.status === 'active'), status: sub?.status || 'free' });
});

// ═══════════════════════════════════════════════════════════════════════════════
// SHOP — Template purchase, download tokens, file delivery
// ═══════════════════════════════════════════════════════════════════════════════
// NOTE: Stripe Tax must be enabled in Stripe Dashboard → Tax → Enable automatic
// tax collection. Once enabled, automatic_tax: { enabled: true } handles US
// sales tax, EU VAT, UK VAT, and Canadian GST automatically.

// ─── POST /shop/checkout — create Stripe checkout session ────────────────────
app.post('/shop/checkout', _aiCors, async (req, res) => {
  if (!STRIPE_SECRET_KEY) {
    return res.status(503).json({ ok: false, error: 'Payment not yet configured — STRIPE_SECRET_KEY is missing.' });
  }

  const { listingId } = req.body || {};
  if (!listingId) return res.status(400).json({ ok: false, error: 'listingId required' });

  const listing = LISTING_DATA[listingId.toUpperCase().trim()];
  if (!listing) return res.status(404).json({ ok: false, error: `Listing ${listingId} not found` });

  const priceInCents = Math.round(parseFloat(listing.price) * 100); // e.g. 3.99 → 399

  try {
    const stripe  = Stripe(STRIPE_SECRET_KEY);
    const session = await stripe.checkout.sessions.create({
      mode:                 'payment',
      payment_method_types: ['card'],
      line_items: [{
        quantity:   1,
        price_data: {
          currency:     'usd',
          unit_amount:  priceInCents,
          product_data: { name: listing.title },
        },
      }],
      success_url:             `${FRONTEND_URL}/landing/success.html?session_id={CHECKOUT_SESSION_ID}&listing=${listingId.toUpperCase().trim()}`,
      cancel_url:              `${FRONTEND_URL}/landing/store.html`,
      customer_email:          undefined,    // collected by Stripe on the checkout page
      customer_creation:       'always',
      automatic_tax:           { enabled: true },
      metadata:                { listingId: listingId.toUpperCase().trim() },
      allow_promotion_codes:   true,
    });

    logInfo('shop/checkout: session created', { listingId, priceInCents });
    res.json({ ok: true, url: session.url });
  } catch (err) {
    logError('POST /shop/checkout failed', { message: err.message });
    res.status(500).json({ ok: false, error: 'Could not create checkout session' });
  }
});

// ─── GET /shop/success — called after payment to generate download token ──────
app.get('/shop/success', _aiCors, async (req, res) => {
  if (!STRIPE_SECRET_KEY) {
    return res.status(503).json({ ok: false, error: 'Payment not configured' });
  }

  const { session_id, listing } = req.query;
  if (!session_id || !listing) {
    return res.status(400).json({ ok: false, error: 'session_id and listing query params required' });
  }

  const listingId = listing.toUpperCase().trim();
  const listingData = LISTING_DATA[listingId];
  if (!listingData) return res.status(404).json({ ok: false, error: `Listing ${listingId} not found` });

  try {
    const stripe  = Stripe(STRIPE_SECRET_KEY);
    const session = await stripe.checkout.sessions.retrieve(session_id);

    if (session.payment_status !== 'paid') {
      return res.status(402).json({ ok: false, error: 'Payment not completed' });
    }

    const email = session.customer_details?.email || session.customer_email || '';
    const token = generateDownloadToken(listingId, email);
    const downloadUrl = `${APP_URL}/shop/download/${token}`;

    // Fire-and-forget email
    sendDownloadEmail(email, listingId, downloadUrl, listingData.title).catch(() => {});

    logInfo('shop/success: download token issued', { listingId, email: email.slice(0, 4) + '…' });
    res.json({
      ok:        true,
      token,
      listingId,
      email,
      title:     listingData.title,
      expiresAt: _downloadTokens.get(token).expiresAt,
    });
  } catch (err) {
    logError('GET /shop/success failed', { message: err.message });
    res.status(500).json({ ok: false, error: 'Could not verify payment session' });
  }
});

// ─── GET /shop/verify/:token — lightweight token validity check ───────────────
app.get('/shop/verify/:token', _aiCors, (req, res) => {
  const entry = _downloadTokens.get(req.params.token);
  if (!entry) return res.status(404).json({ ok: false, error: 'Token not found' });
  if (Date.now() > entry.expiresAt) return res.status(410).json({ ok: false, error: 'Download link has expired' });
  if (entry.downloadCount >= entry.maxDownloads) return res.status(410).json({ ok: false, error: 'Download limit reached' });

  const listingData = LISTING_DATA[entry.listingId] || {};
  res.json({
    ok:                true,
    listingId:         entry.listingId,
    title:             listingData.title || entry.listingId,
    email:             entry.email,
    expiresAt:         entry.expiresAt,
    downloadsRemaining: entry.maxDownloads - entry.downloadCount,
  });
});

// ─── GET /shop/download/:token — stream the actual file ──────────────────────
app.get('/shop/download/:token', async (req, res) => {
  const entry = _downloadTokens.get(req.params.token);
  if (!entry) return res.status(404).json({ ok: false, error: 'Token not found' });
  if (Date.now() > entry.expiresAt) return res.status(410).json({ ok: false, error: 'Download link has expired' });
  if (entry.downloadCount >= entry.maxDownloads) {
    return res.status(410).json({ ok: false, error: `Download limit reached (max ${entry.maxDownloads})` });
  }

  const { listingId } = entry;
  const fs   = require('fs');
  const path = require('path');

  // Bundle: return JSON listing individual download tokens for each of the 20 templates
  if (listingId === 'LS-BUNDLE') {
    entry.downloadCount++;
    const bundleTokens = {};
    for (let i = 1; i <= 20; i++) {
      const id  = `LS-${String(i).padStart(3, '0')}`;
      const tok = generateDownloadToken(id, entry.email);
      bundleTokens[id] = {
        title:       (LISTING_DATA[id] || {}).title || id,
        downloadUrl: `${APP_URL}/shop/download/${tok}`,
        verifyUrl:   `${APP_URL}/shop/verify/${tok}`,
      };
    }
    return res.json({ ok: true, bundle: true, downloads: bundleTokens });
  }

  // Individual template: find matching HTML file in /downloads/
  const downloadsDir = path.join(__dirname, '..', 'downloads');
  let filePath = null;
  try {
    const files = fs.readdirSync(downloadsDir);
    const match = files.find(f => f.startsWith(listingId + '-') && f.endsWith('.html'));
    if (match) filePath = path.join(downloadsDir, match);
  } catch (fsErr) {
    logError('shop/download: could not read downloads dir', { message: fsErr.message });
  }

  if (!filePath || !fs.existsSync(filePath)) {
    return res.status(404).json({ ok: false, error: `File for ${listingId} not found on server` });
  }

  entry.downloadCount++;
  const filename = path.basename(filePath).replace(/\.html$/, '') + '-TradeOpsVault.html';
  res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
  res.setHeader('Content-Type', 'text/html');
  fs.createReadStream(filePath).pipe(res);
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

// ─── Listings Data (/listings/:id) ───────────────────────────────────────────
// Used by the Atlas bookmarklet to fetch any listing's title/desc/tags/price
// without needing clipboard permissions or "Prepare Launch" first.
const LISTING_DATA = {
  'LS-001': { title:'HVAC Service Call Notes | AI-Powered Fillable PDF | HVAC Business Form Template', price:'3.99', tags:'hvac service form,hvac invoice template,air conditioning repair,hvac technician form,hvac service call,digital download,fillable pdf form,small business form,printable template,contractor template,trades business form,instant download,auto repair form', desc:`Professional HVAC business form — fillable directly in your browser, print as PDF, no software required.\n\n✦ AI-POWERED: Hit "Analyze with AI" for instant professional feedback, diagnosis suggestions, and recommendations.\n\n⚡ SMART TEMPLATES: Auto-calculates invoice totals, labor costs, and materials in real time.\n\n📊 EXPORT: Download as CSV, connect to Zapier, Google Sheets, QuickBooks and 5,000+ apps.\n\n🌐 4 LANGUAGES: English, Español, Français, Português.\n\nWHAT YOU GET:\n✓ 3-page service call form\n✓ Diagnosis checklist\n✓ Refrigerant record\n✓ Parts & labor invoice\n✓ Job history log\n✓ AI analysis button\n✓ Unlimited prints\n✓ Instant download\n\nTradeOpsVault · tradeopsvault.com` },
  'LS-002': { title:'Plumbing Dispatch Checklist | AI-Powered Fillable PDF | Plumbing Business Form Template', price:'3.99', tags:'plumbing invoice template,plumber dispatch form,plumbing service form,plumber job sheet,plumbing work order,digital download,fillable pdf form,small business form,printable template,contractor template,trades business form,instant download,plumbing checklist', desc:`Professional Plumbing business form — fillable in browser, print as PDF, no software required.\n\n✦ AI-POWERED: Instant feedback and diagnosis suggestions after filling.\n⚡ SMART: Auto-calculating invoice totals.\n📊 EXPORT: CSV, Zapier, CRM.\n🌐 4 LANGUAGES.\n\nIncludes dispatch priority, parts & labor invoice, job history, client sign-off.\n\nTradeOpsVault · tradeopsvault.com` },
  'LS-003': { title:'Electrician Jobsite Inspection Form | AI-Powered Fillable PDF | Electrician Business Template', price:'3.99', tags:'electrician inspection form,electrical contractor form,electrician invoice,electrical jobsite form,electrician template,digital download,fillable pdf form,small business form,contractor template,trades business form,instant download,electrical checklist,electrician paperwork', desc:`Professional Electrician jobsite inspection form — fillable in browser, print as PDF.\n\n✦ AI-POWERED · ⚡ SMART CALC · 📊 EXPORT · 🌐 4 LANGUAGES\n\nIncludes hazard assessment, panel & circuit inspection, code violations log, sign-off.\n\nTradeOpsVault · tradeopsvault.com` },
  'LS-004': { title:'Lawn Care Weekly Crew Planner | AI-Powered Fillable PDF | Lawn Business Form Template', price:'3.99', tags:'lawn care business form,landscaping invoice template,lawn service schedule,crew planner template,landscaping business form,digital download,fillable pdf form,small business form,printable template,contractor template,trades business form,instant download,lawn route planner', desc:`Professional Lawn Care crew planner — fillable in browser, print as PDF.\n\n✦ AI-POWERED · ⚡ SMART CALC · 📊 EXPORT · 🌐 4 LANGUAGES\n\nIncludes weekly route planner, crew hour tracker, daily job list, end-of-day summary.\n\nTradeOpsVault · tradeopsvault.com` },
  'LS-005': { title:'Auto Detail Intake & Waiver Form | AI-Powered Fillable PDF | Auto Detailing Business Template', price:'3.99', tags:'auto detail form,car detailing invoice,detailing waiver template,auto detailing intake form,car wash business form,digital download,fillable pdf form,small business form,printable template,contractor template,trades business form,instant download,detailing contract', desc:`Professional Auto Detail intake & waiver — fillable in browser, print as PDF.\n\n✦ AI-POWERED · ⚡ SMART CALC · 📊 EXPORT · 🌐 4 LANGUAGES\n\nIncludes vehicle intake checklist, liability waiver, service selections, pre-existing damage log.\n\nTradeOpsVault · tradeopsvault.com` },
  'LS-006': { title:'Pest Control Follow-Up Cards | AI-Powered Fillable PDF | Pest Control Business Template', price:'3.99', tags:'pest control form,exterminator invoice template,pest control service form,pest treatment record,exterminator business form,digital download,fillable pdf form,small business form,printable template,contractor template,trades business form,instant download,pest control invoice', desc:`Professional Pest Control follow-up cards — fillable in browser, print as PDF.\n\n✦ AI-POWERED · ⚡ SMART CALC · 📊 EXPORT · 🌐 4 LANGUAGES\n\nIncludes treatment summary, chemical dosage record, follow-up scheduling, service invoice.\n\nTradeOpsVault · tradeopsvault.com` },
  'LS-007': { title:'Roofing Change Order Approval Form | AI-Powered Fillable PDF | Roofing Contractor Template', price:'3.99', tags:'roofing change order form,roofing contractor template,roofing invoice template,roofing business form,contractor change order,digital download,fillable pdf form,small business form,printable template,contractor template,trades business form,instant download,roofing paperwork', desc:`Professional Roofing change order form — fillable in browser, print as PDF.\n\n✦ AI-POWERED · ⚡ SMART CALC · 📊 EXPORT · 🌐 4 LANGUAGES\n\nIncludes scope of change, price adjustment, authorization & signature, contract total update.\n\nTradeOpsVault · tradeopsvault.com` },
  'LS-008': { title:'Pressure Washing Route Sheet | AI-Powered Fillable PDF | Pressure Washing Business Template', price:'3.99', tags:'pressure washing form,power washing invoice,pressure washing business form,power washing route sheet,cleaning contractor form,digital download,fillable pdf form,small business form,printable template,contractor template,trades business form,instant download,pressure washing invoice', desc:`Professional Pressure Washing route sheet — fillable in browser, print as PDF.\n\n✦ AI-POWERED · ⚡ SMART CALC · 📊 EXPORT · 🌐 4 LANGUAGES\n\nIncludes daily client route, PSI & detergent log, client sign-off per stop, service invoice.\n\nTradeOpsVault · tradeopsvault.com` },
  'LS-009': { title:'Appliance Repair Parts Tracker | AI-Powered Fillable PDF | Appliance Repair Business Template', price:'3.99', tags:'appliance repair form,appliance technician invoice,appliance repair tracker,parts order form,appliance business template,digital download,fillable pdf form,small business form,printable template,contractor template,trades business form,instant download,appliance repair invoice', desc:`Professional Appliance Repair parts tracker — fillable in browser, print as PDF.\n\n✦ AI-POWERED · ⚡ SMART CALC · 📊 EXPORT · 🌐 4 LANGUAGES\n\nIncludes parts order log with ETA, supplier tracking, cost summary, service invoice.\n\nTradeOpsVault · tradeopsvault.com` },
  'LS-010': { title:'Handyman Materials Reimbursement Form | AI-Powered Fillable PDF | Handyman Business Template', price:'3.99', tags:'handyman invoice template,handyman business form,materials reimbursement form,handyman receipt form,home repair invoice,digital download,fillable pdf form,small business form,printable template,contractor template,trades business form,instant download,handyman paperwork', desc:`Professional Handyman materials reimbursement form — fillable in browser, print as PDF.\n\n✦ AI-POWERED · ⚡ SMART CALC · 📊 EXPORT · 🌐 4 LANGUAGES\n\nIncludes materials purchased log, receipt tracking, auto-calculating totals, client sign-off.\n\nTradeOpsVault · tradeopsvault.com` },
  'LS-011': { title:'Mobile Mechanic Service Summary | AI-Powered Fillable PDF | Mobile Mechanic Business Template', price:'3.99', tags:'mobile mechanic form,mechanic invoice template,auto repair invoice,mobile mechanic invoice,mechanic service form,digital download,fillable pdf form,small business form,printable template,contractor template,trades business form,instant download,mechanic paperwork', desc:`Professional Mobile Mechanic service summary — fillable in browser, print as PDF.\n\n✦ AI-POWERED · ⚡ SMART CALC · 📊 EXPORT · 🌐 4 LANGUAGES\n\nIncludes vehicle info, parts replaced tracker, OEM vs aftermarket log, labor invoice.\n\nTradeOpsVault · tradeopsvault.com` },
  'LS-012': { title:'Locksmith Job Authorization Form | AI-Powered Fillable PDF | Locksmith Business Template', price:'3.99', tags:'locksmith invoice template,locksmith job form,locksmith authorization form,locksmith business form,locksmith service record,digital download,fillable pdf form,small business form,printable template,contractor template,trades business form,instant download,locksmith paperwork', desc:`Professional Locksmith job authorization form — fillable in browser, print as PDF.\n\n✦ AI-POWERED · ⚡ SMART CALC · 📊 EXPORT · 🌐 4 LANGUAGES\n\nIncludes ID verification, authorization statement, service invoice, client sign-off.\n\nTradeOpsVault · tradeopsvault.com` },
  'LS-013': { title:'Painting Prep & Final Punch List | AI-Powered Fillable PDF | Painting Contractor Template', price:'3.99', tags:'painting contractor form,painter invoice template,painting punch list,paint contractor checklist,painting business form,digital download,fillable pdf form,small business form,printable template,contractor template,trades business form,instant download,painting paperwork', desc:`Professional Painting prep & final punch list — fillable in browser, print as PDF.\n\n✦ AI-POWERED · ⚡ SMART CALC · 📊 EXPORT · 🌐 4 LANGUAGES\n\nIncludes surface prep checklist, room-by-room punch list, primer notes, final walkthrough sign-off.\n\nTradeOpsVault · tradeopsvault.com` },
  'LS-014': { title:'Snow Removal Service Checklist | AI-Powered Fillable PDF | Snow Removal Business Template', price:'3.99', tags:'snow removal form,snow plowing invoice,snow removal checklist,winter service form,snow plow business template,digital download,fillable pdf form,small business form,printable template,contractor template,trades business form,instant download,snow removal invoice', desc:`Professional Snow Removal service checklist — fillable in browser, print as PDF.\n\n✦ AI-POWERED · ⚡ SMART CALC · 📊 EXPORT · 🌐 4 LANGUAGES\n\nIncludes trigger conditions log, client route priority, salt & sand tracker, pre-season check.\n\nTradeOpsVault · tradeopsvault.com` },
  'LS-015': { title:'Window Cleaning Client Packet | AI-Powered Fillable PDF | Window Cleaning Business Template', price:'3.99', tags:'window cleaning form,window washing invoice,window cleaning business form,window cleaner template,cleaning service invoice,digital download,fillable pdf form,small business form,printable template,contractor template,trades business form,instant download,window cleaning invoice', desc:`Professional Window Cleaning client packet — fillable in browser, print as PDF.\n\n✦ AI-POWERED · ⚡ SMART CALC · 📊 EXPORT · 🌐 4 LANGUAGES\n\nIncludes service packet, visit schedule tracker, service type log, client sign-off.\n\nTradeOpsVault · tradeopsvault.com` },
  'LS-016': { title:'Pool Service Chemical Log | AI-Powered Fillable PDF | Pool Service Business Template', price:'3.99', tags:'pool service form,pool maintenance log,pool chemical log,pool technician form,swimming pool service form,digital download,fillable pdf form,small business form,printable template,contractor template,trades business form,instant download,pool service invoice', desc:`Professional Pool Service chemical log — fillable in browser, print as PDF.\n\n✦ AI-POWERED · ⚡ SMART CALC · 📊 EXPORT · 🌐 4 LANGUAGES\n\nIncludes weekly water chemistry log, chemical dosage record, service invoice, equipment notes.\n\nTradeOpsVault · tradeopsvault.com` },
  'LS-017': { title:'Flooring Estimate Scope Matrix | AI-Powered Fillable PDF | Flooring Contractor Template', price:'3.99', tags:'flooring estimate template,flooring contractor form,flooring invoice template,flooring business form,floor installation estimate,digital download,fillable pdf form,small business form,printable template,contractor template,trades business form,instant download,flooring quote', desc:`Professional Flooring estimate scope matrix — fillable in browser, print as PDF.\n\n✦ AI-POWERED · ⚡ SMART CALC (auto sq ft totals) · 📊 EXPORT · 🌐 4 LANGUAGES\n\nIncludes room-by-room scope, auto-calculating sq ft totals, material & labor pricing, estimate total.\n\nTradeOpsVault · tradeopsvault.com` },
  'LS-018': { title:'Contractor Daily Site Report | AI-Powered Fillable PDF | General Contractor Template', price:'3.99', tags:'contractor daily report,construction site report,contractor form template,daily site log,construction daily report,digital download,fillable pdf form,small business form,printable template,contractor template,trades business form,instant download,contractor paperwork', desc:`Professional Contractor daily site report — fillable in browser, print as PDF.\n\n✦ AI-POWERED · ⚡ SMART CALC · 📊 EXPORT · 🌐 4 LANGUAGES\n\nIncludes crew roster & hours, materials used log, delays & safety notes, next day plan.\n\nTradeOpsVault · tradeopsvault.com` },
  'LS-019': { title:'Septic Service Pump Log | AI-Powered Fillable PDF | Septic Service Business Template', price:'3.99', tags:'septic service form,septic pump log,septic technician form,septic service invoice,septic business template,digital download,fillable pdf form,small business form,printable template,contractor template,trades business form,instant download,septic paperwork', desc:`Professional Septic Service pump log — fillable in browser, print as PDF.\n\n✦ AI-POWERED · ⚡ SMART CALC · 📊 EXPORT · 🌐 4 LANGUAGES\n\nIncludes pump log with manifest #, waste disposal tracking, tank details, service invoice.\n\nTradeOpsVault · tradeopsvault.com` },
  'LS-020': { title:'Service Fee Transparency Addendum | AI-Powered Fillable PDF | Service Business Template', price:'3.99', tags:'service fee form,contractor fee schedule,service pricing form,business fee template,contractor pricing form,digital download,fillable pdf form,small business form,printable template,contractor template,trades business form,instant download,fee disclosure', desc:`Professional Service Fee Transparency addendum — fillable in browser, print as PDF.\n\n✦ AI-POWERED · ⚡ SMART CALC · 📊 EXPORT · 🌐 4 LANGUAGES\n\nIncludes current fee schedule, payment methods, payment terms, client acknowledgment.\n\nTradeOpsVault · tradeopsvault.com` },
  'LS-BUNDLE': { title:'All 20 Trades Business Forms – Complete Bundle | AI-Powered Fillable PDF Templates', price:'9.99', tags:'trades business forms,contractor form bundle,small business templates,digital download bundle,fillable pdf bundle,hvac plumbing forms,electrician forms,contractor templates,trades invoice bundle,business form set,ai powered forms,printable form bundle,instant download', desc:`Get all 20 professional trade business templates in one instant download — AI-powered, smart auto-calculating, available in 4 languages.\n\n✦ AI analysis on every form\n⚡ Auto-calculating invoices\n🌐 English, Español, Français, Português\n📊 CSV export, Zapier, CRM\n\n20 TRADES: HVAC · Plumbing · Electrical · Lawn Care · Auto Detail · Pest Control · Roofing · Pressure Washing · Appliance Repair · Handyman · Mobile Mechanic · Locksmith · Painting · Snow Removal · Window Cleaning · Pool Service · Flooring · Contractor · Septic · Service Fee\n\nTradeOpsVault · tradeopsvault.com` },
};

// ─── CRM Jobs (server-side sync) ─────────────────────────────────────────────
const _jobStore = new Map();

app.post('/crm/jobs', _aiCors, (req, res) => {
  const { deviceId, jobs } = req.body;
  if (!deviceId || !Array.isArray(jobs)) return res.status(400).json({ ok: false, error: 'deviceId and jobs[] required' });
  _jobStore.set(deviceId, jobs);
  res.json({ ok: true, saved: jobs.length });
});

app.get('/crm/jobs/:deviceId', _aiCors, (req, res) => {
  const jobs = _jobStore.get(req.params.deviceId) || [];
  res.json({ ok: true, jobs });
});

// ─── CRM Leads (Business tier inbound) ───────────────────────────────────────
const _leadStore = [];

app.post('/crm/leads', _aiCors, (req, res) => {
  const { name, businessName, trade, phone, email, message } = req.body || {};
  if (!name || !email) {
    return res.status(400).json({ ok: false, error: 'name and email are required' });
  }

  const lead = {
    id:           _leadStore.length + 1,
    name,
    businessName: businessName || '',
    trade:        trade || '',
    phone:        phone || '',
    email,
    message:      message || '',
    receivedAt:   new Date().toISOString(),
  };

  _leadStore.push(lead);

  // Append to outreach tracker log (best-effort)
  try {
    const fs   = require('fs');
    const path = require('path');
    const logDir  = path.join(__dirname, 'outreach');
    const logFile = path.join(logDir, 'leads.log');
    if (!fs.existsSync(logDir)) fs.mkdirSync(logDir, { recursive: true });
    const line = `[${lead.receivedAt}] LEAD #${lead.id} — ${lead.name} | ${lead.businessName} | ${lead.trade} | ${lead.phone} | ${lead.email}\n`;
    fs.appendFileSync(logFile, line, 'utf8');
  } catch (logErr) {
    logError('crm/leads: could not append to leads.log', { message: logErr.message });
  }

  logInfo('crm/leads: new lead received', { id: lead.id, trade: lead.trade, email: lead.email });
  res.json({ ok: true, id: lead.id });
});

// ─── Outreach Campaign Routes ─────────────────────────────────────────────────
app.use('/outreach', require('../outreach/server-routes'));

// ─── Meta Conversions API ─────────────────────────────────────────────────────
// Server-side event firing — works even when browser blocks the Pixel
app.post('/meta/event', async (req, res) => {
  if (!META_ACCESS_TOKEN) return res.json({ ok: false, error: 'Meta not configured' });
  const { eventName, eventData = {} } = req.body;
  if (!eventName) return res.status(400).json({ ok: false, error: 'eventName required' });

  const payload = {
    data: [{
      event_name: eventName,
      event_time: Math.floor(Date.now() / 1000),
      action_source: 'website',
      event_source_url: eventData.url || 'https://tradeopsvault.com',
      user_data: {
        client_ip_address: req.ip,
        client_user_agent: req.headers['user-agent'] || '',
        ...(eventData.email ? { em: [require('crypto').createHash('sha256').update(eventData.email.toLowerCase().trim()).digest('hex')] } : {}),
      },
      custom_data: {
        currency: 'USD',
        value: eventData.value || 0,
        content_name: eventData.contentName || '',
        content_type: 'product',
      },
    }],
  };

  try {
    const https = require('https');
    const body = JSON.stringify(payload);
    const options = {
      hostname: 'graph.facebook.com',
      path: `/v19.0/${META_PIXEL_ID}/events?access_token=${META_ACCESS_TOKEN}`,
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(body) },
    };
    const result = await new Promise((resolve, reject) => {
      const r = https.request(options, (resp) => {
        let d = '';
        resp.on('data', chunk => d += chunk);
        resp.on('end', () => resolve(JSON.parse(d)));
      });
      r.on('error', reject);
      r.write(body);
      r.end();
    });
    res.json({ ok: true, result });
  } catch (err) {
    res.json({ ok: false, error: err.message });
  }
});

// Open CORS for the bookmarklet (runs on etsy.com — no Origin header match needed)
app.get('/listings/:id', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  const id = (req.params.id || '').toUpperCase().trim();
  const listing = LISTING_DATA[id];
  if (!listing) {
    return res.json({ ok: false, error: `Listing ${id} not found. Valid IDs: LS-001 through LS-020, LS-BUNDLE` });
  }
  res.json({ ok: true, listing: { ...listing, id } });
});

app.get('/listings', (_req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  const all = Object.entries(LISTING_DATA).map(([id, l]) => ({ id, title: l.title, price: l.price }));
  res.json({ ok: true, listings: all });
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
