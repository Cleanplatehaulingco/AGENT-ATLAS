import { NextRequest, NextResponse } from 'next/server';
import { anthropic, BUSINESS_CONTEXT } from '@/lib/anthropic';

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();
    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: 'messages array required' }, { status: 400 });
    }

    const filtered = messages.filter((m: { role: string; content: string }) => m.role === 'user' || m.role === 'assistant');

    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 1024,
      system: BUSINESS_CONTEXT,
      messages: filtered,
    });

    const text = response.content[0]?.type === 'text' ? response.content[0].text : '';
    return NextResponse.json({ response: text });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : String(e);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
