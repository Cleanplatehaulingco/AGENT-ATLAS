/**
 * intelligence.js
 * AI learning engine for TradeOpsVault outreach campaigns.
 * Uses Claude claude-haiku-4-5 to analyze campaign performance, score leads,
 * and generate personalized emails.
 */

import fs from 'fs';
import path from 'path';
import Anthropic from '@anthropic-ai/sdk';

const INTELLIGENCE_LOG = path.resolve('./outreach/intelligence-log.json');
const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

// ─── File helpers ─────────────────────────────────────────────────────────────

function readJsonFile(filePath, defaultValue) {
  try {
    if (!fs.existsSync(filePath)) return defaultValue;
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch (err) {
    console.error(`[intelligence] Failed to read ${filePath}: ${err.message}`);
    return defaultValue;
  }
}

function appendToIntelligenceLog(entry) {
  const log = readJsonFile(INTELLIGENCE_LOG, []);
  log.push({ ...entry, timestamp: new Date().toISOString() });
  try {
    const dir = path.dirname(INTELLIGENCE_LOG);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(INTELLIGENCE_LOG, JSON.stringify(log, null, 2), 'utf8');
  } catch (err) {
    console.error(`[intelligence] Failed to write intelligence log: ${err.message}`);
  }
}

// ─── analyzeAndAdapt ──────────────────────────────────────────────────────────

/**
 * Analyzes campaign performance and rewrites low-performing templates.
 *
 * @param {object} campaignStats  - { openRate, replyRate, conversionRate, byTrade, byCity, bySubject }
 * @param {object[]} previousEmails - [{ subject, body, trade, city, opened, replied, converted }]
 * @returns {Promise<{ insights: string[], bestSubjectPatterns: string[], worstPerformers: object[], rewrittenTemplates: object[] }>}
 */
export async function analyzeAndAdapt(campaignStats, previousEmails) {
  const prompt = `You are an email optimization expert. Analyze these campaign results and identify:
1) Which subject line patterns get the most opens
2) Which email body patterns get replies
3) Which trades/cities underperform
4) Rewrite the 3 lowest-performing email templates.

Campaign Stats:
${JSON.stringify(campaignStats, null, 2)}

Previous Emails (sample of ${previousEmails.length}):
${JSON.stringify(previousEmails.slice(0, 20), null, 2)}

Return JSON: { insights: string[], bestSubjectPatterns: string[], worstPerformers: {trade, city, reason}[], rewrittenTemplates: [{original, improved, reason}] }`;

  try {
    const response = await client.messages.create({
      model: 'claude-haiku-4-5',
      max_tokens: 2048,
      messages: [{ role: 'user', content: prompt }],
    });

    const text = response.content.find((b) => b.type === 'text')?.text || '{}';

    // Extract JSON from response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error('No JSON found in response');
    const result = JSON.parse(jsonMatch[0]);

    // Append to log
    appendToIntelligenceLog({
      type: 'analysis',
      campaignStats,
      result,
    });

    return result;
  } catch (err) {
    console.error(`[intelligence] analyzeAndAdapt error: ${err.message}`);
    return {
      insights: [],
      bestSubjectPatterns: [],
      worstPerformers: [],
      rewrittenTemplates: [],
    };
  }
}

// ─── scoreLead ────────────────────────────────────────────────────────────────

/**
 * Scores a lead 1-10 for likelihood to purchase.
 *
 * @param {object} lead - { name, trade, city, website, rating, reviewCount, isHiring, facebookFound, decisionMakerFound, websiteLive }
 * @returns {Promise<{ score: number, reason: string, priority: 'high'|'medium'|'low' }>}
 */
export async function scoreLead(lead) {
  const prompt = `Score this business lead 1-10 for likelihood to purchase a $9.99 digital form template. Consider: Google rating (higher = established business = more likely to invest in tools), review count (more reviews = bigger operation), whether they're hiring (growth signal), whether we found the decision maker directly, website quality.

Lead:
${JSON.stringify(lead, null, 2)}

Return JSON: { score: number, reason: string, priority: 'high'|'medium'|'low' }`;

  try {
    const response = await client.messages.create({
      model: 'claude-haiku-4-5',
      max_tokens: 512,
      messages: [{ role: 'user', content: prompt }],
    });

    const text = response.content.find((b) => b.type === 'text')?.text || '{}';
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error('No JSON found in response');
    const result = JSON.parse(jsonMatch[0]);

    // Normalize score to number
    result.score = Number(result.score) || 5;
    result.score = Math.min(10, Math.max(1, result.score));

    // Normalize priority
    if (!['high', 'medium', 'low'].includes(result.priority)) {
      result.priority = result.score >= 7 ? 'high' : result.score >= 4 ? 'medium' : 'low';
    }

    return result;
  } catch (err) {
    console.error(`[intelligence] scoreLead error for ${lead.name}: ${err.message}`);
    return { score: 5, reason: 'Unable to score — default applied', priority: 'medium' };
  }
}

// ─── generatePersonalizedEmail ────────────────────────────────────────────────

/**
 * Generates a hyper-personalized email using lead data and campaign insights.
 *
 * @param {object} lead    - enriched lead with decision maker, hiring status, etc.
 * @param {object} insights - result from analyzeAndAdapt (can be null/empty)
 * @returns {Promise<{ subject: string, body: string, previewText: string }>}
 */
export async function generatePersonalizedEmail(lead, insights) {
  const insightSummary = insights && insights.bestSubjectPatterns && insights.bestSubjectPatterns.length
    ? `\nHigh-performing subject patterns from past campaigns: ${insights.bestSubjectPatterns.slice(0, 3).join('; ')}`
    : '';

  const decisionMakerLine = lead.decisionMaker?.name
    ? `Address them by first name: ${lead.decisionMaker.name.split(' ')[0]}.`
    : 'No specific decision maker found — use a generic opener.';

  const hiringLine = lead.isHiring
    ? `They are hiring${lead.jobTitle ? ` for ${lead.jobTitle}` : ''} — mention "saw you're growing the team".`
    : '';

  const ratingLine = lead.rating && lead.rating >= 4.5
    ? `Their Google rating is ${lead.rating} stars — you can mention it ("your ${lead.rating} stars on Google says it all").`
    : '';

  const prompt = `You are a B2B sales copywriter for TradeOpsVault, a company selling $9.99 digital job forms to trade contractors (HVAC, plumbing, electrical, etc.).

Write a cold outreach email for this lead. It must feel like a real person wrote it — no corporate fluff. Max 180 words for the body.

Lead details:
- Business: ${lead.name}
- Trade: ${lead.trade}
- City: ${lead.city}
- Google Rating: ${lead.rating || 'unknown'} (${lead.reviewCount || 0} reviews)
- Website: ${lead.website || 'unknown'}

Personalization rules:
- ${decisionMakerLine}
${hiringLine ? `- ${hiringLine}` : ''}
${ratingLine ? `- ${ratingLine}` : ''}
${insightSummary}

Return JSON only: { "subject": "...", "body": "...", "previewText": "..." }
The previewText should be 50-90 chars shown in email clients before opening.`;

  try {
    const response = await client.messages.create({
      model: 'claude-haiku-4-5',
      max_tokens: 1024,
      messages: [{ role: 'user', content: prompt }],
    });

    const text = response.content.find((b) => b.type === 'text')?.text || '{}';
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error('No JSON found in response');
    const result = JSON.parse(jsonMatch[0]);

    if (!result.subject || !result.body) {
      throw new Error('Missing subject or body in response');
    }

    return result;
  } catch (err) {
    console.error(`[intelligence] generatePersonalizedEmail error for ${lead.name}: ${err.message}`);
    // Fallback to basic email
    const firstName = lead.decisionMaker?.name?.split(' ')[0] || 'there';
    return {
      subject: `Quick question about ${lead.name}'s paperwork`,
      body: `Hi ${firstName},\n\nI came across ${lead.name} while researching top-rated ${lead.trade} contractors in ${lead.city}.\n\nWe make digital job forms for trade contractors — estimates, invoices, inspection checklists — for $9.99 each. One-time purchase, yours to use forever.\n\nWould it be worth a quick look?\n\nBest,\nTradeOpsVault`,
      previewText: `Saw your ${lead.trade} business in ${lead.city} — quick question`,
    };
  }
}

// ─── getLatestInsights ────────────────────────────────────────────────────────

/**
 * Returns the most recent intelligence analysis from the log.
 * @returns {object|null}
 */
export function getLatestInsights() {
  const log = readJsonFile(INTELLIGENCE_LOG, []);
  const analyses = log.filter((e) => e.type === 'analysis');
  if (!analyses.length) return null;
  return analyses[analyses.length - 1];
}
