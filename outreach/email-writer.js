/**
 * email-writer.js
 * Claude AI email personalizer for TradeOpsVault cold outreach.
 * Uses claude-haiku-4-5 to write short, human-sounding B2B emails.
 *
 * Sample tone we're going for (do NOT use this verbatim — it's a reference):
 * ─────────────────────────────────────────────────────────────────────────────
 * Subject: Quick question about your field paperwork, [FirstName]
 *
 * Hey [FirstName],
 *
 * Ran across [CompanyName] while looking at top HVAC contractors in Austin —
 * impressive reviews.
 *
 * Quick question: are your techs still filling out paper work orders in the
 * field? Most shops we talk to lose 2-3 hours a week just chasing down
 * signatures and manually re-entering invoice totals.
 *
 * We built TradeOpsVault to fix that — AI-powered digital forms that
 * auto-calculate invoices and export directly to your CRM. Takes about 15
 * minutes to set up, free trial, no credit card needed.
 *
 * If it sounds useful, check it out at tradeopsvault.com/business or just
 * reply here and I'll walk you through it.
 *
 * — [SenderName]
 *
 * P.S. A 4.8-star rating with 200+ reviews is seriously impressive. Your
 * customers clearly love the work.
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * Tone notes for Claude prompt:
 *  • Sound like a real person, not a marketing copywriter
 *  • No exclamation marks, no ALL CAPS subject lines
 *  • Reference the specific trade and city — don't be generic
 *  • Keep it under 150 words in the body
 *  • The CTA should feel natural, not pushy
 */

import Anthropic from '@anthropic-ai/sdk';

const MODEL = 'claude-haiku-4-5';

/**
 * Builds the prompt for Claude.
 * @param {object} lead
 * @param {string} senderName
 * @returns {string}
 */
function buildPrompt(lead, senderName) {
  const { name, trade, city, firstName, website, rating, reviewCount } = lead;

  const ratingLine =
    rating && rating >= 4.5 && reviewCount
      ? `Their Google rating is ${rating} stars with ${reviewCount} reviews.`
      : '';

  return `You are ${senderName}, a sales rep at TradeOpsVault, reaching out to a small trade contractor.

Write a short cold B2B email to ${firstName || 'the owner'} at ${name}, a ${trade} contractor in ${city}.

LEAD DETAILS:
- Company: ${name}
- Trade: ${trade}
- City: ${city}
- First name: ${firstName || '(unknown — use a friendly greeting)'}
- Website: ${website || '(no website found)'}
- Google rating: ${rating ? `${rating} stars (${reviewCount} reviews)` : '(not available)'}

PRODUCT TO PITCH:
TradeOpsVault — AI-powered digital forms for field technicians.
- Replaces paper work orders
- Auto-calculates invoices
- Exports directly to CRM
- Free trial, no credit card required
- Sign up at tradeopsvault.com/business

EMAIL RULES:
1. Subject line: no ALL CAPS, no exclamation marks, keep it natural and specific
2. Body: maximum 150 words — be concise, sound like a real person not a marketer
3. Mention their specific trade (${trade}) and city (${city}) to show this is not a mass blast
4. Pain point: "your techs filling paper forms in the field"
5. CTA: visit tradeopsvault.com/business OR reply to this email
6. If the rating is >= 4.5 stars: include a brief PS line that compliments their Google rating
7. Plain text only — no HTML, no markdown, no bullet points in the email body
8. Sign off with just: — ${senderName}
${ratingLine}

Respond ONLY with a JSON object in this exact shape (no other text before or after):
{
  "subject": "the subject line",
  "body": "the full email body including greeting, paragraphs, sign-off, and optional PS",
  "previewText": "a 1-sentence preview snippet (40-90 chars) that entices opens"
}`;
}

/**
 * Writes a personalized cold B2B email for a trade contractor lead.
 *
 * @param {object} lead
 * @param {string} lead.name          Company name
 * @param {string} lead.trade         e.g. "HVAC", "plumbing"
 * @param {string} lead.city          e.g. "Austin"
 * @param {string} [lead.firstName]   Contact first name (may be null)
 * @param {string} [lead.website]     Company website URL
 * @param {number} [lead.rating]      Google rating (e.g. 4.8)
 * @param {number} [lead.reviewCount] Number of Google reviews
 * @param {string} senderName         e.g. "Jordan Smith"
 * @returns {Promise<{ subject: string, body: string, previewText: string }>}
 */
export async function writeEmail(lead, senderName) {
  const anthropicApiKey = process.env.ANTHROPIC_API_KEY;
  if (!anthropicApiKey) {
    throw new Error('ANTHROPIC_API_KEY environment variable is not set');
  }

  const client = new Anthropic({ apiKey: anthropicApiKey });

  const prompt = buildPrompt(lead, senderName);

  let response;
  try {
    response = await client.messages.create({
      model: MODEL,
      max_tokens: 1024,
      messages: [{ role: 'user', content: prompt }],
    });
  } catch (err) {
    console.error(`[email-writer] Claude API error for lead "${lead.name}": ${err.message}`);
    throw err;
  }

  // Extract the text block
  const textBlock = response.content.find((b) => b.type === 'text');
  if (!textBlock) {
    throw new Error('[email-writer] Claude returned no text block in the response');
  }

  const rawText = textBlock.text.trim();

  // Claude should return pure JSON but may occasionally wrap it in markdown fences
  const jsonMatch = rawText.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error(`[email-writer] Could not extract JSON from Claude response: ${rawText.slice(0, 200)}`);
  }

  let parsed;
  try {
    parsed = JSON.parse(jsonMatch[0]);
  } catch (err) {
    throw new Error(`[email-writer] Failed to parse Claude JSON: ${err.message}`);
  }

  const { subject, body, previewText } = parsed;

  if (!subject || !body || !previewText) {
    throw new Error('[email-writer] Claude response missing required fields (subject, body, previewText)');
  }

  return { subject, body, previewText };
}
