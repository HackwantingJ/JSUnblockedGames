import React, { useState, useRef, useEffect } from 'react';
import {
  RotateCcw,
  Maximize2,
  Minimize2,
  X,
  Heart,
  Code,
  Copy,
  Check,
  ExternalLink,
  Keyboard,
  Info
} from 'lucide-react';

export const GamePlayer = ({
  game,
  isFavorite,
  onClose,
  onToggleFavorite,
}) => {
  const [isTheater, setIsTheater] = useState(false);
  const [showJsonCode, setShowJsonCode] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [iframeKey, setIframeKey] = useState(0);
  const containerRef = useRef(null);
  const iframeRef = useRef(null);

  // Fullscreen support
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      if (containerRef.current?.requestFullscreen) {
        containerRef.current.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  // Reload iframe
  const reloadGame = () => {
    setIframeKey((prev) => prev + 1);
  };

  // Copy Iframe / JSON snippet
  const copyIframeJson = () => {
    const formatted = JSON.stringify(game, null, 2);
    navigator.clipboard.writeText(formatted);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  // Keyboard shortcut: Escape closes theater or game if not in fullscreen
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && !document.fullscreenElement) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Sanitize and resolve iframe source path relatively for GitHub Pages subpaths
  const resolveIframeSrc = (src) => {
    if (!src) return '';
    if (src.startsWith('http://') || src.startsWith('https://')) {
      return src;
    }
    if (src.startsWith('/games/')) {
      return '.' + src;
    }
    return src;
  };

  return (
    <div
      ref={containerRef}
      className={`w-full bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl transition-all ${
        isTheater ? 'max-w-6xl' : 'max-w-4xl'
      } mx-auto mb-10`}
    >
      {/* Player Header Controls */}
      <div className="bg-slate-900 border-b border-slate-800 px-4 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-3 h-3 rounded-full bg-emerald-500 shadow-sm shadow-emerald-500/50 shrink-0" />
          <div className="truncate">
            <h2 className="text-base font-bold text-white truncate flex items-center gap-2">
              <span>{game.title}</span>
              <span className="text-xs font-normal text-slate-400">({game.category})</span>
            </h2>
            <p className="text-xs text-slate-400 font-mono truncate">
              Loaded via iframe src: <span className="text-sky-400">{resolveIframeSrc(game.iframeSrc)}</span>
            </p>
          </div>
        </div>

        {/* Action icons */}
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={reloadGame}
            title="Reload game iframe"
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors focus:outline-none"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            onClick={() => onToggleFavorite(game.id, {})}
            title={isFavorite ? 'Remove favorite' : 'Add favorite'}
            className="p-2 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-lg transition-colors focus:outline-none"
          >
            <Heart
              className={`w-4 h-4 ${isFavorite ? 'fill-rose-500 text-rose-500' : ''}`}
            />
          </button>

          <button
            onClick={() => setIsTheater(!isTheater)}
            title={isTheater ? 'Exit theater mode' : 'Theater mode'}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors focus:outline-none"
          >
            {isTheater ? (
              <Minimize2 className="w-4 h-4 text-sky-400" />
            ) : (
              <Maximize2 className="w-4 h-4" />
            )}
          </button>

          <button
            onClick={toggleFullscreen}
            title="Full screen view"
            className="hidden sm:inline-flex p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors focus:outline-none"
          >
            <ExternalLink className="w-4 h-4" />
          </button>

          <button
            onClick={() => setShowJsonCode(!showJsonCode)}
            title="Inspect games.json iframe definition"
            className={`p-2 rounded-lg transition-colors focus:outline-none ${
              showJsonCode
                ? 'bg-sky-500/20 text-sky-400'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Code className="w-4 h-4" />
          </button>

          <button
            onClick={onClose}
            title="Close game player (Esc)"
            className="p-2 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-lg transition-colors ml-1 focus:outline-none"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Actual Iframe Game Container */}
      <div className="relative w-full bg-black aspect-[4/3] sm:aspect-[16/10] max-h-[70vh] flex items-center justify-center">
        <iframe
          key={iframeKey}
          ref={iframeRef}
          src={resolveIframeSrc(game.iframeSrc)}
          title={game.title}
          className="w-full h-full border-0"
          allow="fullscreen; autoplay; gamepad; pointer-lock"
          allowFullScreen
          loading="eager"
        />
      </div>

      {/* Player Footer & Controls Bar */}
      <div className="bg-slate-900/90 border-t border-slate-800 p-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          
          {/* Controls list */}
          <div className="flex-1">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-300 mb-2">
              <Keyboard className="w-4 h-4 text-sky-400" />
              <span>Game Controls</span>
            </div>
            
            {game.controls && game.controls.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {game.controls.map((ctrl, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-1.5 text-xs bg-slate-950 border border-slate-800 px-2.5 py-1 rounded-md"
                  >
                    <kbd className="font-mono text-sky-300 font-semibold">{ctrl.key}</kbd>
                    <span className="text-slate-400">·</span>
                    <span className="text-slate-300">{ctrl.action}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-400">
                Click inside the game window to focus. Use Arrow Keys, WASD, or Mouse.
              </p>
            )}
          </div>

          {/* Quick Info & JSON trigger */}
          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400">
            {game.iframeSrc?.includes('nite.games') && (
              <a
                href={`https://nite.games/game/${game.iframeSrc.split('/embed/')[1] || ''}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-sky-400 hover:text-sky-300 font-medium bg-sky-950/60 hover:bg-sky-900/60 px-2.5 py-1 rounded-md border border-sky-800/60 transition-colors"
              >
                <span>Play on Nite.Games</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
            <span className="font-mono tabular-nums">{game.plays.toLocaleString()} Plays</span>
            <span>·</span>
            <span className="text-amber-400 font-mono">★ {Number(game.rating).toFixed(2)}</span>
            <button
              onClick={() => setShowJsonCode(!showJsonCode)}
              className="text-sky-400 hover:text-sky-300 underline underline-offset-2 flex items-center gap-1"
            >
              <Info className="w-3.5 h-3.5" />
              <span>{showJsonCode ? 'Hide JSON Spec' : 'View Iframe JSON'}</span>
            </button>
          </div>

        </div>

        {/* Expandable JSON Schema Definition Accordion */}
        {showJsonCode && (
          <div className="mt-4 pt-4 border-t border-slate-800/80">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono font-medium text-slate-300 flex items-center gap-1.5">
                <Code className="w-3.5 h-3.5 text-sky-400" />
                games.json entry for &quot;{game.id}&quot;
              </span>
              <button
                onClick={copyIframeJson}
                className="flex items-center gap-1 text-xs text-slate-400 hover:text-white bg-slate-950 border border-slate-800 px-2.5 py-1 rounded-md transition-colors"
              >
                {copiedCode ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy JSON snippet</span>
                  </>
                )}
              </button>
            </div>

            <pre className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-[11px] font-mono text-sky-300 overflow-x-auto leading-relaxed">
              {JSON.stringify(
                {
                  id: game.id,
                  title: game.title,
                  category: game.category,
                  description: game.description,
                  iframeCode: game.iframeCode,
                  iframeSrc: game.iframeSrc,
                  rating: game.rating,
                  plays: game.plays,
                  controls: game.controls,
                },
                null,
                2
              )}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};
