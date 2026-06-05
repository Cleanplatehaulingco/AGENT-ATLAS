/**
 * email-writer.js
 * Human-first cold email engine for TradeOpsVault.
 *
 * Copywriting principles baked into every email:
 *  - Pattern interrupt: first line must stop the scroll, not sound like sales
 *  - One problem, one solution, one ask — never more
 *  - Specificity beats cleverness: "3 hours a week" beats "saves time"
 *  - The PS does the heavy lifting — most people read it first
 *  - No "I hope this email finds you well", no "just reaching out", no "touch base"
 *  - Never say the product name in the subject line
 *  - Sound like a person who has 11 other things to do today
 */

import Anthropic from '@anthropic-ai/sdk';

const MODEL = 'claude-haiku-4-5';

// ── 8 different angle/opener frameworks — rotated so no two campaigns feel identical ──
const EMAIL_ANGLES = [
  {
    angle: 'observation',
    subjectHint: 'A specific observation about their business — not a question, a statement. Like "Your Google reviews are doing the work for you" or "Most [trade] guys in [city] are still on paper"',
    openerHint: 'Start with a specific observation about their situation — not a compliment, an insight. Something that makes them think "how did they know that?"',
  },
  {
    angle: 'problem-first',
    subjectHint: 'Name the exact pain before they do. "The part of [trade] work nobody talks about" or "Invoice math at 7pm after a long day"',
    openerHint: 'Open cold with the most annoying part of their day — not your product. Make them feel seen before you offer anything.',
  },
  {
    angle: 'social-proof',
    subjectHint: 'Reference a result, not a feature. "How a [city] [trade] shop cut paperwork in half" or "What the top-rated [trade] crews have in common"',
    openerHint: 'Lead with what other contractors in their market are doing differently. FOMO that feels like insider information, not marketing.',
  },
  {
    angle: 'direct-question',
    subjectHint: 'One honest question they actually think about. Not "Are you interested in saving time?" — something like "How long does a typical service call take to close out?" or "Do your techs carry paper forms?"',
    openerHint: 'Ask one question that reveals the problem without pitching anything. Make it feel like you genuinely want to know.',
  },
  {
    angle: 'time-cost',
    subjectHint: 'Put a number on the invisible cost. "45 minutes per job in paperwork adds up fast" — be specific to their trade',
    openerHint: 'Lead with a specific time or dollar cost they have never calculated but immediately recognize as true.',
  },
  {
    angle: 'contrarian',
    subjectHint: 'Challenge a common belief in their industry. "Paper forms are not the real problem" or "Why most [trade] software misses the point"',
    openerHint: 'Disagree with something they think is normal. Make them curious about a different way of seeing the problem.',
  },
  {
    angle: 'story',
    subjectHint: 'One-line story hook. "A [city] [trade] guy showed me something last week" — make it feel like a forwarded email',
    openerHint: 'Open with a 1-2 sentence micro-story about a contractor like them. Keep it grounded and specific.',
  },
  {
    angle: 'ultra-short',
    subjectHint: 'Two to four words max. "Paper forms?" or "Quick one" or "[Trade] paperwork"',
    openerHint: 'Entire email under 60 words. One sentence on the problem, one on the solution, one ask. Nothing else.',
  },
];

function pickAngle(lead) {
  // Rotate angle based on lead name hash so same lead always gets same angle
  // but different leads get different angles
  const hash = (lead.name || '').split('').reduce((a, c) => a + c.charCodeAt(0), 0);
  return EMAIL_ANGLES[hash % EMAIL_ANGLES.length];
}

function buildPrompt(lead, senderName) {
  const { name, trade, city, firstName, website, rating, reviewCount, isHiring, jobTitle, decisionMaker } = lead;
  const angle = pickAngle(lead);

  const contextLines = [];
  if (rating >= 4.5 && reviewCount > 20) contextLines.push(`- Strong reputation: ${rating} stars, ${reviewCount} Google reviews — they have earned trust in the market`);
  if (rating < 4.0 && rating > 0) contextLines.push(`- Lower rating (${rating}) — may be struggling with customer experience or overwhelmed operationally`);
  if (isHiring && jobTitle) contextLines.push(`- Currently hiring: "${jobTitle}" — actively growing, has budget, owner is thinking about scaling`);
  if (decisionMaker?.name) contextLines.push(`- Decision maker found: ${decisionMaker.name} (${decisionMaker.title || 'owner'}) — address them directly`);
  if (!website) contextLines.push(`- No website found — may be old-school, running on referrals, less tech-savvy (keep the pitch simple)`);

  const recipientName = decisionMaker?.name?.split(' ')[0] || firstName || null;

  return `You are writing a cold outreach email on behalf of ${senderName} at TradeOpsVault.

TARGET:
- Company: ${name}
- Trade: ${trade} contractor
- City: ${city}
- Recipient first name: ${recipientName || '(unknown — do NOT use "Hi there" or "Hello" — just start with the first sentence)'}
${contextLines.length ? '\nINTEL:\n' + contextLines.join('\n') : ''}

PRODUCT (mention briefly, never oversell):
TradeOpsVault — browser-based digital forms for field techs.
Key facts: auto-calculates invoices, works on any phone, exports to any CRM, free trial at tradeopsvault.com/business.

YOUR WRITING ANGLE TODAY: ${angle.angle.toUpperCase()}

SUBJECT LINE: ${angle.subjectHint}

EMAIL OPENER: ${angle.openerHint}

HARD RULES — breaking any of these means the email fails:
1. Subject line: no exclamation marks, no ALL CAPS, no "TradeOpsVault" in subject, max 8 words
2. Body: 80-130 words MAX. Count them. Cut anything that does not earn its place.
3. Zero corporate phrases: no "I hope this finds you well", no "just reaching out", no "touch base", no "at your earliest convenience", no "I wanted to", no "I came across your company"
4. One ask only — reply OR visit the link. Never both. Never "feel free to".
5. Sign off: use exactly this two-line format:
   — ${senderName}
   TradeOpsVault · tradeopsvault.com
   Nothing else above or below the sign off.
6. PS line (required): one sentence that adds a new piece of value or curiosity — not a repeat of the CTA. If they are hiring, reference growth. If strong reviews, reference that customers already trust them and the tech should match. If unknown, make it a provocative question.
7. Plain text only — no HTML, no bullet points, no markdown in the body.
8. The product name "TradeOpsVault" appears maximum once in the entire email.
9. Never use the word "solution", "streamline", "leverage", "utilize", or "game-changer".
10. If no first name: skip the greeting entirely and open with the first sentence of the email.

Respond ONLY with valid JSON, no text before or after:
{
  "subject": "subject line here",
  "body": "full email body — greeting through PS",
  "previewText": "40-80 char preview text that creates curiosity without giving away the email"
}`;
}

export async function writeEmail(lead, senderName) {
  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

  let response;
  try {
    response = await client.messages.create({
      model: MODEL,
      max_tokens: 1024,
      messages: [{ role: 'user', content: buildPrompt(lead, senderName) }],
    });
  } catch (err) {
    console.error(`[email-writer] Claude API error for "${lead.name}": ${err.message}`);
    throw err;
  }

  const textBlock = response.content.find(b => b.type === 'text');
  if (!textBlock) throw new Error('[email-writer] No text block returned');

  const jsonMatch = textBlock.text.trim().match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error('[email-writer] Could not extract JSON from response');

  const parsed = JSON.parse(jsonMatch[0]);
  const { subject, body, previewText } = parsed;
  if (!subject || !body || !previewText) throw new Error('[email-writer] Missing required fields');

  return { subject, body, previewText };
}
