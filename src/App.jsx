import React, { useState, useEffect, useMemo } from 'react';
import {
  Search,
  Shuffle,
  Gamepad2,
  Heart,
  SlidersHorizontal,
  Code2
} from 'lucide-react';
import { DEFAULT_GAMES_DATA } from './data/defaultGames.js';
import { Navbar } from './components/Navbar.jsx';
import { GameCard } from './components/GameCard.jsx';
import { GamePlayer } from './components/GamePlayer.jsx';
import { AddGameModal } from './components/AddGameModal.jsx';
import { JsonViewerModal } from './components/JsonViewerModal.jsx';
import { TabCloakModal } from './components/TabCloakModal.jsx';
import { PanicScreen } from './components/PanicScreen.jsx';

export default function App() {
  // Games state (defaults + any saved custom games)
  const [games, setGames] = useState(() => {
    try {
      const savedCustom = localStorage.getItem('vault_games_custom');
      if (savedCustom) {
        const customItems = JSON.parse(savedCustom);
        return [...DEFAULT_GAMES_DATA.games, ...customItems];
      }
    } catch (e) {
      console.error('Failed to parse custom games', e);
    }
    return DEFAULT_GAMES_DATA.games;
  });

  // Active game in iframe player
  const [activeGame, setActiveGame] = useState(null);

  // Favorites
  const [favorites, setFavorites] = useState(() => {
    try {
      const savedFavs = localStorage.getItem('vault_unblocked_favorites');
      return savedFavs ? JSON.parse(savedFavs) : ['snake-retro', 'game-2048', 'block-stack'];
    } catch {
      return ['snake-retro', 'game-2048'];
    }
  });

  // Filter & Search states
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('popular');

  // Modals state
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isJsonOpen, setIsJsonOpen] = useState(false);
  const [isCloakOpen, setIsCloakOpen] = useState(false);
  const [isPanicActive, setIsPanicActive] = useState(false);
  const [activeCloakId, setActiveCloakId] = useState('default');

  // Save favorites
  const toggleFavorite = (id, e) => {
    if (e && e.stopPropagation) e.stopPropagation();
    setFavorites((prev) => {
      const next = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      localStorage.setItem('vault_unblocked_favorites', JSON.stringify(next));
      return next;
    });
  };

  // Add custom game
  const handleAddGame = (newGame) => {
    setGames((prev) => {
      const updated = [newGame, ...prev];
      const customOnly = updated.filter((g) => g.isCustom);
      localStorage.setItem('vault_games_custom', JSON.stringify(customOnly));
      return updated;
    });
    setActiveGame(newGame);
  };

  // Launch random game
  const handleRandomGame = () => {
    if (games.length === 0) return;
    const randomIndex = Math.floor(Math.random() * games.length);
    const chosen = games[randomIndex];
    setActiveGame(chosen);
    // Smooth scroll to top player
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Tab cloaking handler
  const handleSelectCloak = (preset) => {
    setActiveCloakId(preset.id);
    document.title = preset.title;

    // Update favicon
    let link = document.querySelector("link[rel*='icon']");
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.head.appendChild(link);
    }
    link.href = preset.iconUrl;
  };

  // Global Panic key listener (` or Tilde)
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

  // Filtered games calculation
  const filteredGames = useMemo(() => {
    return games
      .filter((game) => {
        // Category filter
        if (selectedCategory === 'Favorites') {
          if (!favorites.includes(game.id)) return false;
        } else if (selectedCategory !== 'All' && game.category !== selectedCategory) {
          return false;
        }

        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase().trim();
          const matchTitle = game.title.toLowerCase().includes(q);
          const matchDesc = game.description.toLowerCase().includes(q);
          const matchCat = game.category.toLowerCase().includes(q);
          const matchTag = game.tags?.some((t) => t.toLowerCase().includes(q));
          return matchTitle || matchDesc || matchCat || matchTag;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'popular') return b.plays - a.plays;
        if (sortBy === 'rating') return b.rating - a.rating;
        return a.title.localeCompare(b.title);
      });
  }, [games, selectedCategory, searchQuery, sortBy, favorites]);

  // Panic screen overrides
  if (isPanicActive) {
    return <PanicScreen onDismiss={() => setIsPanicActive(false)} />;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col antialiased">
      {/* Top Bar Contract Navigation */}
      <Navbar
        activeCategory={selectedCategory}
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          if (activeGame) setActiveGame(null);
        }}
        onOpenCloak={() => setIsCloakOpen(true)}
        onOpenAddGame={() => setIsAddOpen(true)}
        onOpenJsonView={() => setIsJsonOpen(true)}
        onTriggerPanic={() => setIsPanicActive(true)}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-8 py-6">
        
        {/* Active Iframe Game Player if a game is selected */}
        {activeGame && (
          <GamePlayer
            game={activeGame}
            isFavorite={favorites.includes(activeGame.id)}
            onClose={() => setActiveGame(null)}
            onToggleFavorite={toggleFavorite}
          />
        )}

        {/* Hero Section Banner when not playing */}
        {!activeGame && (
          <section className="relative rounded-2xl overflow-hidden border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 p-6 sm:p-10 mb-8 shadow-xl">
            <div className="relative z-10 max-w-2xl">
              
              <div className="flex items-center gap-2 text-xs font-semibold text-sky-400 mb-3 tracking-wide">
                <span>LOCAL IFRAME ENGINE</span>
                <span aria-hidden="true">·</span>
                <span>STORED IN GAMES.JSON</span>
                <span aria-hidden="true">·</span>
                <span>ZERO BLOCKED CALLS</span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight mb-3">
                Unblocked Arcade &amp; Classic Web Games
              </h1>

              <p className="text-sm sm:text-base text-slate-400 leading-relaxed mb-6">
                Instant playable games loaded straight into clean, lightweight iframe viewports. No tracking, no external ad bloat, and fully configured via a simple <code className="text-sky-300 font-mono">games.json</code> file.
              </p>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={handleRandomGame}
                  className="px-4 py-2.5 bg-sky-500 hover:bg-sky-400 text-white font-bold text-xs rounded-xl shadow-lg shadow-sky-500/25 transition-all flex items-center gap-2"
                >
                  <Shuffle className="w-4 h-4" />
                  <span>Surprise Me (Play Random)</span>
                </button>

                <button
                  onClick={() => setIsJsonOpen(true)}
                  className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white font-medium text-xs rounded-xl border border-slate-800 transition-colors flex items-center gap-2"
                >
                  <Code2 className="w-4 h-4 text-sky-400" />
                  <span>Inspect JSON Database</span>
                </button>
              </div>

            </div>

            {/* Subtle decorative background graphic */}
            <div className="absolute right-6 -bottom-8 opacity-10 hidden lg:block pointer-events-none">
              <Gamepad2 className="w-72 h-72 text-sky-400 stroke-1" />
            </div>
          </section>
        )}

        {/* Catalog Search & Controls Toolbar */}
        <section className="mb-6 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search games, tags, or mechanics..."
                className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-sky-500 transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Sort Selector */}
            <div className="flex items-center gap-2 text-xs text-slate-400 self-end md:self-auto">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-sky-500"
              >
                <option value="popular">Most Played</option>
                <option value="rating">Highest Rated</option>
                <option value="alphabetical">Title (A-Z)</option>
              </select>
            </div>

          </div>

          {/* Category Filter Chips / Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
            {['All', 'Favorites', 'Arcade', 'Puzzle', 'Action', 'Strategy', 'Classic'].map(
              (cat) => {
                const isSelected = selectedCategory === cat;
                const count =
                  cat === 'All'
                    ? games.length
                    : cat === 'Favorites'
                    ? favorites.length
                    : games.filter((g) => g.category === cat).length;

                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-sky-500 text-white shadow-sm'
                        : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                    }`}
                  >
                    {cat === 'Favorites' && (
                      <Heart
                        className={`w-3 h-3 ${
                          isSelected ? 'fill-white' : 'fill-rose-500 text-rose-500'
                        }`}
                      />
                    )}
                    <span>{cat}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                        isSelected ? 'bg-sky-600 text-white' : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              }
            )}
          </div>
        </section>

        {/* Game Cards Grid */}
        {filteredGames.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {filteredGames.map((game) => (
              <GameCard
                key={game.id}
                game={game}
                isFavorite={favorites.includes(game.id)}
                onPlay={(g) => {
                  setActiveGame(g);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onToggleFavorite={toggleFavorite}
              />
            ))}
          </div>
        ) : (
          <div className="py-16 text-center rounded-2xl border border-slate-800/80 bg-slate-900/40">
            <Gamepad2 className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <h3 className="text-base font-bold text-white mb-1">No Games Found</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto mb-4">
              We couldn&apos;t find any games matching &quot;{searchQuery}&quot; in the {selectedCategory} category.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white rounded-lg transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="mt-16 border-t border-slate-800/80 bg-slate-950 py-8 px-4 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-400">Vault Arcade</span>
            <span>·</span>
            <span>Unblocked JSON Iframe Architecture</span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsJsonOpen(true)}
              className="hover:text-sky-400 transition-colors"
            >
              View games.json
            </button>
            <button
              onClick={() => setIsCloakOpen(true)}
              className="hover:text-amber-400 transition-colors"
            >
              Tab Cloak Settings
            </button>
            <button
              onClick={() => setIsAddOpen(true)}
              className="hover:text-emerald-400 transition-colors"
            >
              Add Custom Iframe
            </button>
          </div>
        </div>
      </footer>

      {/* Modals */}
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
