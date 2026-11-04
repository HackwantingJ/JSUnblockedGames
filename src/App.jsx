import React, { useState, useEffect, useMemo } from 'react';
import {
  Search,
  Shuffle,
  Gamepad2,
  Trophy,
  Heart,
  Clock,
  Sparkles,
  ChevronDown,
  X,
  Code2,
  ExternalLink,
  Bot,
} from 'lucide-react';
import { DEFAULT_GAMES_DATA } from './data/defaultGames.js';
import { Navbar } from './components/Navbar.jsx';
import { Sidebar } from './components/Sidebar.jsx';
import { GameCard } from './components/GameCard.jsx';
import { GamePlayer } from './components/GamePlayer.jsx';
import { Crum3lAI } from './components/Crum3lAI.jsx';
import { AddGameModal } from './components/AddGameModal.jsx';
import { JsonViewerModal } from './components/JsonViewerModal.jsx';
import { TabCloakModal } from './components/TabCloakModal.jsx';
import { PanicScreen } from './components/PanicScreen.jsx';
import { Calculator } from './components/Calculator.jsx';
import { AuthScreen } from './components/AuthScreen.jsx';
import { WelcomeTour } from './components/WelcomeTour.jsx';
import { DiscordChat } from './components/DiscordChat.jsx';
import { ProxyBrowser } from './components/ProxyBrowser.jsx';
import { CustomLinkModal } from './components/CustomLinkModal.jsx';

