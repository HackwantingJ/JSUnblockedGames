import React from 'react';
import {
  Gamepad2,
  Sparkles,
  Heart,
  Clock,
  Calculator as CalcIcon,
  ShieldAlert,
  Zap,
  PanelLeftClose,
  PanelLeft,
  Cookie,
  User,
  LogOut,
  Code2,
} from 'lucide-react';

export const Sidebar = ({
  activeView, // 'games' | 'ai'
  onSelectView,
  selectedTab,
  onSelectTab,
  gamesCount,
  favoritesCount,
  recentCount,
  isCollapsed,
  onToggleCollapse,
  onOpenCloak,
  onOpenTour,
  onTriggerPanic,
  onLock,
  user,
  onLogout,
}) => {
  return (
    <aside
      className={`fixed top-0 bottom-0 left-0 z-40 bg-[#0f080d] border-r border-[#24131d] flex flex-col justify-between transition-all duration-300 select-none ${
        isCollapsed ? 'w-18' : 'w-64'
      }`}
    >
      {/* Top Branding & Toggle */}
      <div>
        <div className="h-16 flex items-center justify-between px-4 border-b border-[#24131d]">
          {!isCollapsed ? (
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-9 h-9 rounded-2xl bg-[#ff5b79]/20 border border-[#ff5b79]/40 flex items-center justify-center shadow-lg shadow-[#ff5b79]/20 shrink-0">
                <Cookie className="w-5 h-5 text-[#ff5b79]" />
              </div>
              <div className="truncate">
                <span className="text-lg font-black tracking-tight text-white flex items-center gap-1.5">
                  <span>C00K13</span>
                  <span className="text-[9px] uppercase font-mono px-1 py-0.2 rounded bg-[#ff5b79]/20 text-[#ff5b79] border border-[#ff5b79]/30">
                    HUB
                  </span>
                </span>
              </div>
            </div>
          ) : (
            <div className="w-9 h-9 mx-auto rounded-2xl bg-[#ff5b79]/20 border border-[#ff5b79]/40 flex items-center justify-center shadow-lg shadow-[#ff5b79]/20">
              <Cookie className="w-5 h-5 text-[#ff5b79]" />
            </div>
          )}

          <button
            onClick={onToggleCollapse}
            title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            className={`p-1.5 text-slate-400 hover:text-white hover:bg-[#23121d] rounded-xl transition-colors focus:outline-none ${
              isCollapsed ? 'hidden' : 'block'
            }`}
          >
            <PanelLeftClose className="w-4 h-4" />
          </button>
        </div>

        {/* Primary Sidebar Menu Navigation */}
        <div className="p-3 space-y-1.5">
          {/* 1. Games Menu Item (with Game Icon) */}
          <button
            onClick={() => {
              onSelectView('games');
              onSelectTab('All');
            }}
            title="Browse Unblocked Games"
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-2xl font-bold text-xs transition-all ${
              activeView === 'games' && selectedTab === 'All'
                ? 'bg-[#ff5b79] text-white shadow-lg shadow-[#ff5b79]/25'
                : 'text-slate-300 hover:text-white hover:bg-[#1f1019]'
            }`}
          >
            <Gamepad2 className="w-5 h-5 shrink-0" />
            {!isCollapsed && (
              <div className="flex-1 flex items-center justify-between text-left">
                <span>Games</span>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-semibold ${
                    activeView === 'games' && selectedTab === 'All'
                      ? 'bg-black/30 text-white'
                      : 'bg-[#23121d] text-slate-400'
                  }`}
                >
                  {gamesCount}
                </span>
              </div>
            )}
          </button>

          {/* 2. CRUM3L AI Menu Item */}
          <button
            onClick={() => onSelectView('ai')}
            title="Ask CRUM3L AI (Gaming & Study Guide)"
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-2xl font-bold text-xs transition-all ${
              activeView === 'ai'
                ? 'bg-gradient-to-r from-[#ff5b79] to-[#d93858] text-white shadow-lg shadow-[#ff5b79]/25'
                : 'text-slate-300 hover:text-white hover:bg-[#1f1019]'
            }`}
          >
            <Sparkles className="w-5 h-5 text-[#ff5b79] group-hover:text-white shrink-0" />
            {!isCollapsed && (
              <div className="flex-1 flex items-center justify-between text-left">
                <span className="flex items-center gap-1.5">
                  <span>CRUM3L</span>
                  <span className="text-[9px] px-1 py-0.2 rounded bg-amber-400/20 text-amber-300 border border-amber-400/30 uppercase font-mono">
                    AI
                  </span>
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>
            )}
          </button>

          {/* 3. Favorites Quick Filter */}
          <button
            onClick={() => {
              onSelectView('games');
              onSelectTab('Favorites');
            }}
            title="Favorite Games"
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-2xl font-semibold text-xs transition-all ${
              activeView === 'games' && selectedTab === 'Favorites'
                ? 'bg-[#2b1422] text-[#ff5b79] border border-[#ff5b79]/40'
                : 'text-slate-400 hover:text-slate-200 hover:bg-[#1a0e16]'
            }`}
          >
            <Heart className="w-4 h-4 shrink-0 fill-[#ff5b79]/30 text-[#ff5b79]" />
            {!isCollapsed && (
              <div className="flex-1 flex items-center justify-between text-left">
                <span>Favorites</span>
                <span className="text-[10px] font-mono text-slate-500">
                  {favoritesCount}
                </span>
              </div>
            )}
          </button>

          {/* 4. Recent Quick Filter */}
          <button
            onClick={() => {
              onSelectView('games');
              onSelectTab('Recent');
            }}
            title="Recently Played"
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-2xl font-semibold text-xs transition-all ${
              activeView === 'games' && selectedTab === 'Recent'
                ? 'bg-[#2b1422] text-[#ff5b79] border border-[#ff5b79]/40'
                : 'text-slate-400 hover:text-slate-200 hover:bg-[#1a0e16]'
            }`}
          >
            <Clock className="w-4 h-4 shrink-0 text-sky-400" />
            {!isCollapsed && (
              <div className="flex-1 flex items-center justify-between text-left">
                <span>Recent</span>
                <span className="text-[10px] font-mono text-slate-500">
                  {recentCount}
                </span>
              </div>
            )}
          </button>

          {/* Divider */}
          <div className="pt-2 pb-1">
            <div className="h-px bg-[#24131d]" />
          </div>

          {/* Section: Stealth & Tools */}
          {!isCollapsed && (
            <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-500">
              Stealth &amp; Security
            </p>
          )}

          {/* 5. Stealth Calculator Lock */}
          <button
            onClick={onLock}
            title="Lock back to Calculator disguise (Code 6692)"
            className="w-full flex items-center gap-3 px-3 py-2 rounded-2xl text-xs font-medium text-slate-400 hover:text-white hover:bg-[#1a0e16] transition-all"
          >
            <CalcIcon className="w-4 h-4 text-[#ff5b79] shrink-0" />
            {!isCollapsed && <span>Calculator Lock</span>}
          </button>

          {/* 6. Tab Cloak */}
          <button
            onClick={onOpenCloak}
            title="Disguise tab as Google Classroom or Docs"
            className="w-full flex items-center gap-3 px-3 py-2 rounded-2xl text-xs font-medium text-slate-400 hover:text-white hover:bg-[#1a0e16] transition-all"
          >
            <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0" />
            {!isCollapsed && <span>Tab Cloaking</span>}
          </button>

          {/* 7. Welcome Tour */}
          <button
            onClick={onOpenTour}
            title="Open Welcome Tour"
            className="w-full flex items-center gap-3 px-3 py-2 rounded-2xl text-xs font-medium text-slate-400 hover:text-white hover:bg-[#1a0e16] transition-all"
          >
            <Sparkles className="w-4 h-4 text-sky-400 shrink-0" />
            {!isCollapsed && <span>Welcome Tour</span>}
          </button>

          {/* 8. Panic Button */}
          <button
            onClick={onTriggerPanic}
            title="Instant AP Biology disguise screen (Key: `)"
            className="w-full flex items-center gap-3 px-3 py-2 rounded-2xl text-xs font-bold text-rose-400 hover:text-rose-300 hover:bg-rose-950/40 transition-all"
          >
            <Zap className="w-4 h-4 shrink-0 fill-rose-500 text-rose-500" />
            {!isCollapsed && (
              <div className="flex-1 flex items-center justify-between text-left">
                <span>Panic Shield</span>
                <kbd className="px-1 text-[9px] bg-rose-950 rounded border border-rose-800 font-mono">
                  `
                </kbd>
              </div>
            )}
          </button>
        </div>
      </div>

      {/* Bottom Profile & Collapse Button */}
      <div className="p-3 border-t border-[#24131d] space-y-2">
        {user && !isCollapsed && (
          <div className="flex items-center justify-between p-2 rounded-2xl bg-[#190f16] border border-[#2d1b26]">
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-7 h-7 rounded-xl bg-[#ff5b79]/20 flex items-center justify-center text-[#ff5b79] shrink-0 font-bold text-xs uppercase">
                {user.username.charAt(0)}
              </div>
              <div className="truncate">
                <p className="text-xs font-bold text-white truncate leading-tight">
                  {user.username}
                </p>
                <p className="text-[10px] text-slate-500 truncate">Online</p>
              </div>
            </div>

            <button
              onClick={onLogout}
              title="Log out (require sign in next time)"
              className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-[#271321] rounded-lg transition-colors focus:outline-none"
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {isCollapsed && (
          <button
            onClick={onToggleCollapse}
            title="Expand sidebar"
            className="w-full flex items-center justify-center p-2 text-slate-400 hover:text-white hover:bg-[#23121d] rounded-2xl transition-colors"
          >
            <PanelLeft className="w-4 h-4" />
          </button>
        )}
      </div>
    </aside>
  );
};
