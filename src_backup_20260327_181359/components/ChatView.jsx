import { useState, useRef, useEffect, useCallback } from 'react';
import { PaperPlaneTilt } from '@phosphor-icons/react';
import s from '../styles/ChatView.module.css';

export default function ChatView() {
  const [messages, setMessages] = useState([
    { role: 'assistant', text: "Hi! I'm Sarah's AI assistant. Ask me anything about her work, skills, or experience." }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [typing, setTyping] = useState(false);
  const logRef = useRef(null);

  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
  }, [messages, typing]);

  const onSend = useCallback((e) => {
    e.preventDefault();
    const msg = inputValue.trim();
    if (!msg) return;
    setMessages(prev => [...prev, { role: 'user', text: msg }]);
    setInputValue('');
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages(prev => [...prev, {
        role: 'assistant',
        text: "Thanks for your question! Connect your AI agent by replacing this mock response with your API call."
      }]);
    }, 1400);
  }, [inputValue]);

  return (
    <div className={s.wrapper}>
      <div ref={logRef} className={s.chatLog} role="log" aria-label="Conversation" aria-live="polite">
        {messages.map((m, i) => (
          <div key={i} className={`${s.bubble} ${m.role === 'user' ? s.userBubble : s.botBubble}`}>
            {m.text}
          </div>
        ))}
        {typing && (
          <div className={s.botBubble}>
            <div className={s.typingIndicator}>
              <span /><span /><span />
            </div>
          </div>
        )}
      </div>

      <form className={s.inputArea} onSubmit={onSend} aria-label="Send a message">
        <label htmlFor="chat-input" className={s.srOnly}>Ask Sarah's assistant</label>
        <input
          id="chat-input"
          className={s.inputField}
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          placeholder="Ask me about Sarah's work…"
          autoComplete="off"
        />
        <button
          className={s.sendBtn}
          disabled={!inputValue.trim()}
          type="submit"
          aria-label="Send message"
        >
          <PaperPlaneTilt size={20} weight="bold" aria-hidden="true" />
        </button>
      </form>
    </div>
  );
}
