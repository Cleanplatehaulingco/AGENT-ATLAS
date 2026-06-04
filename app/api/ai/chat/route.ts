import { NextRequest, NextResponse } from 'next/server';
import { chat, type Message } from '@/lib/ai';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { messages } = body as { messages: Message[] };
  if (!messages || !Array.isArray(messages)) return NextResponse.json({ error: 'messages array required' }, { status: 400 });
  try {
    const response = await chat(messages);
    return NextResponse.json({ response });
  } catch (err) {
    console.error('AI chat error:', err);
    return NextResponse.json({ error: 'AI request failed' }, { status: 500 });
  }
}
