import React, { useState } from 'react';
import {
  X,
  Link2,
  Copy,
  Check,
  ExternalLink,
  Globe,
  Gamepad2,
  Sparkles,
  Calculator as CalcIcon,
  MessageSquare,
  HelpCircle,
  FileCode,
  ShieldCheck,
} from 'lucide-react';

export const CustomLinkModal = ({
  isOpen,
  onClose,
  games = [],
  activeGameId = null,
}) => {
  const [targetType, setTargetType] = useState(activeGameId ? 'game' : 'games');
  const [selectedGameId, setSelectedGameId] = useState(activeGameId || (games[0]?.id || 'minecraft'));
  const [includePin, setIncludePin] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState('generator'); // 'generator' | 'github_pages' | 'custom_game'

  if (!isOpen) return null;

  // Base URL calculation (supports current origin and pathname)
  const origin = window.location.origin;
  const pathname = window.location.pathname;
  const baseUrl = `${origin}${pathname}`;

  // Build generated query parameters
  const params = new URLSearchParams();

  if (targetType === 'calculator') {
    // Calculator view (no auto unlock)
  } else {
    if (includePin) {
      params.set('pass', '1865');
    }

    if (targetType === 'game' && selectedGameId) {
      params.set('game', selectedGameId);
    } else if (targetType === 'browser') {
      params.set('view', 'browser');
      if (searchQuery.trim()) {
        params.set('q', searchQuery.trim());
      }
    } else if (targetType === 'ai') {
      params.set('view', 'ai');
    } else if (targetType === 'chat') {
      params.set('view', 'chat');
    } else {
      params.set('view', 'games');
    }
  }

  const queryString = params.toString();
  const generatedLink = queryString ? `${baseUrl}?${queryString}` : baseUrl;

  const handleCopy = () => {
    navigator.clipboard?.writeText(generatedLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div className="w-full max-w-xl bg-[#140c12] border border-[#2d1b26] rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150 flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-[#24131d] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-[#ff5b79]/20 border border-[#ff5b79]/40 flex items-center justify-center text-[#ff5b79]">
              <Link2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <span>Custom Link Center</span>
                <span className="text-[10px] uppercase font-mono px-1.5 py-0.2 rounded-md bg-[#ff5b79]/20 text-[#ff5b79] border border-[#ff5b79]/30">
                  C00K13
                </span>
              </h3>
              <p className="text-xs text-slate-400">Create shareable direct links &amp; custom domains</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-xl hover:bg-[#251520] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center border-b border-[#24131d] px-6 bg-[#10070e] text-xs font-semibold shrink-0">
          <button
            onClick={() => setActiveTab('generator')}
            className={`py-3 px-3 border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'generator'
                ? 'border-[#ff5b79] text-[#ff5b79]'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <Link2 className="w-3.5 h-3.5" />
            <span>Link Generator</span>
          </button>
          <button
            onClick={() => setActiveTab('github_pages')}
            className={`py-3 px-3 border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'github_pages'
                ? 'border-[#ff5b79] text-[#ff5b79]'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>Custom Domain (GitHub Pages)</span>
          </button>
          <button
            onClick={() => setActiveTab('custom_game')}
            className={`py-3 px-3 border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'custom_game'
                ? 'border-[#ff5b79] text-[#ff5b79]'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <Gamepad2 className="w-3.5 h-3.5" />
            <span>Add Custom Game URL</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5 text-xs text-slate-300">
          {activeTab === 'generator' && (
            <>
              {/* Destination selector */}
              <div>
                <label className="block text-xs font-bold text-slate-200 mb-2">
                  1. Choose Link Destination
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setTargetType('games')}
                    className={`p-3 rounded-2xl border text-left transition-all ${
                      targetType === 'games'
                        ? 'bg-[#ff5b79]/20 border-[#ff5b79] text-white'
                        : 'bg-[#180e15] border-[#2b1722] hover:bg-[#23141f] text-slate-300'
                    }`}
                  >
                    <Gamepad2 className="w-4 h-4 text-[#ff5b79] mb-1.5" />
                    <p className="font-bold text-xs text-white">Games Hub</p>
                    <p className="text-[10px] text-slate-400">All unblocked arcade games</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setTargetType('game')}
                    className={`p-3 rounded-2xl border text-left transition-all ${
                      targetType === 'game'
                        ? 'bg-[#ff5b79]/20 border-[#ff5b79] text-white'
                        : 'bg-[#180e15] border-[#2b1722] hover:bg-[#23141f] text-slate-300'
                    }`}
                  >
                    <Gamepad2 className="w-4 h-4 text-emerald-400 mb-1.5" />
                    <p className="font-bold text-xs text-white">Specific Game</p>
                    <p className="text-[10px] text-slate-400">Directly opens chosen game</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setTargetType('browser')}
                    className={`p-3 rounded-2xl border text-left transition-all ${
                      targetType === 'browser'
                        ? 'bg-[#ff5b79]/20 border-[#ff5b79] text-white'
                        : 'bg-[#180e15] border-[#2b1722] hover:bg-[#23141f] text-slate-300'
                    }`}
                  >
                    <Globe className="w-4 h-4 text-[#de5833] mb-1.5" />
                    <p className="font-bold text-xs text-white">c00k13 Search</p>
                    <p className="text-[10px] text-slate-400">DuckDuckGo proxy browser</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setTargetType('ai')}
                    className={`p-3 rounded-2xl border text-left transition-all ${
                      targetType === 'ai'
                        ? 'bg-[#ff5b79]/20 border-[#ff5b79] text-white'
                        : 'bg-[#180e15] border-[#2b1722] hover:bg-[#23141f] text-slate-300'
                    }`}
                  >
                    <Sparkles className="w-4 h-4 text-amber-400 mb-1.5" />
                    <p className="font-bold text-xs text-white">CRUM3L AI</p>
                    <p className="text-[10px] text-slate-400">Study guide &amp; game engine</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setTargetType('chat')}
                    className={`p-3 rounded-2xl border text-left transition-all ${
                      targetType === 'chat'
                        ? 'bg-[#ff5b79]/20 border-[#ff5b79] text-white'
                        : 'bg-[#180e15] border-[#2b1722] hover:bg-[#23141f] text-slate-300'
                    }`}
                  >
                    <MessageSquare className="w-4 h-4 text-indigo-400 mb-1.5" />
                    <p className="font-bold text-xs text-white">Discord Chat</p>
                    <p className="text-[10px] text-slate-400">Age 13+ community lounge</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setTargetType('calculator')}
                    className={`p-3 rounded-2xl border text-left transition-all ${
                      targetType === 'calculator'
                        ? 'bg-[#ff5b79]/20 border-[#ff5b79] text-white'
                        : 'bg-[#180e15] border-[#2b1722] hover:bg-[#23141f] text-slate-300'
                    }`}
                  >
                    <CalcIcon className="w-4 h-4 text-slate-400 mb-1.5" />
                    <p className="font-bold text-xs text-white">Stealth Calculator</p>
                    <p className="text-[10px] text-slate-400">Disguised front door</p>
                  </button>
                </div>
              </div>

              {/* Sub-options based on destination */}
              {targetType === 'game' && (
                <div className="bg-[#180e15] border border-[#2b1722] rounded-2xl p-3.5 space-y-2">
                  <label className="block text-xs font-bold text-white">Select Game to Launch:</label>
                  <select
                    value={selectedGameId}
                    onChange={(e) => setSelectedGameId(e.target.value)}
                    className="w-full bg-[#10070e] border border-[#3b192c] rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-[#ff5b79]"
                  >
                    {games.map((g) => (
                      <option key={g.id} value={g.id}>
                        {g.title} ({g.category})
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {targetType === 'browser' && (
                <div className="bg-[#180e15] border border-[#2b1722] rounded-2xl p-3.5 space-y-2">
                  <label className="block text-xs font-bold text-white">
                    Pre-fill Search Query or Website (Optional):
                  </label>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="e.g. https://wikipedia.org or cool math science"
                    className="w-full bg-[#10070e] border border-[#3b192c] rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-[#ff5b79]"
                  />
                </div>
              )}

              {/* Auto-Unlock Switch */}
              {targetType !== 'calculator' && (
                <div className="flex items-center justify-between p-3.5 bg-[#180e15] border border-[#2b1722] rounded-2xl">
                  <div className="space-y-0.5">
                    <p className="text-xs font-bold text-white flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      <span>Auto-Bypass Calculator (PIN 1865)</span>
                    </p>
                    <p className="text-[11px] text-slate-400">
                      When enabled, anyone opening this link goes directly into the content without having to enter 1865.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIncludePin(!includePin)}
                    className={`w-12 h-6 rounded-full p-1 transition-colors relative ${
                      includePin ? 'bg-[#ff5b79]' : 'bg-slate-700'
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full bg-white transition-transform ${
                        includePin ? 'translate-x-6' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              )}

              {/* Generated URL Box */}
              <div className="space-y-2 pt-2">
                <label className="block text-xs font-bold text-white">
                  2. Your Generated Custom Link
                </label>
                <div className="flex items-center gap-2 p-2.5 bg-[#0e060d] border border-[#3b192c] rounded-2xl">
                  <input
                    type="text"
                    readOnly
                    value={generatedLink}
                    className="flex-1 bg-transparent text-xs font-mono text-[#ff5b79] outline-none select-all truncate px-1"
                  />
                  <button
                    onClick={handleCopy}
                    className="px-3.5 py-1.5 bg-[#ff5b79] hover:bg-[#ff4365] text-white font-bold rounded-xl transition-all flex items-center gap-1.5 shrink-0 shadow-md shadow-[#ff5b79]/20"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Link</span>
                      </>
                    )}
                  </button>
                  <a
                    href={generatedLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Test link in new tab"
                    className="p-1.5 text-slate-400 hover:text-white hover:bg-[#251520] rounded-xl transition-colors shrink-0"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </>
          )}

          {activeTab === 'github_pages' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-[#180e15] border border-[#2b1722] space-y-2">
                <h4 className="font-bold text-white text-sm flex items-center gap-2">
                  <Globe className="w-4 h-4 text-sky-400" />
                  <span>How to Set Up a Custom Domain on GitHub Pages</span>
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  You can give your site a custom link like <strong>games.yourname.com</strong> or <strong>c00k13.xyz</strong> instead of <code>hackwantingj.github.io</code>:
                </p>
                <ol className="list-decimal list-inside space-y-2 text-xs text-slate-300 pl-1 pt-1">
                  <li>
                    <strong>Buy or acquire a domain</strong> (from Namecheap, Google Domains / Squarespace, Cloudflare, or free subdomains).
                  </li>
                  <li>
                    Go to your repository on GitHub: <code>https://github.com/hackwantingj/hackwantingj.github.io</code>.
                  </li>
                  <li>
                    Click <strong>Settings &rarr; Pages</strong> on the left sidebar.
                  </li>
                  <li>
                    Under <strong>Custom domain</strong>, enter your custom URL (e.g. <code>c00k13.example.com</code>) and click <strong>Save</strong>.
                  </li>
                  <li>
                    In your domain registrar DNS, add a <strong>CNAME record</strong> pointing your subdomain to <code>hackwantingj.github.io</code>.
                  </li>
                  <li>
                    Check the <strong>Enforce HTTPS</strong> checkbox in GitHub Settings &rarr; Pages once DNS propagates.
                  </li>
                </ol>
              </div>

              <div className="p-4 rounded-2xl bg-[#180e15] border border-[#2b1722] space-y-2">
                <h4 className="font-bold text-white text-sm flex items-center gap-2">
                  <FileCode className="w-4 h-4 text-emerald-400" />
                  <span>Quick CNAME File Method</span>
                </h4>
                <p className="text-xs text-slate-300">
                  You can also create a file named <code>CNAME</code> in the root of your GitHub repository containing just your custom domain:
                </p>
                <div className="p-2.5 bg-[#0e060d] border border-[#3b192c] rounded-xl font-mono text-xs text-emerald-400">
                  play.c00k13.com
                </div>
              </div>
            </div>
          )}

          {activeTab === 'custom_game' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-[#180e15] border border-[#2b1722] space-y-2">
                <h4 className="font-bold text-white text-sm flex items-center gap-2">
                  <Gamepad2 className="w-4 h-4 text-[#ff5b79]" />
                  <span>How to Add Any Game via Custom URL / Embed</span>
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  You can turn any game on the internet into a playable game card in C00K13:
                </p>
                <ol className="list-decimal list-inside space-y-2 text-xs text-slate-300 pl-1 pt-1">
                  <li>
                    Find a game you want from sites like <strong>Nite.Games</strong>, <strong>itch.io</strong>, or <strong>GitHub</strong>.
                  </li>
                  <li>
                    Copy its embed code (e.g. <code>&lt;iframe src=&quot;https://nite.games/embed/...&quot;&gt;&lt;/iframe&gt;</code>) or its raw URL.
                  </li>
                  <li>
                    Click the <strong>+ Add</strong> button in the C00K13 navigation bar or footer.
                  </li>
                  <li>
                    Type the game title and paste the custom URL or iframe snippet into the box.
                  </li>
                  <li>
                    Click <strong>Save Game to JSON</strong>. It immediately appears in your game grid and saves to local storage!
                  </li>
                </ol>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 border-t border-[#24131d] bg-[#10070e] flex items-center justify-between text-xs shrink-0">
          <span className="text-slate-500 font-mono text-[11px]">
            PIN: 1865 · Secret Calculator Disguise
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-[#251520] hover:bg-[#341a2c] text-white font-semibold rounded-xl transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
