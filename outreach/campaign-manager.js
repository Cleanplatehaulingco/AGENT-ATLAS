/**
 * campaign-manager.js
 * Main orchestrator for TradeOpsVault B2B email outreach campaigns.
 * Manages lead finding, email enrichment, writing, sending, and logging.
 *
 * All state is stored in flat JSON files (no database required):
 *   ./campaign-log.json   — append-only log of every send attempt
 *   ./suppressions.json   — email addresses that have unsubscribed or bounced
 */

import fs from 'fs';
import path from 'path';
import { findLeads } from './lead-finder.js';
import { enrichLead as emailEnrichLead } from './email-enricher.js';
import { writeEmail } from './email-writer.js';
import { sendEmail, getDailyLimit } from './sender.js';
import { logOutreach, verifyBusinessLive, searchFacebookPage } from './tracker.js';
import { scoreLead, generatePersonalizedEmail, analyzeAndAdapt, getLatestInsights } from './intelligence.js';
import { enrichLead as socialEnrichLead } from './social-searcher.js';

const LOG_FILE = path.resolve('./campaign-log.json');
const SUPPRESSIONS_FILE = path.resolve('./suppressions.json');
const ADAPTED_TEMPLATES_FILE = path.resolve('./outreach/adapted-templates.json');

// Auto-pause thresholds (CAN-SPAM / deliverability best practices)
const MAX_BOUNCE_RATE = 0.05;   // 5%
const MAX_SPAM_RATE = 0.001;    // 0.1%

// ─── File helpers ────────────────────────────────────────────────────────────

