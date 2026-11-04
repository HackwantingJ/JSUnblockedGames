import React, { useState, useRef } from 'react';
import {
  Search,
  ArrowLeft,
  ArrowRight,
  RotateCcw,
  Home,
  Lock,
  ExternalLink,
  Maximize2,
  Minimize2,
  Globe,
  Sparkles,
  Bookmark,
  Cookie,
  ShieldCheck,
  X,
  Compass,
} from 'lucide-react';

export const ProxyBrowser = () => {
  // Navigation history
  const [history, setHistory] = useState(['home']);
  const [historyIndex, setHistoryIndex] = useState(0);

  // Omnibar input and active URL
  const [urlInput, setUrlInput] = useState('');
  const [activeUrl, setActiveUrl] = useState('');
  const [isHome, setIsHome] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [iframeKey, setIframeKey] = useState(0);

  const containerRef = useRef(null);

  // DuckDuckGo Search Resolver
  const executeSearch = (rawQuery) => {
    const query = rawQuery.trim();
    if (!query) return;

    let target = '';

    // Check if input is a direct URL (e.g. "wikipedia.org", "https://google.com")
    const isUrl =
      /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/.*)?$/.test(query) &&
      !query.includes(' ') &&
      !query.startsWith('?');

    if (isUrl) {
      target = query.startsWith('http://') || query.startsWith('https://') ? query : 'https://' + query;
    } else {
      // Search via DuckDuckGo embed-friendly HTML endpoint
      target = `https://html.duckduckgo.com/html/?q=${encodeURIComponent(query)}`;
    }

    // Determine whether to use server proxy if available or direct embed
    // In full-stack server mode: /api/proxy?url=...
    // In static mode: direct target
    setUrlInput(target);
    setActiveUrl(target);
    setIsHome(false);
    setIsLoading(true);

    // Update history
    const nextHistory = [...history.slice(0, historyIndex + 1), target];
    setHistory(nextHistory);
    setHistoryIndex(nextHistory.length - 1);
  };

  const handleGoHome = () => {
    setIsHome(true);
    setActiveUrl('');
    setUrlInput('');
    setIsLoading(false);
    const nextHistory = [...history.slice(0, historyIndex + 1), 'home'];
    setHistory(nextHistory);
    setHistoryIndex(nextHistory.length - 1);
  };

  const handleBack = () => {
    if (historyIndex > 0) {
      const prevIdx = historyIndex - 1;
      setHistoryIndex(prevIdx);
      const prevTarget = history[prevIdx];
      if (prevTarget === 'home') {
        setIsHome(true);
        setActiveUrl('');
        setUrlInput('');
      } else {
        setIsHome(false);
        setActiveUrl(prevTarget);
        setUrlInput(prevTarget);
        setIsLoading(true);
      }
    }
  };

  const handleForward = () => {
    if (historyIndex < history.length - 1) {
      const nextIdx = historyIndex + 1;
      setHistoryIndex(nextIdx);
      const nextTarget = history[nextIdx];
      if (nextTarget === 'home') {
        setIsHome(true);
        setActiveUrl('');
        setUrlInput('');
      } else {
        setIsHome(false);
        setActiveUrl(nextTarget);
        setUrlInput(nextTarget);
        setIsLoading(true);
      }
    }
  };

  const handleReload = () => {
    setIframeKey((prev) => prev + 1);
    setIsLoading(true);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen?.();
      setIsFullScreen(true);
    } else {
      document.exitFullscreen?.();
      setIsFullScreen(false);
    }
  };

  // Curated popular bookmarks
  const bookmarks = [
    { name: 'Wikipedia', icon: '📖', url: 'https://en.m.wikipedia.org' },
    { name: 'Internet Archive', icon: '🏛️', url: 'https://archive.org' },
    { name: 'NASA Space', icon: '🚀', url: 'https://www.nasa.gov' },
    { name: 'Scratch MIT', icon: '🐱', url: 'https://scratch.mit.edu' },
    { name: 'Wolfram Alpha', icon: '🧮', url: 'https://www.wolframalpha.com' },
    { name: 'GitHub', icon: '🐙', url: 'https://github.com' },
    { name: 'Old Reddit', icon: '🤖', url: 'https://old.reddit.com' },
    { name: 'National Geographic', icon: '🌍', url: 'https://www.nationalgeographic.com' },
  ];

  // Resolve proxy or direct URL
  const getIframeSource = (url) => {
    if (!url) return '';
    // If it's duckduckgo html search, embed directly
    if (url.includes('duckduckgo.com')) {
      return url;
    }
    // For other sites, try our server proxy endpoint to bypass X-Frame-Options
    return `/api/proxy?url=${encodeURIComponent(url)}`;
  };

  return (
    <div
      ref={containerRef}
      className={`w-full bg-[#120a10] border border-[#2b1722] rounded-3xl overflow-hidden shadow-2xl flex flex-col transition-all ${
        isFullScreen ? 'fixed inset-0 z-50 rounded-none' : 'h-[calc(100vh-140px)] min-h-[580px]'
      }`}
    >
      {/* 1. Browser Navigation Chrome Bar (Omnibar) */}
      <div className="bg-[#170e14] border-b border-[#2b1722] px-4 py-2.5 flex items-center justify-between gap-3">
        {/* Navigation Buttons */}
        <div className="flex items-center gap-1.5 shrink-0 text-slate-400">
          <button
            onClick={handleBack}
            disabled={historyIndex <= 0}
            title="Go back"
            className="p-1.5 hover:text-white disabled:opacity-30 hover:bg-[#251320] rounded-xl transition-colors focus:outline-none"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          <button
            onClick={handleForward}
            disabled={historyIndex >= history.length - 1}
            title="Go forward"
            className="p-1.5 hover:text-white disabled:opacity-30 hover:bg-[#251320] rounded-xl transition-colors focus:outline-none"
          >
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={handleReload}
            title="Reload current page"
            className="p-1.5 hover:text-white hover:bg-[#251320] rounded-xl transition-colors focus:outline-none"
          >
            <RotateCcw className={`w-4 h-4 ${isLoading ? 'animate-spin text-[#ff5b79]' : ''}`} />
          </button>

          <button
            onClick={handleGoHome}
            title="Go to C00K13 Search Homepage"
            className={`p-1.5 rounded-xl transition-colors focus:outline-none ${
              isHome
                ? 'bg-[#ff5b79]/20 text-[#ff5b79] border border-[#ff5b79]/40'
                : 'hover:text-white hover:bg-[#251320]'
            }`}
          >
            <Home className="w-4 h-4" />
          </button>
        </div>

        {/* Omnibar / Address & Search Input */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            executeSearch(urlInput);
          }}
          className="flex-1 max-w-2xl mx-auto flex items-center"
        >
          <div className="relative w-full flex items-center">
            <div className="absolute left-3.5 flex items-center gap-1.5 pointer-events-none text-slate-500">
              <Lock className="w-3.5 h-3.5 text-emerald-400" />
            </div>

            <input
              type="text"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              placeholder="Search with DuckDuckGo or enter web address..."
              className="w-full pl-9 pr-10 py-1.5 bg-[#10070d] border border-[#2d1b26] focus:border-[#ff5b79] focus:ring-1 focus:ring-[#ff5b79] rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 outline-none transition-colors"
            />

            {urlInput && (
              <button
                type="button"
                onClick={() => setUrlInput('')}
                className="absolute right-3 text-slate-400 hover:text-white p-0.5"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>
        </form>

        {/* Window controls */}
        <div className="flex items-center gap-1.5 shrink-0 text-slate-400">
          {activeUrl && (
            <a
              href={activeUrl}
              target="_blank"
              rel="noopener noreferrer"
              title="Open website in new window"
              className="p-1.5 hover:text-white hover:bg-[#251320] rounded-xl transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          )}

          <button
            onClick={toggleFullscreen}
            title={isFullScreen ? 'Exit fullscreen' : 'Fullscreen browser'}
            className="p-1.5 hover:text-white hover:bg-[#251320] rounded-xl transition-colors focus:outline-none"
          >
            {isFullScreen ? <Minimize2 className="w-4 h-4 text-[#ff5b79]" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* 2. Main Viewport: HOMEPAGE vs. IFRAME BROWSER */}
      {isHome ? (
        /* ================= C00K13 SEARCH HOMEPAGE (DuckDuckGo) ================= */
        <div className="flex-1 overflow-y-auto p-6 flex flex-col items-center justify-center relative select-none bg-[#0f070c]">
          {/* Ambient glow */}
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#ff5b79]/10 rounded-full blur-[110px] pointer-events-none" />

          <div className="w-full max-w-xl text-center space-y-6 relative z-10 animate-in fade-in">
            {/* Mascot & Brand Wordmark */}
            <div className="inline-flex flex-col items-center">
              <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-[#de5833] via-[#ff5b79] to-[#ea703a] p-0.5 shadow-2xl shadow-[#ff5b79]/30 mb-3">
                <div className="w-full h-full bg-[#1b0d16] rounded-[22px] flex items-center justify-center text-3xl">
                  🦆
                </div>
              </div>

              {/* Title: C00K13 Search as requested */}
              <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight flex items-center gap-2">
                <span>c00k13 search</span>
                <span className="text-xs uppercase font-mono px-2 py-0.5 rounded-full bg-[#de5833]/20 text-[#de5833] border border-[#de5833]/40">
                  DuckDuckGo
                </span>
              </h1>
              <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-md">
                Fast, private, and unblocked browsing powered directly by DuckDuckGo. Zero ad tracking.
              </p>
            </div>

            {/* Central DuckDuckGo Search Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                executeSearch(urlInput);
              }}
              className="space-y-3"
            >
              <div className="relative shadow-xl">
                <Search className="w-5 h-5 text-slate-500 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  placeholder="Search DuckDuckGo or enter web address..."
                  autoFocus
                  className="w-full pl-12 pr-4 py-3.5 bg-[#170e15] border border-[#3b192c] focus:border-[#ff5b79] focus:ring-2 focus:ring-[#ff5b79]/20 rounded-2xl text-sm sm:text-base text-white placeholder-slate-500 outline-none transition-all shadow-inner"
                />
              </div>

              {/* Search Action Buttons */}
              <div className="flex items-center justify-center gap-2.5 pt-1">
                <button
                  type="submit"
                  disabled={!urlInput.trim()}
                  className="px-5 py-2.5 bg-[#de5833] hover:bg-[#c94926] disabled:opacity-40 text-white font-bold text-xs rounded-xl shadow-lg shadow-[#de5833]/25 transition-all flex items-center gap-1.5 focus:outline-none"
                >
                  <Search className="w-3.5 h-3.5" />
                  <span>DuckDuckGo Search</span>
                </button>

                <button
                  type="button"
                  onClick={() => executeSearch('https://en.m.wikipedia.org/wiki/Special:Random')}
                  className="px-4 py-2.5 bg-[#23121d] hover:bg-[#321829] border border-[#3d1e31] text-slate-300 hover:text-white font-semibold text-xs rounded-xl transition-all flex items-center gap-1.5 focus:outline-none"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>I&apos;m Feeling Unblocked</span>
                </button>
              </div>
            </form>

            {/* Popular Curated Web Bookmarks */}
            <div className="pt-6">
              <div className="flex items-center justify-between text-xs text-slate-500 mb-3 px-1">
                <span className="font-bold uppercase tracking-wider text-[11px] flex items-center gap-1">
                  <Bookmark className="w-3.5 h-3.5 text-[#ff5b79]" />
                  <span>Unblocked Shortcuts</span>
                </span>
                <span className="text-[10px] text-emerald-400 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>SSL Encrypted</span>
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {bookmarks.map((bm, idx) => (
                  <button
                    key={idx}
                    onClick={() => executeSearch(bm.url)}
                    className="flex items-center gap-2.5 p-2.5 rounded-2xl bg-[#170e14] hover:bg-[#261521] border border-[#2b1722] hover:border-[#ff5b79]/40 transition-all text-left group shadow-sm hover:scale-[1.02]"
                  >
                    <span className="text-xl shrink-0 group-hover:scale-110 transition-transform">
                      {bm.icon}
                    </span>
                    <div className="truncate">
                      <p className="text-xs font-bold text-slate-200 group-hover:text-white truncate">
                        {bm.name}
                      </p>
                      <p className="text-[10px] text-slate-500 font-mono truncate">
                        {bm.url.replace(/^https?:\/\//, '')}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Privacy note */}
            <p className="text-[11px] text-slate-500 pt-2">
              Privacy guaranteed: DuckDuckGo never stores your personal info or search history.
            </p>
          </div>
        </div>
      ) : (
        /* ================= EMBEDDED IFRAME BROWSER VIEW ================= */
        <div className="flex-1 w-full h-full relative bg-black flex items-center justify-center">
          {isLoading && (
            <div className="absolute inset-0 bg-[#0d070a]/80 backdrop-blur-xs flex items-center justify-center z-20 pointer-events-none">
              <div className="flex items-center gap-2 px-4 py-2 bg-[#22121c] border border-[#3b192c] rounded-2xl text-xs text-slate-300 shadow-xl">
                <RotateCcw className="w-4 h-4 animate-spin text-[#ff5b79]" />
                <span>Loading DuckDuckGo results...</span>
              </div>
            </div>
          )}

          <iframe
            key={iframeKey}
            src={getIframeSource(activeUrl)}
            title="C00K13 Search - Proxy Browser"
            className="w-full h-full border-0"
            allow="fullscreen; autoplay; gamepad; clipboard-read; clipboard-write; camera; microphone"
            allowFullScreen
            onLoad={() => setIsLoading(false)}
          />
        </div>
      )}
    </div>
  );
};
