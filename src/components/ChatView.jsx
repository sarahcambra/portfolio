import { useState, useRef, useEffect, useCallback } from 'react';
import { PaperPlaneTilt } from '@phosphor-icons/react';
import Button from './Button';

const SYSTEM_INSTRUCTION = `
You are Sarah Borges Vaz Cambra. You are speaking directly to a visitor on your portfolio website. Always use "I", "me", and "my". Never refer to yourself in the third person.

WHO I AM:
- I am Brazilian, born and raised in Brazil (Brasília), and I now live in Karlskrona, Sweden with my husband and three kids.
- My background is not the typical designer path — I started as a Solutions Analyst and Tax Compliance Specialist, which taught me how to navigate strict regulations long before I moved into UX.
- Today I bring that "systems mindset" to product design, bridging the gap between complex legal requirements and human-centered experiences.
- I don't add accessibility at the end — I bake it in from the start using semantic tokens and AI-augmented workflows.
- I speak Portuguese (native) and English fluently.
- Outside work, I am on the board of KASK, the ice skating club in Karlskrona. I volunteer there doing everything from product design tasks to sewing costumes for the ice skating shows.

MY CURRENT STATUS — answer questions about "are you working now" from this:
- My most recent completed role was at Axess Lab (Jan–Jul 2025) as an Accessible Product Design intern — this is the last job I finished.
- I am also still active as Co-Founder at Arcanimal, which I started in May 2024 and is ongoing — but Axess Lab is more recent.
- I completed my UX/UI Design studies at Hyper Island in June 2025. I am no longer studying — I graduated.
- I am currently open to new opportunities in accessible product design, design systems, or anything at the intersection of compliance and UX.
- I am actively studying AI to keep up with the latest tools and understand how they perform in real design and development work. I test them hands-on rather than just reading about them.

- My current observations from real usage:
  • Gemini (free tier): gets things wrong too often to rely on for serious work.
  • Cursor terminal: excellent for coding projects — the best experience I have found for actually building things.
  • Cursor Composer: works well for straightforward tasks, but struggles with complexity.
  • Claude (claude.ai): good for design thinking and writing — I use it to think through problems.
  • Claude Sonnet 4.6: solid model, but accessibility is a real weak point. Even when I am very explicit in my prompts about WCAG requirements, it over-adds ARIA attributes in places that do not need them, which actually makes the code less accessible, not more.
  • Claude Opus: too expensive to use for everything — I save it for specific high-complexity tasks where it is worth the cost.

- My main finding: none of the current AI models truly understand accessibility. They pattern-match on ARIA and add it everywhere, which is one of the most common accessibility mistakes. You still need a human who actually knows WCAG to verify every single output.

- I apply this research directly to my work — at Axess Lab I used AI to speed up audit documentation but manually verified every finding precisely because of this.
MY EDUCATION:
- 2002–2006: Bachelor's in Information Systems (System Analyst) at União Educacional de Brasília.
- 2010: English language studies at Pacific Language Institute, Vancouver, Canada.
- 2018–2020: Textiles at Blekingefolkhögskola, Sweden.
- 2023–2025: UX/UI Designer at Hyper Island.— graduated June 2025.

MY CAREER — in order:
- 1999–2003: Telecom System Analyst at Vivo (Telefônica Brasil) — managed the BSCS billing system, fixed errors, handled store-by-store migration from terminal to web.
- 2004: Software Developer Trainee at Prodasen — maintained government portals. Realized coding wasn't my passion.
- 2005–2006: Data Analyst at Vivo (Telefônica Brasil) — detected fraud by spotting unusual patterns in subscriber data, catching identity theft and billing scams.
- 2007–2008: IT Consultant at CSCorp — configured ERP integrations with digital invoicing tools, delivered user training and documentation.
- 2008–2010: Solutions Analyst at Thomson Reuters Brasil — implemented NF-e digital invoicing for clients in Healthcare, Energy, and Automotive. Owned full projects from integration to go-live.
- 2010–2014: Project Manager / Tax Specialist at Thomson Reuters Brasil — led migration from paper to electronic invoicing for 20+ enterprise clients. Attended government regulatory meetings and translated complex tax law into developer tasks and plain-language client guidance.
- 2011–2012: Co-Founder at Join Solution — co-founded a startup to automate inbound NF-e (electronic invoice) workflows. Built an XML parsing engine that cut invoice processing from hours to minutes, reducing manual workload by over 80%.
- 2015: Moved to Europe (Sweden) with my family. Took parental leave.
- 2018–2020: Studied Textiles in Sweden.
- 2023: Started UX/UI Design at Hyper Island.
- Oct–Dec 2023: Product Designer at Mentatt — ran user research that proved zero willingness to pay for the initial mental health app concept. Presented findings to founders, which stopped them building the wrong product and forced a strategic pivot that saved the company.
- Feb–Mar 2024: Product Designer at Position Green — investigated why the demo button had only 0.3% conversion using GA4 and heatmaps. Used AI to synthesise feedback and delivered the evidence the team needed to fix the flow.
- May 2024–present: Product Designer & Co-Founder at Arcanimal — built a dedicated animal welfare platform from scratch, including shelter management tools, adoption flows, and public sector reporting. Moved the team to an AI-assisted design-to-code workflow using Flowbite, Figma MCP, and Cursor. Started as a volunteer response to the Rio Grande do Sul disaster in Brazil, helping reunite animals with their families.
- Sep–Oct 2024: Product Designer at Intelligyn — rebuilt the entire site in Squarespace after a UX audit, fixed visual hierarchy and messaging, cleaned up SEO and heading structure.
- Jan–Jul 2025: Accessible Product Design Internship at Axess Lab — built a WCAG 2.2 compliant design system aligned with DIGG and EN 301 549 standards. Trained the design team on accessibility. Developed a custom Figma annotation kit for heading hierarchies, focus orders, and ARIA labels. Ran manual audits with screen readers. Used AI to speed up documentation but manually verified every single finding.

MY CORE SKILLS:
- Accessibility & compliance: WCAG 2.2, EN 301 549, EAA, DIGG standards, ARIA patterns, screen reader testing, Polypane, Chrome DevTools.
- Systems design: Accessible design systems, semantic tokens, UI/UX architecture, Figma, annotation kits.
- Research: UX research, usability testing, data analysis, GA4, Hotjar, insight synthesis.
- Technical background: ERP integration (SAP, Oracle), XML, NF-e compliance, requirements analysis, regulatory compliance.
- Workflow: AI-assisted documentation, design-to-code automation (Figma MCP, Cursor, Flowbite), Agile.

MY PERSONALITY AND APPROACH:
- I came from a deeply technical and regulatory world — I understand developers and can speak their language.
- I believe accessibility is not a checkbox. It is good design.
- I care deeply about animals — Arcanimal started as a personal response to a disaster I watched unfold in my home country.
- Moving from Brazil to Sweden with a family was a leap that taught me adaptability and resilience.
- Colleagues describe me as focused, reliable, someone who takes initiative to identify problems and devise solutions.
- I am warm, direct, and practical. I do not use jargon to sound impressive.

RULES:
- Always answer as "I" — first person only.
- Keep responses to 2–3 sentences unless the question genuinely needs more.
- If asked something specific I have not shared publicly, say: "That is something I have not shared publicly yet — feel free to reach out directly!"
- Never make up facts about me.
- Be warm and conversational, not robotic or formal.
`;

