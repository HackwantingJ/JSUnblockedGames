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
} from 'lucide-react';
import { DEFAULT_GAMES_DATA } from './data/defaultGames.js';
import { Navbar } from './components/Navbar.jsx';
import { GameCard } from './components/GameCard.jsx';
import { GamePlayer } from './components/GamePlayer.jsx';
import { AddGameModal } from './components/AddGameModal.jsx';
import { JsonViewerModal } from './components/JsonViewerModal.jsx';
import { TabCloakModal } from './components/TabCloakModal.jsx';
import { PanicScreen } from './components/PanicScreen.jsx';
import { Calculator } from './components/Calculator.jsx';
import { AuthScreen } from './components/AuthScreen.jsx';
import { WelcomeTour } from './components/WelcomeTour.jsx';

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

  // 3. Welcome Tour Modal state
  const [isTourOpen, setIsTourOpen] = useState(false);

  // 4. Games catalog state
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

  // 5. Active Game in Iframe Player
  const [activeGame, setActiveGame] = useState(null);

  // 6. Favorites
  const [favorites, setFavorites] = useState(() => {
    try {
      const savedFavs = localStorage.getItem('c00k13_favorites');
      return savedFavs ? JSON.parse(savedFavs) : ['minecraft', 'cuphead', 'game-2048'];
    } catch {
      return ['minecraft', 'cuphead'];
    }
  });

  // 7. Recent Played Games tracking
  const [recentGames, setRecentGames] = useState(() => {
    try {
      const saved = localStorage.getItem('c00k13_recent');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // 8. Filters & Search toolbar states
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

  // 9. Stealth & Utility Modals
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isJsonOpen, setIsJsonOpen] = useState(false);
  const [isCloakOpen, setIsCloakOpen] = useState(false);
  const [isPanicActive, setIsPanicActive] = useState(false);
  const [activeCloakId, setActiveCloakId] = useState('default');

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
      document.title = 'C00K13 - Games';
      let link = document.querySelector("link[rel*='icon']");
      if (link) {
        link.href = './favicon.svg';
      }
    }
  }, [isUnlocked]);

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
    // Launch tour on first sign-up or if never completed
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

  // Stage 4: Unlocked C00K13 Games Experience
  return (
    <div className="min-h-screen bg-[#0d070a] text-slate-100 flex flex-col antialiased selection:bg-[#ff5b79]/30 selection:text-[#ff5b79]">
      {/* Top Navigation */}
      <Navbar
        user={sessionUser}
        onOpenCloak={() => setIsCloakOpen(true)}
        onOpenAddGame={() => setIsAddOpen(true)}
        onOpenJsonView={() => setIsJsonOpen(true)}
        onOpenTour={() => setIsTourOpen(true)}
        onTriggerPanic={() => setIsPanicActive(true)}
        onLock={handleLock}
        onLogout={handleLogout}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-8 py-5">
        {/* Active Iframe Game Player if a game is selected */}
        {activeGame && (
          <GamePlayer
            game={activeGame}
            isFavorite={favorites.includes(activeGame.id)}
            onClose={() => setActiveGame(null)}
            onToggleFavorite={toggleFavorite}
          />
        )}

        {/* Cherri-Style Games Header Bar (Matching Screenshot 3) */}
        <section className="mb-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3.5 py-2">
            
            {/* Left: Games title & icon */}
            <div className="flex items-center gap-2.5">
              <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white flex items-center gap-2">
                <span>Games</span>
                <Gamepad2 className="w-5 h-5 text-slate-400 inline" />
                <Trophy className="w-4 h-4 text-amber-400 inline" />
              </h1>
            </div>

            {/* Middle: Rounded Search Bar (Matching Screenshot 3) */}
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

            {/* Right: Library Dropdown, Random, & Count (Matching Screenshot 3) */}
            <div className="flex items-center gap-2 self-end md:self-auto shrink-0">
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

              {/* Counter Pill (Matching Screenshot 3: e.g. "23 of 23") */}
              <span className="font-mono text-xs text-slate-400 px-2.5 py-1 bg-[#170e14] border border-[#2d1b26] rounded-xl tabular-nums">
                {filteredGames.length} of {games.length}
              </span>
            </div>

          </div>
        </section>

        {/* Announcement Banner (Matching Screenshot 3) */}
        {showAnnouncement && (
          <div className="mb-5 p-3.5 sm:p-4 rounded-2xl bg-[#1d0e17] border border-[#3b192c] flex items-start justify-between gap-3 shadow-lg animate-in fade-in">
            <div className="space-y-1">
              <h2 className="text-xs sm:text-sm font-bold text-white tracking-tight flex items-center gap-1.5">
                <span>The 6,000 legacy games have been upgraded to C00K13</span>
              </h2>
              <p className="text-xs text-slate-300 leading-relaxed">
                C00K13 features a curated high-speed arcade catalog with 3D pointer-lock mouse controls, stealth calculator cloak, and offline save states.{' '}
                <button
                  onClick={() => setIsTourOpen(true)}
                  className="text-[#ff5b79] hover:underline font-semibold"
                >
                  Take the Welcome Tour &rarr;
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

        {/* Filter Tabs Row (Matching Screenshot 3: All, Favorites, Recent, Categories) */}
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

        {/* Cherri Squircle Games Grid (Matching Screenshot 3) */}
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
      </main>

      {/* Footer */}
      <footer className="mt-16 border-t border-[#23121d] bg-[#090507] py-8 px-4 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-300">C00K13</span>
            <span>·</span>
            <span>Fast Unblocked Arcade &amp; 3D Iframe Hub</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs">
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

      {/* Modals & Dialogs */}
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
