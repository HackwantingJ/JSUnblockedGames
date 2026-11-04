import React from 'react';
import {
  Cookie,
  ShieldAlert,
  Plus,
  Calculator as CalcIcon,
  Sparkles,
  LogOut,
  User,
  Gamepad2,
  Menu,
  MessageSquare,
  Globe,
  Link2,
} from 'lucide-react';

export const Navbar = ({
  user,
  activeView, // 'games' | 'ai' | 'chat' | 'browser'
  onSelectView,
  onToggleSidebar,
  onOpenCloak,
  onOpenCustomLink,
  onOpenAddGame,
  onOpenTour,
  onTriggerPanic,
  onLock,
  onLogout,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-[#0d070a]/90 backdrop-blur-md border-b border-[#24131d] px-4 sm:px-6 py-2.5 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        
        {/* Left: Sidebar Toggle & Brand */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleSidebar}
            title="Toggle Sidebar Menu"
            className="p-2 text-slate-400 hover:text-white hover:bg-[#1f1019] rounded-xl transition-colors focus:outline-none"
          >
            <Menu className="w-5 h-5 text-slate-300" />
          </button>

          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#ff5b79]/20 border border-[#ff5b79]/40 flex items-center justify-center shadow-md shadow-[#ff5b79]/20">
              <Cookie className="w-4 h-4 text-[#ff5b79]" />
            </div>
            <span className="text-lg font-black tracking-tight text-white hidden sm:flex items-center gap-1.5">
              <span>C00K13</span>
              <span className="text-[9px] uppercase font-mono px-1.5 py-0.2 rounded-md bg-[#ff5b79]/20 text-[#ff5b79] border border-[#ff5b79]/30">
                PRO
              </span>
            </span>
          </div>

          {/* Quick View Switcher Pills */}
          <div className="flex items-center gap-1 bg-[#160d13] border border-[#2b1722] p-1 rounded-2xl ml-1 sm:ml-4">
            <button
              onClick={() => onSelectView('games')}
              className={`flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded-xl transition-all ${
                activeView === 'games'
                  ? 'bg-[#ff5b79] text-white shadow-md shadow-[#ff5b79]/20'
                  : 'text-slate-400 hover:text-white hover:bg-[#22121c]'
              }`}
            >
              <Gamepad2 className="w-3.5 h-3.5" />
              <span>Games</span>
            </button>

            <button
              onClick={() => onSelectView('ai')}
              className={`flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded-xl transition-all ${
                activeView === 'ai'
                  ? 'bg-[#ff5b79] text-white shadow-md shadow-[#ff5b79]/20'
                  : 'text-slate-400 hover:text-white hover:bg-[#22121c]'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>CRUM3L</span>
            </button>

            <button
              onClick={() => onSelectView('chat')}
              className={`flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded-xl transition-all ${
                activeView === 'chat'
                  ? 'bg-[#ff5b79] text-white shadow-md shadow-[#ff5b79]/20'
                  : 'text-slate-400 hover:text-white hover:bg-[#22121c]'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5 text-indigo-400" />
              <span>Chat</span>
              <span className="text-[9px] px-1 py-0.2 rounded bg-indigo-500/20 text-indigo-300 font-mono">13+</span>
            </button>

            <button
              onClick={() => onSelectView('browser')}
              className={`flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded-xl transition-all ${
                activeView === 'browser'
                  ? 'bg-[#de5833] text-white shadow-md shadow-[#de5833]/20'
                  : 'text-slate-400 hover:text-white hover:bg-[#22121c]'
              }`}
              title="c00k13 search - DuckDuckGo Proxy"
            >
              <Globe className="w-3.5 h-3.5 text-orange-400" />
              <span>Search</span>
            </button>
          </div>
        </div>

        {/* Right: Tools & Actions */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Welcome Tour */}
          <button
            onClick={onOpenTour}
            title="Launch C00K13 Welcome Tour"
            className="hidden md:flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold text-[#ff5b79] bg-[#ff5b79]/10 hover:bg-[#ff5b79]/20 border border-[#ff5b79]/30 rounded-xl transition-all"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Tour</span>
          </button>

          {/* Custom Link Generator */}
          <button
            onClick={onOpenCustomLink}
            title="Create Custom Link (Direct URL, PIN Bypass & GitHub Pages)"
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold text-[#ff5b79] bg-[#ff5b79]/10 hover:bg-[#ff5b79]/20 border border-[#ff5b79]/30 rounded-xl transition-all"
          >
            <Link2 className="w-3.5 h-3.5" />
            <span>Custom Link</span>
          </button>

          {/* Tab Cloak */}
          <button
            onClick={onOpenCloak}
            title="Disguise tab as Google Classroom or Docs"
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-300 bg-[#160d13] hover:bg-[#23151f] border border-[#2b1722] rounded-xl transition-colors"
          >
            <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Cloak</span>
          </button>

          {/* Calculator Lock */}
          <button
            onClick={onLock}
            title="Lock back to Calculator disguise (Code: 1865)"
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-300 bg-[#160d13] hover:bg-[#23151f] border border-[#2b1722] rounded-xl transition-colors"
          >
            <CalcIcon className="w-3.5 h-3.5 text-[#ff5b79]" />
            <span className="hidden md:inline">Calculator</span>
          </button>

          {/* Add Game */}
          <button
            onClick={onOpenAddGame}
            title="Embed custom iframe game"
            className="hidden lg:flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-300 bg-[#160d13] hover:bg-[#23151f] border border-[#2b1722] rounded-xl transition-colors"
          >
            <Plus className="w-3.5 h-3.5 text-emerald-400" />
            <span>Add</span>
          </button>

          {/* User Profile & Logout */}
          {user && (
            <div className="flex items-center gap-1 pl-1 border-l border-[#2b1722]">
              <div
                className="hidden xl:flex items-center gap-1.5 px-2.5 py-1 text-xs text-slate-300 bg-[#190f16] rounded-xl border border-[#2b1722]"
                title={`Signed in as ${user.username}`}
              >
                <User className="w-3 h-3 text-[#ff5b79]" />
                <span className="font-semibold text-white max-w-[80px] truncate">
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
            className="px-3 py-1.5 text-xs font-bold text-white bg-rose-600 hover:bg-rose-500 rounded-xl transition-all shadow-md shadow-rose-900/30 whitespace-nowrap shrink-0 flex items-center gap-1.5"
          >
            <span>Panic</span>
            <kbd className="hidden sm:inline-block px-1 py-0.2 text-[10px] bg-rose-700 rounded border border-rose-500/40 font-mono">
              `
            </kbd>
          </button>
        </div>

      </div>
    </header>
  );
};
