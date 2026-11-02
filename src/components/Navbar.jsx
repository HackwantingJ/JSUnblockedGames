import React from 'react';
import { Gamepad2, ShieldAlert, Code2, Plus } from 'lucide-react';

export const Navbar = ({
  activeCategory,
  onSelectCategory,
  onOpenCloak,
  onOpenAddGame,
  onOpenJsonView,
  onTriggerPanic,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-slate-950/85 backdrop-blur-md border-b border-slate-800/80 px-4 sm:px-8 py-3.5 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-6">
        
        {/* Zone 1: Single brand wordmark */}
        <button
          onClick={() => onSelectCategory('All')}
          className="flex items-center gap-2.5 text-left group whitespace-nowrap shrink-0 focus:outline-none"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-sky-500/20 group-hover:scale-105 transition-transform">
            <Gamepad2 className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="text-lg font-bold tracking-tight text-white group-hover:text-sky-400 transition-colors">
              Vault Arcade
            </span>
          </div>
        </button>

        {/* Zone 2: Concise text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300">
          {['All', 'Arcade', 'Puzzle', 'Action', 'Strategy', 'Classic'].map((cat) => (
            <button
              key={cat}
              onClick={() => onSelectCategory(cat)}
              className={`hover:text-white transition-colors whitespace-nowrap shrink-0 relative py-1 ${
                activeCategory === cat ? 'text-sky-400 font-semibold' : 'text-slate-400'
              }`}
            >
              {cat === 'All' ? 'All Games' : cat}
              {activeCategory === cat && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-sky-400 rounded-full" />
              )}
            </button>
          ))}
        </nav>

        {/* Zone 3: Functional Actions & Panic Switch */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={onOpenJsonView}
            title="Inspect games.json database"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 bg-slate-900 border border-slate-800 rounded-lg hover:bg-slate-800 hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            <Code2 className="w-3.5 h-3.5 text-sky-400" />
            <span>games.json</span>
          </button>

          <button
            onClick={onOpenAddGame}
            title="Embed custom iframe game"
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 bg-slate-900 border border-slate-800 rounded-lg hover:bg-slate-800 hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            <Plus className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden sm:inline">Add Game</span>
          </button>

          <button
            onClick={onOpenCloak}
            title="Disguise tab & stealth settings"
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 bg-slate-900 border border-slate-800 rounded-lg hover:bg-slate-800 hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Cloak Tab</span>
          </button>

          <button
            onClick={onTriggerPanic}
            title="Emergency disguise screen (Key: ` or Panic)"
            className="px-3.5 py-1.5 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-500 rounded-lg transition-colors shadow-sm shadow-rose-900/30 whitespace-nowrap shrink-0 flex items-center gap-1.5"
          >
            <span>Panic</span>
            <kbd className="hidden md:inline-block px-1 py-0.2 text-[10px] bg-rose-700 rounded border border-rose-500/40 font-mono">
              `
            </kbd>
          </button>
        </div>

      </div>
    </header>
  );
};
