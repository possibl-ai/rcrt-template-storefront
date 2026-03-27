import { useState, useEffect, useRef } from 'react';
import { Send } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { getClient } from '../lib/api-client';
import { useStore } from '../lib/store';
import { cn } from '../lib/utils';

export default function ChatPage() {
  const { sessionId, setSessionId, messages, addMessage, clearMessages } = useStore();
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sessionId) return;

    const client = getClient();
    const settings = client.getSettings();
    const apiUrl = settings.apiUrl as string;
    const tenantId = settings.tenantId as string;

    const buildEventSource = async () => {
      const adapter = (client as any).adapter;
      const token = await adapter?.getToken?.();
      if (!token) return null;

      const params = new URLSearchParams();
      params.set('token', token);
      if (tenantId) params.set('tenant_id', tenantId);

      const es = new EventSource(`${apiUrl}/v1/events?${params}`);
      es.addEventListener('breadcrumb', (e: MessageEvent) => {
        try {
          const event = JSON.parse(e.data);
          const tags = event.tags || [];
          if (tags.some((t: string) => t === `session:${sessionId}`)) {
            if (tags.includes('llm-section:conversation') && event.created_by?.type !== 'user') {
              addMessage({
                role: 'assistant',
                content: event.content?.content || event.content?.message || event.title || '',
                id: event.breadcrumb_id,
              });
            }
          }
        } catch {}
      });
      return es;
    };

    let es: EventSource | null = null;
    buildEventSource().then((source) => { es = source; });

    return () => { es?.close(); };
  }, [sessionId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const send = async () => {
    const text = input.trim();
    if (!text || sending) return;
    setSending(true);
    setInput('');
    addMessage({ role: 'user', content: text });

    try {
      const client = getClient();
      const result = await client.sendChat(text, sessionId || undefined);
      if (result.session_id && !sessionId) {
        setSessionId(result.session_id);
      }
    } catch (err: any) {
      addMessage({ role: 'system', content: `Error: ${err.message}` });
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto flex flex-col h-[calc(100vh-7.5rem)]">
      <div className="flex-1 overflow-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <p className="text-2xl font-bold text-foreground">What can I help you with?</p>
            <p className="text-sm text-muted-foreground mt-2">Ask me anything.</p>
          </div>
        )}
        {messages.map((msg, i) => (
          <div key={msg.id || i} className={cn('flex', msg.role === 'user' ? 'justify-end' : 'justify-start')}>
            <div
              className={cn(
                'max-w-[85%] rounded-2xl px-4 py-3 text-sm',
                msg.role === 'user'
                  ? 'bg-primary text-primary-foreground'
                  : msg.role === 'system'
                  ? 'bg-destructive/10 text-destructive'
                  : 'bg-muted text-foreground'
              )}
            >
              {msg.role === 'user' ? (
                <p>{msg.content}</p>
              ) : (
                <ReactMarkdown remarkPlugins={[remarkGfm]} className="prose prose-sm dark:prose-invert max-w-none">
                  {msg.content}
                </ReactMarkdown>
              )}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <div className="border-t border-border p-4 bg-background">
        <div className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && send()}
            placeholder="Type a message..."
            disabled={sending}
            className="flex-1 rounded-xl border border-border bg-surface px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:opacity-50"
          />
          <button
            onClick={send}
            disabled={sending || !input.trim()}
            className="bg-primary text-primary-foreground rounded-xl px-4 py-3 hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
