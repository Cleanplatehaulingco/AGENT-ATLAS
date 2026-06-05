/**
 * server-routes.js
 * Express router (CommonJS) for TradeOpsVault outreach campaign management API.
 * Mount in your existing server.js with: app.use(require('./outreach/server-routes'))
 */

'use strict';

const express = require('express');
const router = express.Router();

// ─── Lazy-load ES module campaign manager ────────────────────────────────────
// The rest of the outreach system uses ES modules. We bridge them here via
// dynamic import() which is available in CommonJS as an async expression.

let _campaignManagerModule = null;
async function getCampaignManagerModule() {
  if (!_campaignManagerModule) {
    _campaignManagerModule = await import('./campaign-manager.js');
  }
  return _campaignManagerModule;
}

let _leadFinderModule = null;
async function getLeadFinderModule() {
  if (!_leadFinderModule) {
    _leadFinderModule = await import('./lead-finder.js');
  }
  return _leadFinderModule;
}

let _trackerModule = null;
async function getTrackerModule() {
  if (!_trackerModule) {
    _trackerModule = await import('./tracker.js');
  }
  return _trackerModule;
}

let _intelligenceModule = null;
async function getIntelligenceModule() {
  if (!_intelligenceModule) {
    _intelligenceModule = await import('./intelligence.js');
  }
  return _intelligenceModule;
}

// ─── Singleton campaign manager instance ─────────────────────────────────────
// Created on first use; config is pulled from environment variables.

let _manager = null;
async function getManager() {
  if (!_manager) {
    const { CampaignManager } = await getCampaignManagerModule();
    _manager = new CampaignManager({
      googleApiKey: process.env.GOOGLE_PLACES_API_KEY || '',
      hunterApiKey: process.env.HUNTER_API_KEY || '',
      anthropicApiKey: process.env.ANTHROPIC_API_KEY || '',
      sendgridApiKey: process.env.SENDGRID_API_KEY || '',
      fromEmail: process.env.OUTREACH_FROM_EMAIL || '',
      fromName: process.env.OUTREACH_FROM_NAME || 'TradeOpsVault',
      // Default campaign start date to today if not set
      campaignStartDate: process.env.CAMPAIGN_START_DATE || new Date().toISOString().slice(0, 10),
    });
  }
  return _manager;
}

// ─── Routes ──────────────────────────────────────────────────────────────────

/**
 * POST /outreach/campaign/start
 * Body: { trades: string[], cities: [{ city, state }][], dailyTarget: number }
 * Starts the campaign in the background and returns a campaignId.
 */
router.post('/campaign/start', async (req, res) => {
  const { trades, cities, dailyTarget } = req.body || {};

  if (!Array.isArray(trades) || trades.length === 0) {
    return res.status(400).json({ error: 'trades must be a non-empty array' });
  }
  if (!Array.isArray(cities) || cities.length === 0) {
    return res.status(400).json({ error: 'cities must be a non-empty array of { city, state } objects' });
  }
  const target = parseInt(dailyTarget, 10) || 20;

  const campaignId = `campaign_${Date.now()}`;

  // Run campaign asynchronously — don't block the HTTP response
  (async () => {
    try {
      const manager = await getManager();
      const stats = await manager.runCampaign(trades, cities, target);
      console.log(`[server-routes] Campaign ${campaignId} finished:`, stats);
    } catch (err) {
      console.error(`[server-routes] Campaign ${campaignId} error: ${err.message}`);
    }
  })();

  res.status(202).json({
    campaignId,
    message: 'Campaign started in background',
    trades,
    cities,
    dailyTarget: target,
    startedAt: new Date().toISOString(),
  });
});

/**
 * GET /outreach/campaign/stats
 * Returns aggregate stats from the campaign log.
 */
router.get('/campaign/stats', async (req, res) => {
  try {
    const manager = await getManager();
    const stats = manager.getCampaignStats();
    res.json(stats);
  } catch (err) {
    console.error(`[server-routes] Stats error: ${err.message}`);
    res.status(500).json({ error: 'Failed to retrieve campaign stats' });
  }
});

/**
 * POST /outreach/unsubscribe/:token
 * Marks the email (base64-decoded from :token) as unsubscribed.
 */
router.post('/unsubscribe/:token', async (req, res) => {
  const { token } = req.params;

  let email;
  try {
    email = Buffer.from(token, 'base64').toString('utf8');
    if (!email || !email.includes('@')) throw new Error('invalid email');
  } catch {
    return res.status(400).json({ error: 'Invalid unsubscribe token' });
  }

  try {
    const manager = await getManager();
    manager.markUnsubscribe(email);
    res.json({ success: true, email, unsubscribedAt: new Date().toISOString() });
  } catch (err) {
    console.error(`[server-routes] Unsubscribe error for ${email}: ${err.message}`);
    res.status(500).json({ error: 'Failed to process unsubscribe' });
  }
});

/**
 * GET /outreach/leads/preview
 * Runs a lead search for the first trade+city combo and returns up to 5 sample leads.
 * Query params: trade (default "HVAC"), city (default "Austin"), state (default "TX")
 * No emails are sent.
 */
