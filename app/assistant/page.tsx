'use client';

import { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, Bot, User, Loader2, Lightbulb } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Message { role: 'user' | 'assistant'; content: string; }

const SUGGESTED_PROMPTS = [
  "What questions should I ask at the next doctor's appointment?",
  "How do I recognize and manage caregiver burnout?",
  "What are warning signs I should call 911 vs. urgent care?",
  "How do I talk to siblings about sharing care responsibilities?",
  "What are good activities to keep an elderly person mentally engaged?",
  "How do I manage medications when my loved one resists taking them?",
];

function MessageBubble({ message }: { message: Message }) {
  const isUser = message.role === 'user';
  return (
    <div className={cn('flex gap-3 items-start', isUser && 'flex-row-reverse')}>
      <div className={cn('w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0', isUser ? 'bg-care-600 text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300')}>
        {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
      </div>
      <div className={cn('max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed', isUser ? 'bg-care-600 text-white rounded-tr-sm' : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-100 dark:border-slate-700 rounded-tl-sm shadow-sm')}>
        {message.content.split('\n').map((line, i, arr) => <span key={i}>{line}{i < arr.length - 1 ? <br /> : null}</span>)}
      </div>
    </div>
  );
}

export default function AssistantPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages, loading]);

  async function sendMessage(text?: string) {
    const content = (text ?? input).trim();
    if (!content || loading) return;
    const userMsg: Message = { role: 'user', content };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages); setInput(''); setLoading(true);
    try {
      const res = await fetch('/api/ai/chat', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ messages: newMessages }) });
      const data = await res.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.response || 'Sorry, I could not generate a response.' }]);
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Something went wrong. Please check your connection.' }]);
    } finally { setLoading(false); inputRef.current?.focus(); }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  }

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] lg:h-[calc(100vh-4rem)] animate-fadeIn">
      <div className="flex items-center gap-3 mb-4 flex-shrink-0">
        <MessageCircle className="w-6 h-6 text-care-600" />
        <div><h1 className="page-title leading-none">AI Assistant</h1><p className="text-sm text-slate-500 mt-0.5">Specialized caregiver support and guidance</p></div>
      </div>
      <div className="flex-1 overflow-y-auto space-y-4 pr-1 pb-4">
        {messages.length === 0 && (
          <div className="space-y-4">
            <div className="card text-center py-8">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-care-400 to-care-600 flex items-center justify-center mx-auto mb-3 shadow-md"><Bot className="w-7 h-7 text-white" /></div>
              <h2 className="font-semibold text-slate-800 dark:text-slate-200 mb-1">Your CarePing Assistant</h2>
              <p className="text-sm text-slate-500 max-w-sm mx-auto">I&apos;m here to help with medication questions, caregiver burnout, family coordination, and more.</p>
            </div>
            <div>
              <p className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3"><Lightbulb className="w-3.5 h-3.5" />Suggested Questions</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {SUGGESTED_PROMPTS.map(prompt => <button key={prompt} onClick={() => sendMessage(prompt)} className="text-left p-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-xl text-sm text-slate-700 dark:text-slate-300 hover:border-care-300 hover:bg-care-50 dark:hover:bg-care-900/20 transition-colors">{prompt}</button>)}
              </div>
            </div>
          </div>
        )}
        {messages.map((msg, i) => <MessageBubble key={i} message={msg} />)}
        {loading && (
          <div className="flex gap-3 items-start">
            <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center flex-shrink-0"><Bot className="w-4 h-4 text-slate-600 dark:text-slate-300" /></div>
            <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm"><Loader2 className="w-4 h-4 text-care-500 animate-spin" /></div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>
      <div className="flex-shrink-0 pt-3 border-t border-slate-100 dark:border-slate-700">
        <div className="flex gap-2 items-end">
          <textarea ref={inputRef} rows={1} className="input flex-1 resize-none" placeholder="Ask a question about caregiving..." value={input} onChange={e => setInput(e.target.value)} onKeyDown={handleKeyDown} style={{ minHeight: '42px', maxHeight: '120px' }} />
          <button onClick={() => sendMessage()} disabled={!input.trim() || loading} className="btn-primary flex-shrink-0 px-3 py-2.5 disabled:opacity-40 disabled:cursor-not-allowed"><Send className="w-4 h-4" /></button>
        </div>
        <p className="text-xs text-slate-400 mt-1.5 text-center">Press Enter to send · Shift+Enter for new line</p>
      </div>
    </div>
  );
}