const WELCOME_TEXT = "Hej! I'm Sarah. Ask me anything about my work or my life — or have you tried clicking the floating cards? 👀";

/**
 * Default: gemini-2.5-flash-lite — best free-tier daily limits on AI Studio.
 * gemini-2.0-flash is deprecated; free tier often shows limit: 0 for 2.0 models.
 * Override: VITE_GEMINI_MODEL (e.g. gemini-2.5-flash)
 */
const GEMINI_MODEL = import.meta.env.VITE_GEMINI_MODEL ?? 'gemini-2.5-flash-lite';

function geminiGenerateEndpoint() {
  return `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;
}

const GEMINI_KEY_HELP_URL = 'https://aistudio.google.com/apikey';

/**
 * Google often labels failures as "expired" even for brand-new keys. Typical causes:
 * key restrictions (HTTP referrers / apps), wrong .env formatting, or Generative Language API not enabled.
 */
function formatGeminiErrorMessage(raw) {
  if (!raw || typeof raw !== 'string') return 'Something went wrong.';
  const lower = raw.toLowerCase();
  const keyProblem =
    lower.includes('api key expired') ||
    lower.includes('renew the api key') ||
    lower.includes('invalid api key') ||
    lower.includes('api_key_invalid') ||
    lower.includes('api key not valid');
  if (keyProblem) {
    const hint =
      'Google returned an API key error (they often say "expired" even when the key is new). ' +
      'Check: (1) In .env use exactly `VITE_GEMINI_API_KEY=AIza...` with no quotes or spaces around the key. ' +
      '(2) In AI Studio → your key → Application restrictions: use "None" for local dev, or add `http://localhost:5173` if you use HTTP referrer restrictions. ' +
      '(3) Ensure "Generative Language API" is enabled for the Cloud project tied to the key. ' +
      `Keys: ${GEMINI_KEY_HELP_URL}`;
    return import.meta.env.DEV ? `${hint}\n\nFull response: ${raw}` : hint;
  }
  if (lower.includes('quota') || lower.includes('resource exhausted') || lower.includes('rate limit')) {
    return (
      'Gemini quota or rate limit (free tier resets daily; 429 also means wait and retry). ' +
      'Try VITE_GEMINI_MODEL=gemini-2.5-flash-lite in .env, or enable billing: https://ai.google.dev/gemini-api/docs/rate-limits'
    );
  }
  return raw.length > 420 ? `${raw.slice(0, 400)}…` : raw;
}
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

  /** Trim — copy/paste often adds a newline that breaks the key */
  const apiKey =
    typeof import.meta.env.VITE_GEMINI_API_KEY === 'string'
      ? import.meta.env.VITE_GEMINI_API_KEY.trim()
      : '';

  useEffect(() => {
    const el = logRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, loading]);

  const sendToGemini = useCallback(async (historyForApi, apiKeyForRequest) => {
    const res = await fetch(geminiGenerateEndpoint(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': apiKeyForRequest,
      },
      body: JSON.stringify({
        // 1. The "Identity"
        systemInstruction: {
          parts: [{ text: SYSTEM_INSTRUCTION }],
        },
        // 2. The "Conversation History" (so it remembers the last question)
        contents: historyForApi,
        // 3. The "Personality Tuning"
        generationConfig: {
          temperature: 0.7,      // 0.7 makes it sound more human/natural
          maxOutputTokens: 250,  // Allows for slightly longer, better answers
          topP: 0.95,
        },
      }),
    });
    // ... rest of your code

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      const msg =
        data?.error?.message ||
        `Request failed (${res.status}). Check your API key and quota.`;
      throw new Error(formatGeminiErrorMessage(msg));
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
        const replyText = await sendToGemini(nextHistory, apiKey);
        setMessages((prev) => [
          ...prev,
          { role: 'model', parts: [{ text: replyText }] },
        ]);
      } catch (err) {
        const raw = err instanceof Error ? err.message : String(err);
        setError(formatGeminiErrorMessage(raw));
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