router.get('/leads/preview', async (req, res) => {
  const trade = req.query.trade || 'HVAC';
  const city = req.query.city || 'Austin';
  const state = req.query.state || 'TX';

  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'GOOGLE_PLACES_API_KEY environment variable not set' });
  }

  try {
    const { findLeads } = await getLeadFinderModule();
    const leads = await findLeads(trade, city, state, apiKey);
    const preview = leads.slice(0, 5).map((lead) => ({
      name: lead.name,
      address: lead.address,
      phone: lead.phone,
      website: lead.website,
      domain: lead.domain,
      rating: lead.rating,
      reviewCount: lead.reviewCount,
    }));
    res.json({ trade, city, state, count: preview.length, leads: preview });
  } catch (err) {
    console.error(`[server-routes] Lead preview error: ${err.message}`);
    res.status(500).json({ error: `Lead search failed: ${err.message}` });
  }
});

/**
 * GET /outreach/warmup-status
 * Returns the current warmup day, daily send limit, and emails sent today.
 */
router.get('/warmup-status', async (req, res) => {
  try {
    const manager = await getManager();
    const status = manager.getWarmupStatus();
    res.json(status);
  } catch (err) {
    console.error(`[server-routes] Warmup status error: ${err.message}`);
    res.status(500).json({ error: 'Failed to retrieve warmup status' });
  }
});

/**
 * GET /outreach/log
 * Returns all outreach records from the tracker log.
 */
router.get('/log', async (req, res) => {
  try {
    const { getOutreachLog } = await getTrackerModule();
    const records = getOutreachLog();
    res.json({ ok: true, count: records.length, records });
  } catch (err) {
    console.error(`[server-routes] Outreach log error: ${err.message}`);
    res.status(500).json({ error: 'Failed to retrieve outreach log' });
  }
});

/**
 * POST /outreach/log/:id
 * Updates a specific outreach record by id.
 * Body: partial record fields to merge (e.g. { notes, emailStatus, repliedAt })
 */
router.post('/log/:id', async (req, res) => {
  const { id } = req.params;
  const updates = req.body || {};

  // Disallow overwriting the id itself
  delete updates.id;

  try {
    const { updateOutreach } = await getTrackerModule();
    const updated = updateOutreach(id, updates);
    if (!updated) {
      return res.status(404).json({ error: `Record ${id} not found` });
    }
    res.json({ ok: true, record: updated });
  } catch (err) {
    console.error(`[server-routes] Outreach update error for ${id}: ${err.message}`);
    res.status(500).json({ error: 'Failed to update outreach record' });
  }
});

// ─── Intelligence Routes ──────────────────────────────────────────────────────

/**
 * GET /outreach/intelligence/insights
 * Returns latest AI insights from intelligence-log.json
 */
router.get('/intelligence/insights', async (req, res) => {
  try {
    const { getLatestInsights } = await getIntelligenceModule();
    const insights = getLatestInsights();
    if (!insights) {
      return res.json({ ok: true, insights: null, message: 'No analysis has been run yet.' });
    }
    res.json({ ok: true, insights });
  } catch (err) {
    console.error(`[server-routes] Intelligence insights error: ${err.message}`);
    res.status(500).json({ error: 'Failed to retrieve insights' });
  }
});

/**
 * GET /outreach/intelligence/score
 * Scores a single lead on demand.
 * Query params: name, trade, city, website
 */
router.get('/intelligence/score', async (req, res) => {
  const { name, trade, city, website } = req.query;

  if (!name || !trade || !city) {
    return res.status(400).json({ error: 'name, trade, and city query params are required' });
  }

  try {
    const { scoreLead } = await getIntelligenceModule();
    const lead = {
      name: name || '',
      trade: trade || '',
      city: city || '',
      website: website || null,
      rating: parseFloat(req.query.rating) || null,
      reviewCount: parseInt(req.query.reviewCount, 10) || null,
      isHiring: req.query.isHiring === 'true',
      facebookFound: req.query.facebookFound === 'true',
      decisionMakerFound: req.query.decisionMakerFound === 'true',
      websiteLive: req.query.websiteLive !== 'false',
    };
    const result = await scoreLead(lead);
    res.json({ ok: true, lead: { name, trade, city }, score: result });
  } catch (err) {
    console.error(`[server-routes] Lead score error: ${err.message}`);
    res.status(500).json({ error: `Failed to score lead: ${err.message}` });
  }
});

/**
 * POST /outreach/intelligence/analyze
 * Triggers weekly AI analysis manually.
 */
router.post('/intelligence/analyze', async (req, res) => {
  try {
    const manager = await getManager();
    // Run analysis in background
    const analysisPromise = manager.runWeeklyAnalysis();
    res.status(202).json({ ok: true, message: 'Analysis started. Check intelligence-log.json for results.' });
    // Log any errors after response sent
    analysisPromise.catch((err) => {
      console.error(`[server-routes] Weekly analysis error: ${err.message}`);
    });
  } catch (err) {
    console.error(`[server-routes] Analyze route error: ${err.message}`);
    res.status(500).json({ error: `Failed to start analysis: ${err.message}` });
  }
});

module.exports = router;
