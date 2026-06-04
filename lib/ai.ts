export const CAREGIVER_CONTEXT = `You are a compassionate, knowledgeable caregiver support assistant for CarePing, a voice-first safety, connection, and reminder companion for elderly adults and their family caregivers. You specialize in medication questions, symptom guidance, elder care resources, caregiver burnout, family communication, medical appointments, daily care, and emotional support. Always be warm, empathetic, practical. Always recommend consulting healthcare providers for medical decisions.`;

export type Message = { role: 'user' | 'assistant'; content: string };

function activeProvider(): 'gemini' | 'anthropic' | null {
  if (process.env.GEMINI_API_KEY) return 'gemini';
  if (process.env.ANTHROPIC_API_KEY) return 'anthropic';
  return null;
}
export function getProviderName(): string {
  const p = activeProvider();
  if (p === 'gemini') return 'Google Gemini';
  if (p === 'anthropic') return 'Anthropic Claude';
  return 'none';
}
async function geminiChat(messages: Message[], system: string): Promise<string> {
  const key = process.env.GEMINI_API_KEY!;
  const contents = [
    { role: 'user', parts: [{ text: system }] },
    { role: 'model', parts: [{ text: 'Understood. Ready to help.' }] },
    ...messages.map(m => ({ role: m.role === 'assistant' ? 'model' : 'user', parts: [{ text: m.content }] })),
  ];
  const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${key}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ contents }) });
  if (!res.ok) throw new Error(`Gemini error ${res.status}`);
  const data = await res.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text ?? '';
}
async function anthropicChat(messages: Message[], system: string): Promise<string> {
  const Anthropic = (await import('@anthropic-ai/sdk')).default;
  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  const response = await client.messages.create({ model: 'claude-sonnet-4-6', max_tokens: 1200, system, messages });
  return response.content[0]?.type === 'text' ? response.content[0].text : '';
}
export async function chat(messages: Message[], systemOverride?: string): Promise<string> {
  const system = systemOverride ?? CAREGIVER_CONTEXT;
  const provider = activeProvider();
  if (provider === 'gemini') return geminiChat(messages, system);
  if (provider === 'anthropic') return anthropicChat(messages, system);
  return 'AI assistant not configured. Add ANTHROPIC_API_KEY or GEMINI_API_KEY to .env.local';
}
export async function ask(prompt: string, systemOverride?: string): Promise<string> { return chat([{ role: 'user', content: prompt }], systemOverride); }
