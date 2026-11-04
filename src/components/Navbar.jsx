import React from 'react';
import {
  Cookie,
  ShieldAlert,
  Code2,
  Plus,
  Calculator as CalcIcon,
  Sparkles,
  LogOut,
  User,
} from 'lucide-react';

export const Navbar = ({
  user,
  onOpenCloak,
  onOpenAddGame,
  onOpenJsonView,
  onOpenTour,
  onTriggerPanic,
  onLock,
  onLogout,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#0d070a]/90 backdrop-blur-md border-b border-[#24131d] px-4 sm:px-8 py-3 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        
        {/* Zone 1: C00K13 Brand Wordmark */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-2xl bg-[#ff5b79]/20 border border-[#ff5b79]/40 flex items-center justify-center shadow-lg shadow-[#ff5b79]/20">
            <Cookie className="w-5 h-5 text-[#ff5b79]" />
          </div>
          <div>
            <span className="text-xl font-extrabold tracking-tight text-white flex items-center gap-1.5">
              <span>C00K13</span>
              <span className="text-[10px] uppercase font-mono px-1.5 py-0.2 rounded-md bg-[#ff5b79]/20 text-[#ff5b79] border border-[#ff5b79]/30">
                PRO
              </span>
            </span>
          </div>
        </div>

        {/* Zone 2: Navigation & Action Tools */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          {/* Welcome Tour Trigger */}
          <button
            onClick={onOpenTour}
            title="Launch C00K13 Welcome Tour"
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#ff5b79] bg-[#ff5b79]/10 hover:bg-[#ff5b79]/20 border border-[#ff5b79]/30 rounded-xl transition-all shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Tour</span>
          </button>

          {/* Tab Cloak */}
          <button
            onClick={onOpenCloak}
            title="Disguise tab as Google Classroom or Docs"
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 bg-[#160d13] hover:bg-[#23151f] border border-[#2b1722] rounded-xl transition-colors"
          >
            <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden md:inline">Cloak Tab</span>
          </button>

          {/* Add Custom Game */}
          <button
            onClick={onOpenAddGame}
            title="Embed custom iframe game"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 bg-[#160d13] hover:bg-[#23151f] border border-[#2b1722] rounded-xl transition-colors"
          >
            <Plus className="w-3.5 h-3.5 text-emerald-400" />
            <span>Add Game</span>
          </button>

          {/* Stealth Calculator Lock */}
          <button
            onClick={onLock}
            title="Lock back to Calculator disguise (Code: 6692)"
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 bg-[#160d13] hover:bg-[#23151f] border border-[#2b1722] rounded-xl transition-colors"
          >
            <CalcIcon className="w-3.5 h-3.5 text-[#ff5b79]" />
            <span className="hidden md:inline">Calculator</span>
          </button>

          {/* User Profile & Logout */}
          {user && (
            <div className="flex items-center gap-1.5 pl-1 border-l border-[#2b1722]">
              <div
                className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 text-xs text-slate-300 bg-[#190f16] rounded-xl border border-[#2b1722]"
                title={`Signed in as ${user.username}`}
              >
                <User className="w-3.5 h-3.5 text-[#ff5b79]" />
                <span className="font-semibold text-white max-w-[90px] truncate">
                  {user.username}
                </span>
              </div>

              <button
                onClick={onLogout}
                title="Log out (require sign in next time)"
                className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-[#23121d] rounded-xl transition-colors"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Panic Emergency Key */}
          <button
            onClick={onTriggerPanic}
            title="Emergency AP Biology notes screen (Key: ` or Panic)"
            className="px-3.5 py-1.5 text-xs font-bold text-white bg-rose-600 hover:bg-rose-500 rounded-xl transition-all shadow-md shadow-rose-900/30 whitespace-nowrap shrink-0 flex items-center gap-1.5"
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
