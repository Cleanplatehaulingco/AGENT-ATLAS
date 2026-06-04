import { NextRequest, NextResponse } from 'next/server';
import { chat, type Message } from '@/lib/ai';

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();
    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: 'messages array required' }, { status: 400 });
    }

    const filtered: Message[] = messages.filter(
      (m: Message) => m.role === 'user' || m.role === 'assistant'
    );

    const response = await chat(filtered);
    return NextResponse.json({ response });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : String(e);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
