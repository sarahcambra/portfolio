import { useState, useRef, useEffect, useCallback } from 'react';
import { PaperPlaneTilt } from '@phosphor-icons/react';
import Button from './Button';

const SYSTEM_INSTRUCTION = `
You are Sarah Cambra. You are speaking directly to a visitor on your portfolio. Use "I", "me", and "my".

MY BACKGROUND:
- I am 45 years old, based in Karlskrona, Sweden.
- I started my career in 2008 at Thomson Reuters as a Solutions Analyst.
- I have 15+ years of experience bridging technical compliance and design.

MY KEY PROJECTS:
- Axesslab: I built a WCAG 2.2 compliant design system.
- Arcanimal: I co-founded this platform using AI-augmented workflows.
- Mentatt: I led the research that forced a strategic pivot to save the product.
- Thomson Reuters: I managed digital migrations for 20+ enterprise clients.

RULES:
- Always answer as "I". 
- If asked about my age, say "I am 45 years old."
- Keep responses to 2-3 sentences.
`;

const WELCOME_TEXT = "Hej! I'm Sarah. Ask me anything about my work in design systems, accessibility, or my journey since 2008.";

/** Stable Flash model for generateContent (1.5 Flash was retired from the API). Override: VITE_GEMINI_MODEL */
const GEMINI_MODEL = import.meta.env.VITE_GEMINI_MODEL ?? 'gemini-2.5-flash';
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`;

function bubbleClasses(role) {
  if (role === 'user') {
    return 'ml-8 rounded-2xl rounded-br-md bg-zinc-700/90 px-3 py-2 text-sm text-zinc-50';
  }
  return 'mr-8 rounded-2xl rounded-bl-md bg-zinc-800 px-3 py-2 text-sm text-zinc-100 ring-1 ring-zinc-700/80';
}

export default function ChatView() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const logRef = useRef(null);

  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  useEffect(() => {
    const el = logRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, loading]);

  const sendToGemini = useCallback(async (historyForApi) => {
    const res = await fetch(GEMINI_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        systemInstruction: {
          parts: [{ text: SYSTEM_INSTRUCTION }],
        },
        contents: historyForApi,
      }),
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      const msg =
        data?.error?.message ||
        `Request failed (${res.status}). Check your API key and quota.`;
      throw new Error(msg);
    }

    const text =
      data?.candidates?.[0]?.content?.parts?.find((p) => p.text)?.text ??
      data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
      const block = data?.promptFeedback?.blockReason;
      throw new Error(block ? `Response blocked: ${block}` : 'Empty response from model.');
    }

    return text.trim();
  }, []);

  const onSend = useCallback(
    async (e) => {
      e.preventDefault();
      const raw = inputValue.trim();
      if (!raw || loading) return;

      if (!apiKey) {
        setError('Missing VITE_GEMINI_API_KEY. Add it to your .env file.');
        return;
      }

      const userMessage = { role: 'user', parts: [{ text: raw }] };
      const nextHistory = [...messages, userMessage];

      setMessages(nextHistory);
      setInputValue('');
      setError(null);
      setLoading(true);

      try {
        const replyText = await sendToGemini(nextHistory);
        setMessages((prev) => [
          ...prev,
          { role: 'model', parts: [{ text: replyText }] },
        ]);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Something went wrong.');
        setMessages((prev) => prev.slice(0, -1));
        setInputValue(raw);
      } finally {
        setLoading(false);
      }
    },
    [inputValue, loading, messages, apiKey, sendToGemini]
  );

  return (
    <div className="flex h-full min-h-0 flex-col bg-zinc-900">
      <div className="flex-shrink-0 border-b border-zinc-800 px-1 pb-2">
        <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Chat</p>
        <p className="text-sm font-medium text-zinc-100">Sarah&apos;s assistant</p>
      </div>

      {!apiKey && (
        <p className="flex-shrink-0 rounded-lg bg-amber-950/50 px-2 py-1.5 text-xs text-amber-200 ring-1 ring-amber-800/60">
          Set <code className="rounded bg-zinc-800 px-1">VITE_GEMINI_API_KEY</code> in{' '}
          <code className="rounded bg-zinc-800 px-1">.env</code> and restart the dev server.
        </p>
      )}

      {error && (
        <p className="flex-shrink-0 rounded-lg bg-red-950/40 px-2 py-1.5 text-xs text-red-200 ring-1 ring-red-900/60">
          {error}
        </p>
      )}

      <div
        ref={logRef}
        className="min-h-0 flex-1 space-y-2 overflow-y-auto py-2 pr-1"
        role="log"
        aria-live="polite"
        aria-relevant="additions"
      >
        <div className={bubbleClasses('model')}>{WELCOME_TEXT}</div>

        {messages.map((m, i) => {
          const text = m.parts?.map((p) => p.text).join('') ?? '';
          return (
            <div key={i} className={bubbleClasses(m.role)}>
              {text}
            </div>
          );
        })}

        {loading && (
          <div className={bubbleClasses('model')}>
            <span className="inline-flex gap-1">
              <span className="inline-block h-1.5 w-1.5 animate-bounce rounded-full bg-zinc-400 [animation-delay:-0.3s]" />
              <span className="inline-block h-1.5 w-1.5 animate-bounce rounded-full bg-zinc-400 [animation-delay:-0.15s]" />
              <span className="inline-block h-1.5 w-1.5 animate-bounce rounded-full bg-zinc-400" />
            </span>
          </div>
        )}
      </div>

      <form
        className="flex flex-shrink-0 gap-2 border-t border-zinc-800 bg-zinc-900 pt-2"
        onSubmit={onSend}
        aria-label="Send a message to Sarah's assistant"
      >
        <label htmlFor="chat-input" className="sr-only">
          Message Sarah&apos;s assistant
        </label>
        <input
          id="chat-input"
          className="min-w-0 flex-1 rounded-xl border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-500 focus:border-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-600/50"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Ask about Sarah's work…"
          autoComplete="off"
          disabled={loading}
        />
        <Button
          type="submit"
          variant="primary"
          surface="inverse"
          disabled={!inputValue.trim() || loading || !apiKey}
          className="flex-shrink-0 px-3"
        >
          <PaperPlaneTilt size={20} weight="bold" aria-hidden="true" />
          <span className="sr-only">Send</span>
        </Button>
      </form>
    </div>
  );
}
