'use client';

import { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Loader2, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const QUICK_PROMPTS = [
  "What should I charge for a handmade beaded bracelet?",
  "Write an Etsy product description for a gemstone pendant",
  "Help me plan a holiday campaign for December",
  "What supplies do I need for a craft fair booth?",
  "How do I calculate my profit margin?",
  "What handmade jewelry trends are popular right now?",
];

export default function AIChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([{
        role: 'assistant',
        content: "Hi! I'm your business assistant for Raven's Baubles & Gifts. I can help with pricing, product descriptions, holiday campaigns, booth setup, and more. What can I help you with today?",
      }]);
    }
  }, [open, messages.length]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  async function sendMessage(text: string) {
    if (!text.trim() || loading) return;
    const userMsg: Message = { role: 'user', content: text.trim() };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.response || data.error || 'Sorry, I encountered an error.' }]);
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, I could not connect. Please check your API key.' }]);
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

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen(o => !o)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center hover:scale-105"
        aria-label="Open AI Assistant"
      >
        {open ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
      </button>

      {/* Chat panel */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-96 max-w-[calc(100vw-2rem)] bg-white dark:bg-[#2d1a2d] rounded-2xl shadow-2xl border border-warm-100 dark:border-warm-900/50 flex flex-col" style={{ height: '520px' }}>
          {/* Header */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-warm-100 dark:border-warm-900/50 flex-shrink-0">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-sm font-semibold text-warm-900 dark:text-warm-100">Business Assistant</p>
              <p className="text-xs text-warm-400">Powered by Claude</p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={cn('chat-message flex', msg.role === 'user' ? 'justify-end' : 'justify-start')}
              >
                <div
                  className={cn(
                    'max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-wrap',
                    msg.role === 'user'
                      ? 'bg-brand-600 text-white rounded-br-sm'
                      : 'bg-warm-50 dark:bg-warm-900/30 text-warm-800 dark:text-warm-200 rounded-bl-sm'
                  )}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-warm-50 dark:bg-warm-900/30 rounded-2xl rounded-bl-sm px-4 py-3 flex gap-1">
                  <span className="loading-dot w-2 h-2 bg-brand-400 rounded-full" />
                  <span className="loading-dot w-2 h-2 bg-brand-400 rounded-full" />
                  <span className="loading-dot w-2 h-2 bg-brand-400 rounded-full" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick prompts */}
          {messages.length <= 1 && (
            <div className="px-4 pb-2 flex-shrink-0">
              <p className="text-xs text-warm-400 mb-2">Quick prompts:</p>
              <div className="flex flex-wrap gap-1.5">
                {QUICK_PROMPTS.slice(0, 3).map(p => (
                  <button
                    key={p}
                    onClick={() => sendMessage(p)}
                    className="text-xs bg-brand-50 dark:bg-brand-900/20 text-brand-700 dark:text-brand-300 border border-brand-200 dark:border-brand-800 px-2 py-1 rounded-full hover:bg-brand-100 dark:hover:bg-brand-900/40 transition-colors"
                  >
                    {p.length > 35 ? p.slice(0, 35) + '…' : p}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-3 border-t border-warm-100 dark:border-warm-900/50 flex-shrink-0">
            <div className="flex gap-2 items-end">
              <textarea
                ref={inputRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask anything about your business…"
                rows={1}
                className="input flex-1 resize-none min-h-[36px] max-h-[120px] py-2 text-sm"
                style={{ height: 'auto' }}
                onInput={e => {
                  const el = e.currentTarget;
                  el.style.height = 'auto';
                  el.style.height = Math.min(el.scrollHeight, 120) + 'px';
                }}
              />
              <button
                onClick={() => sendMessage(input)}
                disabled={!input.trim() || loading}
                className="btn-primary p-2 flex-shrink-0"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
