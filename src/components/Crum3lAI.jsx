import React, { useState, useRef, useEffect } from 'react';
import {
  Cookie,
  Sparkles,
  Send,
  Trash2,
  Copy,
  Check,
  Gamepad2,
  HelpCircle,
  Lightbulb,
  Zap,
  ArrowRight,
  BrainCircuit,
  MessageSquare,
} from 'lucide-react';
import { generateCrum3lFallbackResponse } from '../data/crum3lEngine.js';

export const Crum3lAI = ({ onLaunchGame, activeGameTitle }) => {
  const [messages, setMessages] = useState(() => {
    try {
      const saved = sessionStorage.getItem('c00k13_crum3l_chat');
      if (saved) return JSON.parse(saved);
    } catch {}
    return [
      {
        id: 'initial',
        role: 'assistant',
        text: `Hey there! I'm **CRUM3L**, your built-in C00K13 companion. 🍪\n\nAsk me anything: game walkthroughs (Minecraft, Cuphead, Skate 3, FNAF, Ultrakill, DOOM, 2048), homework & science questions, coding tips, or secret tricks!\n\nWhat can I help you conquer today?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ];
  });

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const messagesEndRef = useRef(null);

  // Auto-scroll on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Save conversation in session
  useEffect(() => {
    try {
      sessionStorage.setItem('c00k13_crum3l_chat', JSON.stringify(messages));
    } catch {}
  }, [messages]);

  // Suggested prompt pills
  const promptSuggestions = [
    { label: '⛏️ Minecraft Guide', query: 'How do I find diamonds and defeat the Ender Dragon in Minecraft?' },
    { label: '🏆 2048 Strategy', query: 'What is the best strategy to beat 2048?' },
    { label: '☕ Cuphead Bosses', query: 'What are the best weapons and tactics for Cuphead bosses?' },
    { label: '🛹 Skate 3 Controls', query: 'How do I do kickflips and manual grinds in Skate 3?' },
    { label: '💀 DOOM Cheats', query: 'What are the classic cheat codes for DOOM 1993?' },
    { label: '🧮 Math Homework', query: 'Can you explain the quadratic formula and how to solve 2x^2 + 5x - 3 = 0?' },
    { label: '🧬 Biology Study', query: 'Explain photosynthesis and cellular respiration simply.' },
    { label: '🏎️ Drift Tuning', query: 'What is the best tuning setup for Drift Hunters?' },
  ];

  // Send message
  const handleSend = async (textToSend) => {
    const query = (textToSend || input).trim();
    if (!query || isLoading) return;

    const userMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    let replyText = '';

    try {
      // 1. Try calling the backend Gemini API endpoint
      const response = await fetch('/api/crum3l/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          history: messages.slice(-6).map((m) => ({ role: m.role, text: m.text })),
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.reply) {
          replyText = data.reply;
        } else {
          // Fallback if no API key is on server
          replyText = generateCrum3lFallbackResponse(query);
        }
      } else {
        replyText = generateCrum3lFallbackResponse(query);
      }
    } catch {
      // 2. Seamless client fallback engine for static deployments / GitHub Pages
      replyText = generateCrum3lFallbackResponse(query);
    }

    const aiMessage = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      text: replyText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setIsLoading(false);
    setMessages((prev) => [...prev, aiMessage]);
  };

  const handleClearChat = () => {
    const reset = [
      {
        id: 'initial',
        role: 'assistant',
        text: `Chat cleared! Ready for new questions. Ask me about games, homework, cheat codes, or gaming lore!`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ];
    setMessages(reset);
    try {
      sessionStorage.removeItem('c00k13_crum3l_chat');
    } catch {}
  };

  const handleCopy = (id, text) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Render markdown-like text nicely
  const formatAiMessage = (content) => {
    const lines = content.split('\n');
    return lines.map((line, idx) => {
      // Headers
      if (line.startsWith('### ')) {
        return (
          <h4 key={idx} className="text-sm font-bold text-white mt-2 mb-1 flex items-center gap-1.5 text-[#ff5b79]">
            {line.replace('### ', '')}
          </h4>
        );
      }
      if (line.startsWith('## ')) {
        return (
          <h3 key={idx} className="text-base font-extrabold text-white mt-2.5 mb-1.5">
            {line.replace('## ', '')}
          </h3>
        );
      }
      // Bullet points
      if (line.startsWith('- ') || line.startsWith('* ')) {
        return (
          <div key={idx} className="flex items-start gap-2 my-0.5 ml-2 text-slate-200">
            <span className="text-[#ff5b79] mt-1 shrink-0">•</span>
            <span>{renderInlineFormatting(line.slice(2))}</span>
          </div>
        );
      }
      // Numbered items
      if (/^\d+\.\s/.test(line)) {
        return (
          <div key={idx} className="flex items-start gap-2 my-0.5 ml-2 text-slate-200">
            <span className="text-amber-400 font-mono font-bold text-xs mt-0.5 shrink-0">
              {line.match(/^\d+\./)[0]}
            </span>
            <span>{renderInlineFormatting(line.replace(/^\d+\.\s/, ''))}</span>
          </div>
        );
      }
      // Code snippet block
      if (line.startsWith('```')) {
        return null;
      }
      // Empty line
      if (!line.trim()) {
        return <div key={idx} className="h-1.5" />;
      }
      return (
        <p key={idx} className="my-0.5 leading-relaxed text-slate-200">
          {renderInlineFormatting(line)}
        </p>
      );
    });
  };

  const renderInlineFormatting = (text) => {
    // Bold **text**
    const parts = text.split(/(\*\*.*?\*\*|`.*?`)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={i} className="text-white font-semibold">
            {part.slice(2, -2)}
          </strong>
        );
      }
      if (part.startsWith('`') && part.endsWith('`')) {
        return (
          <code key={i} className="bg-[#24131d] text-[#ff5b79] px-1.5 py-0.5 rounded text-xs font-mono border border-[#3b192c]">
            {part.slice(1, -1)}
          </code>
        );
      }
      return part;
    });
  };

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col h-[calc(100vh-140px)] min-h-[500px] bg-[#120a10] border border-[#2b1722] rounded-3xl overflow-hidden shadow-2xl relative">
      
      {/* Top Header Bar */}
      <div className="bg-[#170e14] border-b border-[#2b1722] px-5 py-3.5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#ff5b79]/20 border border-[#ff5b79]/40 flex items-center justify-center shadow-lg shadow-[#ff5b79]/20">
            <Cookie className="w-5 h-5 text-[#ff5b79]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-extrabold text-white tracking-tight">CRUM3L</h2>
              <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1 font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Online
              </span>
            </div>
            <p className="text-xs text-slate-400 flex items-center gap-1.5">
              <span>C00K13 Intelligent Gaming &amp; Study AI</span>
              <span>·</span>
              <span className="text-[#ff5b79] font-mono text-[11px]">Gemini 3.8 Flash</span>
            </p>
          </div>
        </div>

        {/* Header Tools */}
        <div className="flex items-center gap-2">
          {activeGameTitle && (
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 bg-[#23121d] border border-[#3b192c] rounded-xl text-xs text-slate-300">
              <Gamepad2 className="w-3.5 h-3.5 text-[#ff5b79]" />
              <span>Playing: <strong>{activeGameTitle}</strong></span>
            </div>
          )}

          <button
            onClick={handleClearChat}
            title="Clear chat history"
            className="p-2 text-slate-400 hover:text-rose-400 hover:bg-[#23121d] rounded-xl transition-colors focus:outline-none"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Suggested Prompt Chips */}
      <div className="bg-[#160d13] border-b border-[#24131d] px-5 py-2 flex items-center gap-2 overflow-x-auto no-scrollbar text-xs">
        <span className="text-slate-500 text-[11px] font-semibold shrink-0 uppercase tracking-wider flex items-center gap-1">
          <Lightbulb className="w-3 h-3 text-amber-400" /> Prompts:
        </span>
        {promptSuggestions.map((p, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(p.query)}
            className="px-2.5 py-1 rounded-lg bg-[#22121c] hover:bg-[#2d1825] border border-[#3b1a2d] hover:border-[#ff5b79]/40 text-slate-300 hover:text-white transition-all whitespace-nowrap text-xs shrink-0 flex items-center gap-1"
          >
            <span>{p.label}</span>
          </button>
        ))}
      </div>

      {/* Messages Thread */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
        {messages.map((msg) => {
          const isUser = msg.role === 'user';
          return (
            <div
              key={msg.id}
              className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'} animate-in fade-in`}
            >
              {!isUser && (
                <div className="w-8 h-8 rounded-xl bg-[#22121c] border border-[#3d1e31] flex items-center justify-center shrink-0 mt-0.5">
                  <Cookie className="w-4 h-4 text-[#ff5b79]" />
                </div>
              )}

              <div
                className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed shadow-md relative group ${
                  isUser
                    ? 'bg-[#ff5b79] text-white rounded-br-xs'
                    : 'bg-[#180e15] border border-[#2d1b26] text-slate-100 rounded-bl-xs'
                }`}
              >
                {/* Message Body */}
                <div className="space-y-1">
                  {isUser ? (
                    <p className="font-medium whitespace-pre-wrap">{msg.text}</p>
                  ) : (
                    <div>{formatAiMessage(msg.text)}</div>
                  )}
                </div>

                {/* Footer timestamp and copy */}
                <div
                  className={`flex items-center justify-between gap-4 mt-2 pt-1 border-t ${
                    isUser ? 'border-white/20 text-white/80' : 'border-[#2d1b26] text-slate-500'
                  } text-[10px]`}
                >
                  <span className="font-mono">{msg.timestamp}</span>

                  {!isUser && (
                    <button
                      onClick={() => handleCopy(msg.id, msg.text)}
                      className="hover:text-white transition-colors flex items-center gap-1 focus:outline-none opacity-0 group-hover:opacity-100"
                      title="Copy response"
                    >
                      {copiedId === msg.id ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span className="text-emerald-400">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {/* Thinking Indicator */}
        {isLoading && (
          <div className="flex gap-3 justify-start animate-in fade-in">
            <div className="w-8 h-8 rounded-xl bg-[#22121c] border border-[#3d1e31] flex items-center justify-center shrink-0">
              <Cookie className="w-4 h-4 text-[#ff5b79] animate-spin" />
            </div>
            <div className="bg-[#180e15] border border-[#2d1b26] rounded-2xl px-4 py-3 flex items-center gap-2 text-xs text-slate-400">
              <Sparkles className="w-3.5 h-3.5 text-[#ff5b79] animate-pulse" />
              <span>CRUM3L is thinking...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Form Bar */}
      <div className="bg-[#170e14] border-t border-[#2b1722] p-3 sm:p-4">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2"
        >
          <div className="relative flex-1">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask CRUM3L anything (e.g. 'How do I beat 2048?', 'Help with algebra', 'Minecraft secrets')..."
              className="w-full pl-4 pr-10 py-3 bg-[#11070d] border border-[#2d1b26] focus:border-[#ff5b79] focus:ring-1 focus:ring-[#ff5b79] rounded-2xl text-xs sm:text-sm text-white placeholder-slate-500 transition-colors outline-none"
              disabled={isLoading}
            />
          </div>

          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="p-3 bg-[#ff5b79] hover:bg-[#ff4365] disabled:opacity-40 disabled:hover:bg-[#ff5b79] text-white rounded-2xl transition-all shadow-lg shadow-[#ff5b79]/25 shrink-0 focus:outline-none"
            title="Send query to CRUM3L"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>

    </div>
  );
};