export default function App() {
  // 1. Stealth Calculator Gate (default locked)
  const [isUnlocked, setIsUnlocked] = useState(false);

  // 2. Authentication Gate (user must log in each session)
  const [sessionUser, setSessionUser] = useState(() => {
    try {
      const active = sessionStorage.getItem('c00k13_session_user');
      return active ? JSON.parse(active) : null;
    } catch {
      return null;
    }
  });

  // 3. Navigation View Mode: 'games' | 'ai'
  const [activeView, setActiveView] = useState('games');

  // 4. Sidebar collapse state
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(() => {
    return window.innerWidth < 1024;
  });

  // 5. Welcome Tour Modal state
  const [isTourOpen, setIsTourOpen] = useState(false);

  // 6. Games catalog state
  const [games, setGames] = useState(() => {
    try {
      const savedCustom = localStorage.getItem('c00k13_games_custom');
      if (savedCustom) {
        const customItems = JSON.parse(savedCustom);
        return [...DEFAULT_GAMES_DATA.games, ...customItems];
      }
    } catch (e) {
      console.error('Failed to parse custom games', e);
    }
    return DEFAULT_GAMES_DATA.games;
  });

  // 7. Active Game in Iframe Player
  const [activeGame, setActiveGame] = useState(null);

  // 8. Favorites
  const [favorites, setFavorites] = useState(() => {
    try {
      const savedFavs = localStorage.getItem('c00k13_favorites');
      return savedFavs ? JSON.parse(savedFavs) : ['minecraft', 'cuphead', 'game-2048'];
    } catch {
      return ['minecraft', 'cuphead'];
    }
  });

  // 9. Recent Played Games tracking
  const [recentGames, setRecentGames] = useState(() => {
    try {
      const saved = localStorage.getItem('c00k13_recent');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // 10. Filters & Search toolbar states
  const [selectedTab, setSelectedTab] = useState('All'); // 'All' | 'Favorites' | 'Recent' | 'Action' | etc.
  const [searchQuery, setSearchQuery] = useState('');
  const [libraryFilter, setLibraryFilter] = useState('all'); // 'all' | '3d' | 'classic'
  const [isLibraryMenuOpen, setIsLibraryMenuOpen] = useState(false);
  const [showAnnouncement, setShowAnnouncement] = useState(() => {
    try {
      return localStorage.getItem('c00k13_announcement_dismissed') !== 'true';
    } catch {
      return true;
    }
  });

  // 11. Stealth & Utility Modals
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isJsonOpen, setIsJsonOpen] = useState(false);
  const [isCloakOpen, setIsCloakOpen] = useState(false);
  const [isCustomLinkOpen, setIsCustomLinkOpen] = useState(false);
  const [isPanicActive, setIsPanicActive] = useState(false);
  const [activeCloakId, setActiveCloakId] = useState('default');

  // Deep Link URL Query Parameter Handler (Custom links e.g. ?pass=6692&game=minecraft&view=browser)
  useEffect(() => {
    try {
      const searchParams = new URLSearchParams(window.location.search);
      const pass = searchParams.get('pass') || searchParams.get('unlock');
      const gameParam = searchParams.get('game');
      const viewParam = searchParams.get('view');

      // 1. Auto-unlock if PIN 1865 is provided in the custom link
      if (pass === '1865' || pass === '6692' || pass === 'true') {
        setIsUnlocked(true);
      }

      // 2. Direct view switcher
      if (viewParam === 'browser' || viewParam === 'ai' || viewParam === 'chat' || viewParam === 'games') {
        setActiveView(viewParam);
      }

      // 3. Direct game launcher
      if (gameParam && games?.length) {
        const found = games.find(
          (g) =>
            g.id.toLowerCase() === gameParam.toLowerCase() ||
            g.title.toLowerCase().replace(/\s+/g, '-') === gameParam.toLowerCase()
        );
        if (found) {
          setActiveGame(found);
        }
      }
    } catch (e) {
      console.error('Failed to parse deep link parameters', e);
    }
  }, [games]);

  // Sync tab title & favicon based on locked vs unlocked
  useEffect(() => {
    if (!isUnlocked) {
      document.title = 'Calculator - Standard & Scientific';
      let link = document.querySelector("link[rel*='icon']");
      if (link) {
        link.href =
          'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23475569"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 4v2H7V7h10zm-8 4h2v2H9v-2zm-2 0H5v-2h2v2zm0 4H5v-2h2v2zm0 4H5v-2h2v2zm4 0H9v-2h2v2zm0-4H9v-2h2v2zm4 4h-2v-6h2v6zm4 0h-2v-2h2v2zm0-4h-2v-2h2v2z"/></svg>';
      }
    } else {
      document.title =
        activeView === 'browser'
          ? 'c00k13 search - DuckDuckGo Proxy'
          : activeView === 'ai'
          ? 'C00K13 - CRUM3L AI'
          : activeView === 'chat'
          ? 'C00K13 - Discord Lounge (13+)'
          : 'C00K13 - Games';
      let link = document.querySelector("link[rel*='icon']");
      if (link) {
        link.href = './favicon.svg';
      }
    }
  }, [isUnlocked, activeView]);

  // Update user age verification (e.g. from 13+ chat gate)
  const handleUpdateUserAge = (is13Plus) => {
    if (!sessionUser) return;
    const updatedUser = { ...sessionUser, is13OrOlder: is13Plus };
    setSessionUser(updatedUser);
    try {
      sessionStorage.setItem('c00k13_session_user', JSON.stringify(updatedUser));
      const raw = localStorage.getItem('c00k13_users');
      if (raw) {
        const users = JSON.parse(raw);
        const nextUsers = users.map((u) =>
          u.username.toLowerCase() === sessionUser.username.toLowerCase()
            ? { ...u, is13OrOlder: is13Plus }
            : u
        );
        localStorage.setItem('c00k13_users', JSON.stringify(nextUsers));
      }
    } catch {}
  };

  // Unlock Calculator
  const handleUnlock = () => {
    setIsUnlocked(true);
  };

  // Lock back to Calculator
  const handleLock = () => {
    setIsUnlocked(false);
    setActiveGame(null);
  };

  // Auth Success (sign in or sign up)
  const handleAuthSuccess = (user, isNewRegistration) => {
    setSessionUser(user);
    try {
      sessionStorage.setItem('c00k13_session_user', JSON.stringify(user));
    } catch (e) {
      console.error('Session store error', e);
    }
    // Launch tour on first sign-up or if requested
    if (isNewRegistration) {
      setIsTourOpen(true);
    }
  };

  // Logout (requires user to log in next time)
  const handleLogout = () => {
    setSessionUser(null);
    try {
      sessionStorage.removeItem('c00k13_session_user');
    } catch {}
  };

  // Launch a game and update recents
  const handlePlayGame = (game) => {
    setActiveGame(game);
    setActiveView('games');
    setRecentGames((prev) => {
      const updated = [game.id, ...prev.filter((id) => id !== game.id)].slice(0, 20);
      try {
        localStorage.setItem('c00k13_recent', JSON.stringify(updated));
      } catch {}
      return updated;
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Toggle favorite
  const toggleFavorite = (id, e) => {
    if (e && e.stopPropagation) e.stopPropagation();
    setFavorites((prev) => {
      const next = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      try {
        localStorage.setItem('c00k13_favorites', JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  // Launch random game
  const handleRandomGame = () => {
    if (games.length === 0) return;
    const randomIndex = Math.floor(Math.random() * games.length);
    handlePlayGame(games[randomIndex]);
  };

  // Add custom game
  const handleAddGame = (newGame) => {
    setGames((prev) => {
      const updated = [newGame, ...prev];
      const customOnly = updated.filter((g) => g.isCustom);
      try {
        localStorage.setItem('c00k13_games_custom', JSON.stringify(customOnly));
      } catch {}
      return updated;
    });
    handlePlayGame(newGame);
  };

  // Dismiss announcement banner
  const dismissAnnouncement = () => {
    setShowAnnouncement(false);
    try {
      localStorage.setItem('c00k13_announcement_dismissed', 'true');
    } catch {}
  };

  // Tab cloaking
  const handleSelectCloak = (preset) => {
    setActiveCloakId(preset.id);
    document.title = preset.title;
    let link = document.querySelector("link[rel*='icon']");
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.head.appendChild(link);
    }
    link.href = preset.iconUrl;
  };

  // Panic listener (` or Tilde)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === '`' || e.key === '~') {
        e.preventDefault();
        setIsPanicActive((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Filtered games
  const filteredGames = useMemo(() => {
    return games.filter((game) => {
      // Tab filter
      if (selectedTab === 'Favorites') {
        if (!favorites.includes(game.id)) return false;
      } else if (selectedTab === 'Recent') {
        if (!recentGames.includes(game.id)) return false;
      } else if (selectedTab !== 'All' && game.category !== selectedTab) {
        return false;
      }

      // Library dropdown filter
      if (libraryFilter === '3d') {
        const is3D =
          game.tags?.includes('3D') ||
          game.tags?.includes('FPS') ||
          game.iframeSrc?.includes('nite.games');
        if (!is3D) return false;
      } else if (libraryFilter === 'classic') {
        const isLocal = game.iframeSrc?.includes('./games/');
        if (!isLocal) return false;
      }

      // Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchTitle = game.title.toLowerCase().includes(q);
        const matchDesc = game.description.toLowerCase().includes(q);
        const matchCat = game.category.toLowerCase().includes(q);
        const matchTag = game.tags?.some((t) => t.toLowerCase().includes(q));
        return matchTitle || matchDesc || matchCat || matchTag;
      }

      return true;
    });
  }, [games, selectedTab, libraryFilter, searchQuery, favorites, recentGames]);

  // Stage 1: Calculator Disguise
  if (!isUnlocked) {
    return <Calculator onUnlock={handleUnlock} />;
  }

  // Stage 2: Session Authentication (Sign In / Sign Up)
  if (!sessionUser) {
    return (
      <AuthScreen
        onAuthSuccess={handleAuthSuccess}
        onLockToCalculator={handleLock}
      />
    );
  }

  // Stage 3: Panic Emergency screen
  if (isPanicActive) {
    return <PanicScreen onDismiss={() => setIsPanicActive(false)} />;
  }

  // Stage 4: Unlocked C00K13 Experience with Sidebar & CRUM3L AI
  return (
    <div className="min-h-screen bg-[#0d070a] text-slate-100 flex flex-col antialiased selection:bg-[#ff5b79]/30 selection:text-[#ff5b79]">
      {/* Left Sidebar Menu */}
      <Sidebar
        activeView={activeView}
        onSelectView={(v) => {
          setActiveView(v);
          if (v === 'ai' && activeGame) {
            // Keep game active in background
          }
        }}
        selectedTab={selectedTab}
        onSelectTab={(tab) => {
          setSelectedTab(tab);
          setActiveView('games');
        }}
        gamesCount={games.length}
        favoritesCount={favorites.length}
        recentCount={recentGames.length}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed((prev) => !prev)}
        onOpenCloak={() => setIsCloakOpen(true)}
        onOpenCustomLink={() => setIsCustomLinkOpen(true)}
        onOpenTour={() => setIsTourOpen(true)}
        onTriggerPanic={() => setIsPanicActive(true)}
        onLock={handleLock}
        user={sessionUser}
        onLogout={handleLogout}
      />

      {/* Main Content Area offset by Sidebar */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          isSidebarCollapsed ? 'pl-18' : 'pl-64'
        }`}
      >
        {/* Top Navigation */}
        <Navbar
          user={sessionUser}
          activeView={activeView}
          onSelectView={setActiveView}
          onToggleSidebar={() => setIsSidebarCollapsed((prev) => !prev)}
          onOpenCloak={() => setIsCloakOpen(true)}
          onOpenCustomLink={() => setIsCustomLinkOpen(true)}
          onOpenAddGame={() => setIsAddOpen(true)}
          onOpenTour={() => setIsTourOpen(true)}
          onTriggerPanic={() => setIsPanicActive(true)}
          onLock={handleLock}
          onLogout={handleLogout}
        />

        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-5">
          {/* Active Iframe Game Player if a game is selected */}
          {activeGame && activeView === 'games' && (
            <div className="mb-6">
              <GamePlayer
                game={activeGame}
                isFavorite={favorites.includes(activeGame.id)}
                onClose={() => setActiveGame(null)}
                onToggleFavorite={toggleFavorite}
              />
            </div>
          )}

          {/* VIEW A: C00K13 Search - DuckDuckGo Proxy Browser */}
          {activeView === 'browser' ? (
            <div className="animate-in fade-in duration-200">
              <ProxyBrowser />
            </div>
          ) : activeView === 'ai' ? (
            /* VIEW B: CRUM3L AI Screen */
            <div className="animate-in fade-in duration-200">
              <Crum3lAI
                onLaunchGame={handlePlayGame}
                activeGameTitle={activeGame?.title}
                username={sessionUser?.username || 'Player'}
              />
            </div>
          ) : activeView === 'chat' ? (
            /* VIEW B: Discord-Style Community Lounge (13+) */
            <div className="animate-in fade-in duration-200">
              <DiscordChat
                user={sessionUser}
                onUpdateUserAge={handleUpdateUserAge}
                onSwitchToGames={() => setActiveView('games')}
              />
            </div>
          ) : (
            /* VIEW C: Cherri-Style Games View */
            <div className="animate-in fade-in duration-200">
              {/* Games Header Bar */}
              <section className="mb-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3.5 py-2">
                  
                  {/* Left: Games heading */}
                  <div className="flex items-center gap-2.5">
                    <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white flex items-center gap-2">
                      <span>Games</span>
                      <Gamepad2 className="w-5 h-5 text-slate-400 inline" />
                      <Trophy className="w-4 h-4 text-amber-400 inline" />
                    </h1>
                  </div>

                  {/* Middle: Rounded Search Bar */}
                  <div className="relative flex-1 max-w-md">
                    <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search games"
                      className="w-full pl-10 pr-4 py-2 bg-[#170e14] border border-[#2d1b26] focus:border-[#ff5b79] focus:ring-1 focus:ring-[#ff5b79] rounded-2xl text-xs sm:text-sm text-white placeholder-slate-500 transition-colors outline-none"
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery('')}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  {/* Right: Library Dropdown, Ask CRUM3L shortcut, Random, & Count */}
                  <div className="flex items-center gap-2 self-end md:self-auto shrink-0">
                    {/* Ask CRUM3L button */}
                    <button
                      onClick={() => setActiveView('ai')}
                      className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-[#ff5b79]/15 hover:bg-[#ff5b79]/25 border border-[#ff5b79]/40 rounded-xl text-xs font-bold text-[#ff5b79] transition-all"
                      title="Ask CRUM3L AI about any game"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                      <span>Ask CRUM3L</span>
                    </button>

                    {/* Library Dropdown */}
                    <div className="relative">
                      <button
                        onClick={() => setIsLibraryMenuOpen(!isLibraryMenuOpen)}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-[#170e14] hover:bg-[#23151f] border border-[#2d1b26] rounded-xl text-xs font-medium text-slate-300 transition-colors"
                      >
                        <span>
                          {libraryFilter === '3d'
                            ? '3D Embeds'
                            : libraryFilter === 'classic'
                            ? 'Retro HTML'
                            : 'Library'}
                        </span>
                        <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                      </button>

                      {isLibraryMenuOpen && (
                        <div className="absolute right-0 mt-1.5 w-40 bg-[#160d13] border border-[#2d1b26] rounded-xl shadow-2xl py-1 z-30 animate-in fade-in zoom-in-95">
                          <button
                            onClick={() => {
                              setLibraryFilter('all');
                              setIsLibraryMenuOpen(false);
                            }}
                            className="w-full text-left px-3 py-1.5 text-xs text-slate-300 hover:text-white hover:bg-[#251520] transition-colors"
                          >
                            All Library
                          </button>
                          <button
                            onClick={() => {
                              setLibraryFilter('3d');
                              setIsLibraryMenuOpen(false);
                            }}
                            className="w-full text-left px-3 py-1.5 text-xs text-slate-300 hover:text-white hover:bg-[#251520] transition-colors"
                          >
                            3D &amp; Embeds
                          </button>
                          <button
                            onClick={() => {
                              setLibraryFilter('classic');
                              setIsLibraryMenuOpen(false);
                            }}
                            className="w-full text-left px-3 py-1.5 text-xs text-slate-300 hover:text-white hover:bg-[#251520] transition-colors"
                          >
                            Offline Retro HTML
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Random Button */}
                    <button
                      onClick={handleRandomGame}
                      title="Play a random game"
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-[#170e14] hover:bg-[#23151f] border border-[#2d1b26] rounded-xl text-xs font-medium text-slate-300 hover:text-white transition-colors"
                    >
                      <Shuffle className="w-3.5 h-3.5 text-[#ff5b79]" />
                      <span>Random</span>
                    </button>

                    {/* Counter Pill */}
                    <span className="font-mono text-xs text-slate-400 px-2.5 py-1 bg-[#170e14] border border-[#2d1b26] rounded-xl tabular-nums">
                      {filteredGames.length} of {games.length}
                    </span>
                  </div>

                </div>
              </section>

              {/* Announcement Banner */}
              {showAnnouncement && (
                <div className="mb-5 p-3.5 sm:p-4 rounded-2xl bg-[#1d0e17] border border-[#3b192c] flex items-start justify-between gap-3 shadow-lg animate-in fade-in">
                  <div className="space-y-1">
                    <h2 className="text-xs sm:text-sm font-bold text-white tracking-tight flex items-center gap-1.5">
                      <span>The legacy library has been upgraded to C00K13</span>
                    </h2>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      C00K13 features a curated high-speed arcade catalog, 3D pointer-lock mouse controls, and the new <strong>CRUM3L AI assistant</strong>.{' '}
                      <button
                        onClick={() => setActiveView('ai')}
                        className="text-[#ff5b79] hover:underline font-semibold"
                      >
                        Ask CRUM3L AI a question &rarr;
                      </button>
                    </p>
                  </div>
                  <button
                    onClick={dismissAnnouncement}
                    className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors focus:outline-none shrink-0"
                    title="Dismiss announcement"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* Filter Tabs Row */}
              <section className="mb-6 flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar text-xs">
                {/* All Tab */}
                <button
                  onClick={() => setSelectedTab('All')}
                  className={`px-3.5 py-1.5 rounded-xl font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                    selectedTab === 'All'
                      ? 'bg-[#ff5b79] text-white shadow-md shadow-[#ff5b79]/20'
                      : 'bg-[#170e14] border border-[#2d1b26] text-slate-400 hover:text-slate-200 hover:bg-[#23151f]'
                  }`}
                >
                  <Gamepad2 className="w-3.5 h-3.5" />
                  <span>All</span>
                  <span className="font-mono text-[11px] opacity-80">{games.length}</span>
                </button>

                {/* Favorites Tab */}
                <button
                  onClick={() => setSelectedTab('Favorites')}
                  className={`px-3.5 py-1.5 rounded-xl font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                    selectedTab === 'Favorites'
                      ? 'bg-[#ff5b79] text-white shadow-md shadow-[#ff5b79]/20'
                      : 'bg-[#170e14] border border-[#2d1b26] text-slate-400 hover:text-slate-200 hover:bg-[#23151f]'
                  }`}
                >
                  <Heart className="w-3.5 h-3.5" />
                  <span>Favorites</span>
                  <span className="font-mono text-[11px] opacity-80">{favorites.length}</span>
                </button>

                {/* Recent Tab */}
                <button
                  onClick={() => setSelectedTab('Recent')}
                  className={`px-3.5 py-1.5 rounded-xl font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                    selectedTab === 'Recent'
                      ? 'bg-[#ff5b79] text-white shadow-md shadow-[#ff5b79]/20'
                      : 'bg-[#170e14] border border-[#2d1b26] text-slate-400 hover:text-slate-200 hover:bg-[#23151f]'
                  }`}
                >
                  <Clock className="w-3.5 h-3.5" />
                  <span>Recent</span>
                  <span className="font-mono text-[11px] opacity-80">{recentGames.length}</span>
                </button>

                {/* Category Chips */}
                {['Action', 'Arcade', 'Strategy', 'Puzzle', 'Classic'].map((cat) => {
                  const isSelected = selectedTab === cat;
                  const count = games.filter((g) => g.category === cat).length;
                  return (
                    <button
                      key={cat}
                      onClick={() => setSelectedTab(cat)}
                      className={`px-3 py-1.5 rounded-xl font-medium whitespace-nowrap transition-all flex items-center gap-1.5 ${
                        isSelected
                          ? 'bg-[#ff5b79] text-white shadow-md shadow-[#ff5b79]/20'
                          : 'bg-[#170e14] border border-[#2d1b26] text-slate-400 hover:text-slate-200 hover:bg-[#23151f]'
                      }`}
                    >
                      <span>{cat}</span>
                      <span className="font-mono text-[10px] opacity-70">{count}</span>
                    </button>
                  );
                })}
              </section>

              {/* Cherri Squircle Games Grid */}
              {filteredGames.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 2xl:grid-cols-8 gap-3 sm:gap-4">
                  {filteredGames.map((game) => (
                    <GameCard
                      key={game.id}
                      game={game}
                      isFavorite={favorites.includes(game.id)}
                      onPlay={handlePlayGame}
                      onToggleFavorite={toggleFavorite}
                    />
                  ))}
                </div>
              ) : (
                <div className="py-20 text-center rounded-3xl border border-[#2d1b26] bg-[#140c12]/60 p-6">
                  <Gamepad2 className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                  <h3 className="text-base font-bold text-white mb-1">No Games Found</h3>
                  <p className="text-xs text-slate-400 max-w-sm mx-auto mb-4">
                    We couldn&apos;t find any games matching &quot;{searchQuery}&quot; in {selectedTab}.
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedTab('All');
                      setLibraryFilter('all');
                    }}
                    className="px-4 py-2 bg-[#ff5b79] hover:bg-[#ff4365] text-xs font-bold text-white rounded-xl transition-all"
                  >
                    Reset Filters
                  </button>
                </div>
              )}
            </div>
          )}
        </main>

        {/* Footer */}
        <footer className="mt-16 border-t border-[#23121d] bg-[#090507] py-6 px-4 text-center text-xs text-slate-500">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-300">C00K13</span>
              <span>·</span>
              <span>Fast Unblocked Arcade &amp; CRUM3L AI</span>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs">
              <button
                onClick={() => setActiveView('browser')}
                className="hover:text-[#de5833] text-[#de5833]/90 font-medium transition-colors"
              >
                c00k13 search
              </button>
              <button
                onClick={() => setActiveView('ai')}
                className="hover:text-[#ff5b79] text-[#ff5b79]/90 font-medium transition-colors"
              >
                CRUM3L AI
              </button>
              <button
                onClick={() => setActiveView('chat')}
                className="hover:text-indigo-400 text-indigo-400/90 font-medium transition-colors"
              >
                Chat (13+)
              </button>
              <button
                onClick={() => setIsCustomLinkOpen(true)}
                className="hover:text-emerald-400 text-emerald-400/90 font-medium transition-colors"
              >
                Custom Link
              </button>
              <button
                onClick={() => setIsTourOpen(true)}
                className="hover:text-[#ff5b79] transition-colors"
              >
                Welcome Tour
              </button>
              <button
                onClick={() => setIsJsonOpen(true)}
                className="hover:text-sky-400 transition-colors"
              >
                games.json
              </button>
              <button
                onClick={() => setIsCloakOpen(true)}
                className="hover:text-amber-400 transition-colors"
              >
                Tab Cloak
              </button>
              <button
                onClick={handleLock}
                className="hover:text-[#ff5b79] transition-colors"
              >
                Lock to Calculator
              </button>
              <button
                onClick={() => setIsAddOpen(true)}
                className="hover:text-emerald-400 transition-colors"
              >
                Add Game
              </button>
            </div>
          </div>
        </footer>
      </div>

      {/* Modals & Dialogs */}
      <CustomLinkModal
        isOpen={isCustomLinkOpen}
        onClose={() => setIsCustomLinkOpen(false)}
        games={games}
        activeGameId={activeGame?.id}
      />

      <WelcomeTour
        isOpen={isTourOpen}
        onClose={() => setIsTourOpen(false)}
      />

      <AddGameModal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onAddGame={handleAddGame}
      />

      <JsonViewerModal
        isOpen={isJsonOpen}
        onClose={() => setIsJsonOpen(false)}
        games={games}
      />

      <TabCloakModal
        isOpen={isCloakOpen}
        onClose={() => setIsCloakOpen(false)}
        activeCloak={activeCloakId}
        onSelectCloak={handleSelectCloak}
        onTriggerPanic={() => setIsPanicActive(true)}
      />
    </div>
  );
}