function readJsonFile(filePath, defaultValue) {
  try {
    if (!fs.existsSync(filePath)) return defaultValue;
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch (err) {
    console.error(`[campaign-manager] Failed to read ${filePath}: ${err.message}`);
    return defaultValue;
  }
}

function appendToLog(entry) {
  const log = readJsonFile(LOG_FILE, []);
  log.push(entry);
  fs.writeFileSync(LOG_FILE, JSON.stringify(log, null, 2), 'utf8');
}

function readSuppressions() {
  const data = readJsonFile(SUPPRESSIONS_FILE, { emails: [], domains: [] });
  return {
    emails: new Set((data.emails || []).map((e) => e.toLowerCase())),
    domains: new Set((data.domains || []).map((d) => d.toLowerCase())),
  };
}

function writeSuppressions(suppressions) {
  const data = {
    emails: [...suppressions.emails],
    domains: [...suppressions.domains],
    updatedAt: new Date().toISOString(),
  };
  fs.writeFileSync(SUPPRESSIONS_FILE, JSON.stringify(data, null, 2), 'utf8');
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

/**
 * Calculates number of days since a given start date (1-indexed).
 * @param {string|Date} startDate
 * @returns {number}
 */
function warmupDay(startDate) {
  const start = new Date(startDate);
  const today = new Date();
  const diffMs = today - start;
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  return Math.max(1, diffDays + 1); // day 1 on launch day
}

/**
 * Counts emails sent today from the campaign log.
 * @param {object[]} log
 * @returns {number}
 */
function emailsSentToday(log) {
  const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
  return log.filter((e) => e.sentAt && e.sentAt.startsWith(today) && e.sent).length;
}

/**
 * Computes bounce/spam rates from the log.
 * @param {object[]} log
 * @returns {{ bounceRate: number, spamRate: number }}
 */
function computeRates(log) {
  const sent = log.filter((e) => e.sent).length;
  if (sent === 0) return { bounceRate: 0, spamRate: 0 };
  const bounced = log.filter((e) => e.bounced).length;
  const spam = log.filter((e) => e.spam).length;
  return {
    bounceRate: bounced / sent,
    spamRate: spam / sent,
  };
}

/**
 * Generates a base64-encoded unsubscribe token for an email address.
 * @param {string} email
 * @returns {string}
 */
function emailToToken(email) {
  return Buffer.from(email.toLowerCase()).toString('base64');
}

// ─── CampaignManager ─────────────────────────────────────────────────────────

export class CampaignManager {
  /**
   * @param {object} config
   * @param {string} config.googleApiKey
   * @param {string} config.hunterApiKey
   * @param {string} config.anthropicApiKey      Set on process.env too
   * @param {string} config.sendgridApiKey
   * @param {string} config.fromEmail
   * @param {string} config.fromName
   * @param {string|Date} config.campaignStartDate  ISO date string or Date
   */
  constructor(config) {
    this.config = config;
    // The Anthropic SDK reads ANTHROPIC_API_KEY from the environment
    if (config.anthropicApiKey) {
      process.env.ANTHROPIC_API_KEY = config.anthropicApiKey;
    }
  }

  /**
   * Runs the outreach campaign across all trade+city combos.
   *
   * @param {string[]} trades     e.g. ["HVAC", "plumbing"]
   * @param {string[]} cities     e.g. [{ city: "Austin", state: "TX" }]
   * @param {number}   dailyTarget How many emails to aim for today
   * @returns {Promise<{ sent: number, skipped: number, errors: number }>}
   */
  async runCampaign(trades, cities, dailyTarget) {
    const { googleApiKey, hunterApiKey, sendgridApiKey, fromEmail, fromName, campaignStartDate } = this.config;

    const log = readJsonFile(LOG_FILE, []);
    const suppressions = readSuppressions();

    // Build set of already-contacted domains to prevent duplicates
    const contactedDomains = new Set(
      log.filter((e) => e.domain).map((e) => e.domain.toLowerCase())
    );

    const day = warmupDay(campaignStartDate);
    const warmupLimit = getDailyLimit(day);
    const todayLimit = Math.min(dailyTarget, warmupLimit);
    let todaySent = emailsSentToday(log);

    const stats = { sent: 0, skipped: 0, errors: 0 };

    console.log(`[campaign-manager] Day ${day} warmup — limit: ${warmupLimit}, target: ${todayLimit}, already sent today: ${todaySent}`);

    outer: for (const trade of trades) {
      for (const { city, state } of cities) {
        // Check daily cap before fetching new leads
        if (todaySent >= todayLimit) {
          console.log(`[campaign-manager] Daily limit (${todayLimit}) reached. Stopping.`);
          break outer;
        }

        // Auto-pause check
        const currentLog = readJsonFile(LOG_FILE, []);
        const { bounceRate, spamRate } = computeRates(currentLog);
        if (bounceRate > MAX_BOUNCE_RATE) {
          console.error(`[campaign-manager] AUTO-PAUSE: bounce rate ${(bounceRate * 100).toFixed(1)}% exceeds ${MAX_BOUNCE_RATE * 100}%`);
          break outer;
        }
        if (spamRate > MAX_SPAM_RATE) {
          console.error(`[campaign-manager] AUTO-PAUSE: spam rate ${(spamRate * 100).toFixed(2)}% exceeds ${MAX_SPAM_RATE * 100}%`);
          break outer;
        }

        // 1. Find leads
        let leads = [];
        try {
          console.log(`[campaign-manager] Finding leads: ${trade} in ${city}, ${state}`);
          leads = await findLeads(trade, city, state, googleApiKey);
          console.log(`[campaign-manager] Found ${leads.length} leads`);
        } catch (err) {
          console.error(`[campaign-manager] Lead search failed for ${trade}/${city}: ${err.message}`);
          stats.errors++;
          continue;
        }

        for (const lead of leads) {
          if (todaySent >= todayLimit) {
            console.log(`[campaign-manager] Daily limit reached mid-batch. Stopping.`);
            break outer;
          }

          const domain = lead.domain;

          // Skip if domain already contacted or suppressed
          if (!domain) {
            stats.skipped++;
            continue;
          }
          if (contactedDomains.has(domain.toLowerCase())) {
            stats.skipped++;
            continue;
          }
          if (suppressions.domains.has(domain.toLowerCase())) {
            stats.skipped++;
            continue;
          }

          // 2. Enrich with email via Hunter.io
          let contact = null;
          try {
            contact = await enrichLead(domain, lead.name, hunterApiKey);
          } catch (err) {
            console.error(`[campaign-manager] Enrichment error for ${domain}: ${err.message}`);
          }

          if (!contact || !contact.email) {
            stats.skipped++;
            contactedDomains.add(domain.toLowerCase()); // don't retry this domain
            continue;
          }

          // Skip if email is suppressed
          if (suppressions.emails.has(contact.email.toLowerCase())) {
            stats.skipped++;
            continue;
          }

          // 3a. Verify business website is live — skip if down
          const liveStatus = await verifyBusinessLive(lead.website);
          if (liveStatus === 'down') {
            console.log(`[campaign-manager] Skipping ${lead.name} — website appears down (${lead.website})`);
            stats.skipped++;
            contactedDomains.add(domain.toLowerCase());
            continue;
          }

          // 3b. Search for Facebook page (best-effort)
          const fbResult = await searchFacebookPage(lead.name, city);

          // 3c. Social enrichment — decision maker, hiring status, LinkedIn
          let socialData = {};
          try {
            const basicLead = { ...lead, trade, city };
            socialData = await socialEnrichLead(basicLead);
          } catch (err) {
            console.warn(`[campaign-manager] Social enrichment failed for ${lead.name}: ${err.message}`);
          }

          // 3d. Score the lead — skip if score < 4
          const enrichedLead = {
            ...lead,
            trade,
            city,
            firstName: contact.firstName,
            ...socialData,
            websiteLive: liveStatus === 'live',
            facebookFound: fbResult.found,
          };

          let leadScore = { score: 5, reason: '', priority: 'medium' };
          try {
            leadScore = await scoreLead(enrichedLead);
            console.log(`[campaign-manager] Lead score for ${lead.name}: ${leadScore.score}/10 (${leadScore.priority})`);
          } catch (err) {
            console.warn(`[campaign-manager] Lead scoring failed for ${lead.name}: ${err.message}`);
          }

          if (leadScore.score < 4) {
            console.log(`[campaign-manager] Skipping ${lead.name} — low score (${leadScore.score}/10): ${leadScore.reason}`);
            stats.skipped++;
            contactedDomains.add(domain.toLowerCase());
            continue;
          }

          // 3. Write personalized email via Claude AI (with insights)
          const latestInsights = getLatestInsights()?.result || null;

          let emailContent;
          try {
            emailContent = await generatePersonalizedEmail(enrichedLead, latestInsights);
          } catch (err) {
            console.warn(`[campaign-manager] AI email generation failed for ${lead.name}, falling back: ${err.message}`);
            try {
              emailContent = await writeEmail(enrichedLead, fromName);
            } catch (fallbackErr) {
              console.error(`[campaign-manager] Email writing failed for ${lead.name}: ${fallbackErr.message}`);
              stats.errors++;
              continue;
            }
          }

          // 4. Build unsubscribe URL
          const token = emailToToken(contact.email);
          const unsubscribeUrl = `https://tradeopsvault.com/unsubscribe/${token}`;

          // 5. Send via SendGrid
          let sendResult;
          try {
            sendResult = await sendEmail(
              contact.email,
              emailContent.subject,
              emailContent.body,
              fromEmail,
              fromName,
              unsubscribeUrl,
              sendgridApiKey
            );
          } catch (err) {
            console.error(`[campaign-manager] Send error for ${contact.email}: ${err.message}`);
            stats.errors++;
            continue;
          }

          // 6. Log the result
          const nowIso = new Date().toISOString();
          const logEntry = {
            sentAt: nowIso,
            domain,
            email: contact.email,
            firstName: contact.firstName,
            lastName: contact.lastName,
            company: lead.name,
            trade,
            city,
            state,
            subject: emailContent.subject,
            sent: sendResult.sent,
            messageId: sendResult.messageId || null,
            reason: sendResult.reason || null,
            bounced: false,
            spam: false,
            opened: false,
            replied: false,
            unsubscribed: false,
            warmupDay: day,
            // Intelligence enrichment data
            leadScore: leadScore.score,
            leadPriority: leadScore.priority,
            scoreReason: leadScore.reason,
            decisionMaker: enrichedLead.decisionMaker || null,
            isHiring: enrichedLead.isHiring || false,
            jobTitle: enrichedLead.jobTitle || null,
            linkedIn: enrichedLead.linkedIn || null,
          };

          appendToLog(logEntry);

          // Also log to outreach tracker
          logOutreach({
            businessName:   lead.name,
            trade,
            city,
            state,
            email:          contact.email,
            phone:          lead.phone    || null,
            website:        lead.website  || null,
            googleRating:   lead.rating   ?? null,
            googleReviews:  lead.reviewCount ?? null,
            businessStatus: liveStatus === 'live' ? 'verified_live' : 'unverified',
            facebookPage:   fbResult.url  || null,
            facebookStatus: fbResult.found ? 'found' : 'not_found',
            emailSentAt:    sendResult.sent ? nowIso : null,
            emailSubject:   emailContent.subject,
            emailStatus:    sendResult.sent ? 'sent' : 'queued',
            campaignId:     `campaign_day${day}`,
          });

          contactedDomains.add(domain.toLowerCase());

          if (sendResult.sent) {
            todaySent++;
            stats.sent++;
            console.log(`[campaign-manager] Sent to ${contact.email} (${lead.name})`);
          } else {
            stats.errors++;
            console.error(`[campaign-manager] Failed to send to ${contact.email}: ${sendResult.reason}`);
          }
        }
      }
    }

    console.log(`[campaign-manager] Campaign run complete — sent: ${stats.sent}, skipped: ${stats.skipped}, errors: ${stats.errors}`);
    return stats;
  }

  /**
   * Returns aggregate campaign statistics from the log.
   * @returns {{ sent: number, opened: number, replied: number, bounced: number, unsubscribed: number, conversionRate: number }}
   */
  getCampaignStats() {
    const log = readJsonFile(LOG_FILE, []);
    const sent = log.filter((e) => e.sent).length;
    const opened = log.filter((e) => e.opened).length;
    const replied = log.filter((e) => e.replied).length;
    const bounced = log.filter((e) => e.bounced).length;
    const unsubscribed = log.filter((e) => e.unsubscribed).length;
    const spam = log.filter((e) => e.spam).length;

    const conversionRate = sent > 0 ? (replied / sent) : 0;
    const bounceRate = sent > 0 ? (bounced / sent) : 0;
    const spamRate = sent > 0 ? (spam / sent) : 0;

    return {
      total: log.length,
      sent,
      opened,
      replied,
      bounced,
      unsubscribed,
      spam,
      conversionRate: parseFloat((conversionRate * 100).toFixed(2)),
      bounceRate: parseFloat((bounceRate * 100).toFixed(2)),
      spamRate: parseFloat((spamRate * 100).toFixed(3)),
    };
  }

  /**
   * Marks an email address as unsubscribed, adding it to the suppression list.
   * Also adds the domain to prevent future contacts at the same company.
   *
   * @param {string} email
   */
  markUnsubscribe(email) {
    const normalized = email.toLowerCase().trim();
    const suppressions = readSuppressions();

    suppressions.emails.add(normalized);

    // Also suppress the domain
    const domain = normalized.split('@')[1];
    if (domain) suppressions.domains.add(domain);

    writeSuppressions(suppressions);

    // Update existing log entries for this email
    const log = readJsonFile(LOG_FILE, []);
    let updated = false;
    for (const entry of log) {
      if (entry.email && entry.email.toLowerCase() === normalized) {
        entry.unsubscribed = true;
        updated = true;
      }
    }
    if (updated) {
      fs.writeFileSync(LOG_FILE, JSON.stringify(log, null, 2), 'utf8');
    }

    console.log(`[campaign-manager] Unsubscribed: ${normalized}`);
  }

  /**
   * Runs weekly AI analysis on campaign performance and saves adapted templates.
   * @returns {Promise<object>} intelligence insights
   */
  async runWeeklyAnalysis() {
    const log = readJsonFile(LOG_FILE, []);
    const stats = this.getCampaignStats();

    // Build campaign stats breakdown by trade/city/subject
    const byTrade = {};
    const byCity = {};
    const bySubject = {};
    for (const entry of log.filter((e) => e.sent)) {
      if (entry.trade) {
        if (!byTrade[entry.trade]) byTrade[entry.trade] = { sent: 0, opened: 0, replied: 0 };
        byTrade[entry.trade].sent++;
        if (entry.opened) byTrade[entry.trade].opened++;
        if (entry.replied) byTrade[entry.trade].replied++;
      }
      if (entry.city) {
        if (!byCity[entry.city]) byCity[entry.city] = { sent: 0, opened: 0, replied: 0 };
        byCity[entry.city].sent++;
        if (entry.opened) byCity[entry.city].opened++;
        if (entry.replied) byCity[entry.city].replied++;
      }
      if (entry.subject) {
        const key = entry.subject.slice(0, 60);
        if (!bySubject[key]) bySubject[key] = { sent: 0, opened: 0, replied: 0 };
        bySubject[key].sent++;
        if (entry.opened) bySubject[key].opened++;
        if (entry.replied) bySubject[key].replied++;
      }
    }

    const campaignStats = {
      ...stats,
      byTrade,
      byCity,
      bySubject,
    };

    // Use last 100 emails as sample
    const last100 = log
      .filter((e) => e.sent && e.subject)
      .slice(-100)
      .map((e) => ({
        subject: e.subject,
        trade: e.trade,
        city: e.city,
        opened: e.opened,
        replied: e.replied,
        converted: e.replied,
      }));

    console.log('[campaign-manager] Running weekly AI analysis...');
    const insights = await analyzeAndAdapt(campaignStats, last100);

    // Log insights to console
    if (insights.insights && insights.insights.length) {
      console.log('[campaign-manager] AI Insights:');
      insights.insights.forEach((i) => console.log(`  • ${i}`));
    }
    if (insights.worstPerformers && insights.worstPerformers.length) {
      console.log('[campaign-manager] Worst performers:');
      insights.worstPerformers.forEach((w) => console.log(`  ⚠ ${w.trade}/${w.city}: ${w.reason}`));
    }

    // Save adapted templates
    if (insights.rewrittenTemplates && insights.rewrittenTemplates.length) {
      try {
        const existing = readJsonFile(ADAPTED_TEMPLATES_FILE, []);
        const newEntry = {
          analyzedAt: new Date().toISOString(),
          templates: insights.rewrittenTemplates,
        };
        existing.push(newEntry);
        fs.writeFileSync(ADAPTED_TEMPLATES_FILE, JSON.stringify(existing, null, 2), 'utf8');
        console.log(`[campaign-manager] Saved ${insights.rewrittenTemplates.length} adapted templates to adapted-templates.json`);
      } catch (err) {
        console.error(`[campaign-manager] Failed to save adapted templates: ${err.message}`);
      }
    }

    return insights;
  }

  /**
   * Returns current warmup status.
   * @returns {{ warmupDay: number, dailyLimit: number, emailsSentToday: number }}
   */
  getWarmupStatus() {
    const log = readJsonFile(LOG_FILE, []);
    const day = warmupDay(this.config.campaignStartDate);
    return {
      warmupDay: day,
      dailyLimit: getDailyLimit(day),
      emailsSentToday: emailsSentToday(log),
    };
  }
}
