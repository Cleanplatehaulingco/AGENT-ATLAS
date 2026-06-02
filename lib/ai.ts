/**
 * Multi-provider AI client for Raven's Business Hub.
 *
 * Provider priority (first available key wins):
 *   1. Google Gemini  — free tier, no credit card needed (GEMINI_API_KEY)
 *   2. Anthropic      — pay-as-you-go fallback        (ANTHROPIC_API_KEY)
 *
 * To get a free Gemini key: https://aistudio.google.com/app/apikey
 */

export const BUSINESS_CONTEXT = `You are a helpful business assistant for Raven's Baubles & Gifts (ravensbaublesngifts), a handmade jewelry and gifts shop. The owner sells at:
- Etsy (online storefront)
- South Lyon Saturday Farmers Market (weekly booth)
- Facebook Marketplace
- Other local venues

The shop specializes in handmade jewelry, gifts, and baubles. The owner makes items by hand and needs help with:
- Pricing strategy (considering materials cost, time, Etsy fees ~6.5% transaction + 3% + $0.25 payment processing + $0.20 listing fee)
- Product descriptions for Etsy
- Holiday campaign planning
- Business strategy and growth
- Booth setup, display, and supplies
- Packaging (box sizes, shipping materials)
- Profit margin calculations
- Market trends for handmade jewelry/gifts

Always be encouraging, practical, and specific to a small handmade craft business context.`;

export type Message = { role: 'user' | 'assistant'; content: string };

function activeProvider(): 'gemini' | 'anthropic' | null {
  if (process.env.GEMINI_API_KEY) return 'gemini';
  if (process.env.ANTHROPIC_API_KEY) return 'anthropic';
  return null;
}

export function getProviderName(): string {
  const p = activeProvider();
  if (p === 'gemini') return 'Google Gemini (free)';
  if (p === 'anthropic') return 'Anthropic Claude';
  return 'none';
}

// ── Gemini ────────────────────────────────────────────────────────────────────

async function geminiChat(messages: Message[], system: string): Promise<string> {
  const key = process.env.GEMINI_API_KEY!;
  const model = 'gemini-1.5-flash'; // free tier model

  // Gemini uses a `contents` array; prepend the system prompt as a user turn
  const contents = [
    { role: 'user', parts: [{ text: system }] },
    { role: 'model', parts: [{ text: 'Understood. I will act as described.' }] },
    ...messages.map((m) => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }],
    })),
  ];

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${key}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents }),
    }
  );

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Gemini error ${res.status}: ${err}`);
  }

  const data = await res.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text ?? '';
}

// ── Anthropic ─────────────────────────────────────────────────────────────────

async function anthropicChat(messages: Message[], system: string): Promise<string> {
  const Anthropic = (await import('@anthropic-ai/sdk')).default;
  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

  const response = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 1200,
    system,
    messages,
  });

  return response.content[0]?.type === 'text' ? response.content[0].text : '';
}

// ── Public API ─────────────────────────────────────────────────────────────────

export async function chat(messages: Message[], systemOverride?: string): Promise<string> {
  const system = systemOverride ?? BUSINESS_CONTEXT;
  const provider = activeProvider();

  if (provider === 'gemini') return geminiChat(messages, system);
  if (provider === 'anthropic') return anthropicChat(messages, system);

  // No key configured — return a helpful fallback so the app still works
  return `AI assistant is not configured yet. To enable it for free, add your Google Gemini API key to .env.local:\n\nGEMINI_API_KEY=your_key_here\n\nGet a free key at: https://aistudio.google.com/app/apikey`;
}

export async function ask(prompt: string, systemOverride?: string): Promise<string> {
  return chat([{ role: 'user', content: prompt }], systemOverride);
}
