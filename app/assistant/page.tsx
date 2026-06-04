'use client';

import { useEffect, useState, useRef } from 'react';
import { Send, Loader2, Sparkles, RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const QUICK_PROMPTS = [
  { label: "Box finder", prompt: "Help me find a good shipping box size for a piece of jewelry that is 4 inches wide and 2 inches tall. What box dimensions work best?" },
  { label: "Price an item", prompt: "What should I charge for a handmade wire-wrapped crystal pendant? It took me 45 minutes to make and materials cost about $4." },
  { label: "Etsy description", prompt: "Write a compelling Etsy product description for a handmade rose quartz and seed bead bracelet. Include keywords buyers would search for." },
  { label: "Holiday campaign", prompt: "Help me plan a holiday campaign for Mother's Day. What products should I feature, when should I start promoting, and what messaging works best?" },
  { label: "Craft fair supplies", prompt: "What supplies do I need for a professional-looking craft fair booth? I sell handmade jewelry at the South Lyon Farmers Market." },
  { label: "Profit margin", prompt: "How do I calculate my profit margin for handmade jewelry? Walk me through the formula and what costs to include." },
  { label: "Trending products", prompt: "What handmade jewelry and gift items are trending right now for Etsy sellers? What should I be making more of?" },
  { label: "Pricing for Etsy", prompt: "Explain how Etsy fees work and how to factor them into my pricing so I still make a profit." },
  { label: "Customer thank you", prompt: "Write a short, warm thank-you note I can include with every order from Raven's Baubles & Gifts." },
  { label: "Instagram captions", prompt: "Write 3 Instagram caption ideas for showing off handmade beaded jewelry. Include relevant hashtags." },
  { label: "Wholesale pricing", prompt: "How should I price my jewelry for wholesale buyers vs retail? What's a fair discount structure?" },
  { label: "Busy market tips", prompt: "Give me 5 tips for maximizing sales at a Saturday farmers market booth for handmade jewelry." },
];

export default function AssistantPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hi! I'm your dedicated business assistant for Raven's Baubles & Gifts. I know your shop inside and out — you sell handmade jewelry and gifts on Etsy, at the South Lyon Saturday Farmers Market, and on Facebook Marketplace.\n\nI can help you with pricing, product descriptions, holiday campaigns, booth tips, profit margins, shipping, and anything else you need. What's on your mind today?",
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  async function sendMessage(text: string) {
    if (!text.trim() || loading) return;
    const userMsg: Message = { role: 'user', content: text.trim() };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput('');
    if (textareaRef.current) textareaRef.current.style.height = 'auto';
    setLoading(true);

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      });
      const data = await res.json();
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: data.response || data.error || 'Sorry, something went wrong.',
      }]);
    } catch {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Connection error. Please check your ANTHROPIC_API_KEY is set.',
      }]);
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  }

  function resetChat() {
    setMessages([{
      role: 'assistant',
      content: "Chat cleared! What can I help you with?",
    }]);
  }

  return (
    <div className="flex flex-col h-[calc(100vh-10rem)] max-h-[800px]">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 flex-shrink-0">
        <div>
          <h1 className="page-title flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-brand-500" />
            AI Business Assistant
          </h1>
          <p className="text-warm-500 text-sm mt-1">Powered by Claude · Knows your shop inside and out</p>
        </div>
        <button onClick={resetChat} className="btn-secondary">
          <RotateCcw className="w-4 h-4" />
          Clear Chat
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-4 flex-1 min-h-0">
        {/* Quick prompts sidebar */}
        <div className="lg:w-56 flex-shrink-0 order-2 lg:order-1">
          <div className="card p-3 h-full">
            <p className="text-xs font-semibold text-warm-500 uppercase tracking-wide mb-3">Quick Prompts</p>
            <div className="flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0">
              {QUICK_PROMPTS.map(qp => (
                <button
                  key={qp.label}
                  onClick={() => sendMessage(qp.prompt)}
                  disabled={loading}
                  className="text-left text-xs bg-warm-50 dark:bg-warm-900/20 hover:bg-brand-50 dark:hover:bg-brand-900/20 text-warm-700 dark:text-warm-300 hover:text-brand-700 dark:hover:text-brand-300 border border-warm-100 dark:border-warm-900/30 hover:border-brand-200 dark:hover:border-brand-800 px-3 py-2 rounded-lg transition-all whitespace-nowrap lg:whitespace-normal flex-shrink-0 lg:flex-shrink"
                >
                  {qp.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Chat area */}
        <div className="flex-1 flex flex-col min-h-0 order-1 lg:order-2">
          {/* Messages */}
          <div className="card flex-1 overflow-y-auto p-4 space-y-4 mb-4">
            {messages.map((msg, i) => (
              <div key={i} className={cn('chat-message flex', msg.role === 'user' ? 'justify-end' : 'justify-start')}>
                {msg.role === 'assistant' && (
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center flex-shrink-0 mr-2 mt-0.5">
                    <Sparkles className="w-3.5 h-3.5 text-white" />
                  </div>
                )}
                <div
                  className={cn(
                    'max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed',
                    msg.role === 'user'
                      ? 'bg-brand-600 text-white rounded-br-sm'
                      : 'bg-warm-50 dark:bg-warm-900/30 text-warm-800 dark:text-warm-200 rounded-bl-sm'
                  )}
                >
                  <div className="whitespace-pre-wrap">{msg.content}</div>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex items-start gap-2">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-3.5 h-3.5 text-white" />
                </div>
                <div className="bg-warm-50 dark:bg-warm-900/30 rounded-2xl rounded-bl-sm px-4 py-3 flex gap-1.5 items-center">
                  <span className="loading-dot w-2 h-2 bg-brand-400 rounded-full" />
                  <span className="loading-dot w-2 h-2 bg-brand-400 rounded-full" />
                  <span className="loading-dot w-2 h-2 bg-brand-400 rounded-full" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="card p-3 flex-shrink-0">
            <div className="flex gap-3 items-end">
              <textarea
                ref={textareaRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask anything about your business… (Enter to send, Shift+Enter for newline)"
                rows={1}
                className="input flex-1 resize-none min-h-[40px] max-h-[160px] py-2.5 text-sm"
                onInput={e => {
                  const el = e.currentTarget;
                  el.style.height = 'auto';
                  el.style.height = Math.min(el.scrollHeight, 160) + 'px';
                }}
              />
              <button
                onClick={() => sendMessage(input)}
                disabled={!input.trim() || loading}
                className="btn-primary px-4 py-2.5 flex-shrink-0"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
