import React from 'react';
import { Heart, Play, Star } from 'lucide-react';

export const GameCard = ({
  game,
  isFavorite,
  onPlay,
  onToggleFavorite,
}) => {
  // Render bespoke visual artwork thumbnail matching Cherri's squircle game tiles
  const renderGameThumbnail = () => {
    switch (game.id) {
      case 'game-2048':
        return (
          <div className="w-full h-full bg-[#e8b532] flex items-center justify-center select-none shadow-inner">
            <span className="text-white font-extrabold text-3xl sm:text-4xl tracking-tight drop-shadow-sm font-sans">
              2048
            </span>
          </div>
        );

      case 'minecraft':
        return (
          <div className="w-full h-full bg-gradient-to-b from-[#4a8505] to-[#2e5902] flex flex-col items-center justify-center p-3 relative overflow-hidden select-none">
            {/* Voxel texture effect */}
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:8px_8px]" />
            <div className="w-14 h-14 bg-[#7a4825] border-t-8 border-[#5ea310] rounded shadow-lg flex items-center justify-center z-10">
              <span className="text-xl">⛏️</span>
            </div>
            <span className="text-white font-extrabold text-xs uppercase tracking-wider mt-2 z-10 drop-shadow">
              Minecraft
            </span>
          </div>
        );

      case 'cuphead':
        return (
          <div className="w-full h-full bg-gradient-to-br from-[#d43737] via-[#8c1c1c] to-[#400808] flex flex-col items-center justify-center p-3 select-none relative">
            <div className="w-14 h-14 rounded-full bg-amber-100 border-4 border-black flex items-center justify-center shadow-lg transform -rotate-6">
              <span className="text-2xl">☕</span>
            </div>
            <span className="text-amber-200 font-extrabold text-xs tracking-wider mt-2 drop-shadow font-serif">
              CUPHEAD
            </span>
          </div>
        );

      case 'subway-surfers':
        return (
          <div className="w-full h-full bg-gradient-to-b from-[#1bbad6] via-[#107085] to-[#0a3842] flex flex-col items-center justify-center p-3 select-none">
            <div className="w-12 h-12 bg-amber-400 rounded-2xl flex items-center justify-center shadow-lg border-2 border-white transform rotate-12">
              <span className="text-2xl">🛹</span>
            </div>
            <span className="text-white font-extrabold text-xs tracking-tight mt-2 text-center uppercase drop-shadow">
              Subway Surf
            </span>
          </div>
        );

      case 'geometry-dash':
        return (
          <div className="w-full h-full bg-gradient-to-tr from-[#021b36] via-[#094178] to-[#147bd9] flex flex-col items-center justify-center p-3 select-none relative">
            <div className="w-12 h-12 bg-[#ffe600] border-4 border-black rounded-lg flex items-center justify-center shadow-xl transform rotate-45">
              <div className="w-6 h-6 border-2 border-black flex items-center justify-center">
                <div className="w-2 h-2 bg-black rounded-full" />
              </div>
            </div>
            <span className="text-[#ffe600] font-black text-xs tracking-widest mt-3 uppercase drop-shadow">
              Geo Dash
            </span>
          </div>
        );

      case 'plants-vs-zombies':
        return (
          <div className="w-full h-full bg-gradient-to-b from-[#5aa32a] to-[#254f0c] flex flex-col items-center justify-center p-3 select-none">
            <div className="w-14 h-14 bg-amber-300 rounded-full flex items-center justify-center shadow-md border-2 border-amber-500">
              <span className="text-2xl">🌻</span>
            </div>
            <span className="text-white font-bold text-xs mt-2 text-center drop-shadow">
              Plants vs Zombies
            </span>
          </div>
        );

      case 'fnaf-1':
        return (
          <div className="w-full h-full bg-gradient-to-b from-[#1f0b12] to-black flex flex-col items-center justify-center p-3 select-none relative">
            <div className="flex gap-4 mb-2">
              <div className="w-2.5 h-2.5 bg-red-500 rounded-full animate-ping" />
              <div className="w-2.5 h-2.5 bg-red-500 rounded-full animate-ping" />
            </div>
            <div className="text-3xl">🐻</div>
            <span className="text-rose-500 font-extrabold text-xs tracking-widest mt-1">
              FNAF 1
            </span>
          </div>
        );

      case 'hollow-knight':
        return (
          <div className="w-full h-full bg-gradient-to-b from-[#141b38] to-[#060814] flex flex-col items-center justify-center p-3 select-none">
            <div className="w-12 h-14 bg-slate-200 rounded-t-full border-2 border-slate-900 flex items-center justify-center shadow-lg relative">
              <div className="w-2 h-3 bg-black rounded-full absolute left-2.5 top-5" />
              <div className="w-2 h-3 bg-black rounded-full absolute right-2.5 top-5" />
            </div>
            <span className="text-sky-200 font-serif font-bold text-xs mt-2 tracking-wider">
              Hollow Knight
            </span>
          </div>
        );

      case 'drift-hunters':
        return (
          <div className="w-full h-full bg-gradient-to-b from-[#1a202c] via-[#2d3748] to-[#0d1117] flex flex-col items-center justify-center p-3 select-none">
            <span className="text-3xl filter drop-shadow transform -rotate-12">🏎️</span>
            <span className="text-sky-400 font-black text-xs tracking-wider mt-2 uppercase">
              Drift Hunters
            </span>
          </div>
        );

      case 'ultrakill':
        return (
          <div className="w-full h-full bg-gradient-to-br from-[#800a0a] via-[#3d0303] to-black flex flex-col items-center justify-center p-3 select-none relative">
            <div className="w-12 h-12 bg-cyan-500 rounded-lg transform rotate-12 flex items-center justify-center shadow-lg shadow-cyan-500/50">
              <span className="text-black font-black text-xs">V1</span>
            </div>
            <span className="text-rose-400 font-extrabold text-xs tracking-widest mt-2">
              ULTRAKILL
            </span>
          </div>
        );

      case 'doom':
        return (
          <div className="w-full h-full bg-gradient-to-b from-[#94200c] to-[#260501] flex flex-col items-center justify-center p-3 select-none">
            <span className="text-3xl mb-1">💀</span>
            <span className="text-amber-400 font-extrabold text-sm tracking-widest uppercase font-serif drop-shadow">
              DOOM
            </span>
          </div>
        );

      case 'csgo-surf':
        return (
          <div className="w-full h-full bg-gradient-to-br from-[#0c4a6e] to-[#082f49] flex flex-col items-center justify-center p-3 select-none">
            <span className="text-3xl transform -rotate-45 mb-1">🏄‍♂️</span>
            <span className="text-cyan-300 font-black text-xs tracking-wider">
              CS:GO SURF
            </span>
          </div>
        );

      case 'skate-3':
        return (
          <div className="w-full h-full bg-gradient-to-tr from-[#92400e] to-[#f59e0b] flex flex-col items-center justify-center p-3 select-none">
            <div className="w-14 h-6 bg-black rounded-full flex items-center justify-center shadow-lg transform -rotate-12">
              <div className="w-12 h-1 bg-amber-400 rounded-full" />
            </div>
            <span className="text-white font-extrabold text-xs tracking-wider mt-3 uppercase drop-shadow">
              Skate 3
            </span>
          </div>
        );

      case 'granny':
        return (
          <div className="w-full h-full bg-gradient-to-b from-[#2b0808] to-black flex flex-col items-center justify-center p-3 select-none">
            <span className="text-3xl mb-1">👵</span>
            <span className="text-red-500 font-extrabold text-xs tracking-widest uppercase">
              Granny
            </span>
          </div>
        );

      case 'snake-retro':
        return (
          <div className="w-full h-full bg-[#1e4620] flex flex-col items-center justify-center p-3 select-none relative">
            <div className="flex items-center gap-1 mb-2">
              <div className="w-3 h-3 bg-emerald-400 rounded-sm" />
              <div className="w-3 h-3 bg-emerald-400 rounded-sm" />
              <div className="w-3 h-3 bg-emerald-400 rounded-sm" />
              <div className="w-2.5 h-2.5 bg-red-400 rounded-full ml-1" />
            </div>
            <span className="text-emerald-300 font-mono font-bold text-xs uppercase">
              Snake 97
            </span>
          </div>
        );

      case 'space-defenders':
        return (
          <div className="w-full h-full bg-gradient-to-b from-[#090d16] to-[#020408] flex flex-col items-center justify-center p-3 select-none">
            <span className="text-3xl text-emerald-400 mb-1">👾</span>
            <span className="text-sky-300 font-mono font-bold text-xs uppercase">
              Space Invaders
            </span>
          </div>
        );

      case 'neon-breakout':
        return (
          <div className="w-full h-full bg-gradient-to-b from-[#2e1065] to-[#0f0426] flex flex-col items-center justify-center p-3 select-none">
            <div className="flex gap-1 mb-2">
              <div className="w-3 h-1.5 bg-rose-500 rounded-xs" />
              <div className="w-3 h-1.5 bg-amber-400 rounded-xs" />
              <div className="w-3 h-1.5 bg-cyan-400 rounded-xs" />
            </div>
            <div className="w-2 h-2 rounded-full bg-white shadow-sm shadow-white mb-1" />
            <span className="text-fuchsia-300 font-bold text-xs uppercase">
              Breakout
            </span>
          </div>
        );

      case 'block-stack':
        return (
          <div className="w-full h-full bg-[#0f172a] flex flex-col items-center justify-center p-3 select-none">
            <div className="grid grid-cols-2 gap-1 mb-2">
              <div className="w-3.5 h-3.5 bg-cyan-400 rounded-xs" />
              <div className="w-3.5 h-3.5 bg-yellow-400 rounded-xs" />
              <div className="w-3.5 h-3.5 bg-purple-500 rounded-xs" />
              <div className="w-3.5 h-3.5 bg-red-500 rounded-xs" />
            </div>
            <span className="text-indigo-300 font-bold text-xs uppercase">
              Tetris
            </span>
          </div>
        );

      case 'flappy-copter':
        return (
          <div className="w-full h-full bg-[#38bdf8] flex flex-col items-center justify-center p-3 select-none">
            <span className="text-3xl mb-1 filter drop-shadow">🚁</span>
            <span className="text-white font-extrabold text-xs uppercase drop-shadow">
              Flappy
            </span>
          </div>
        );

      case 'cyber-pong':
        return (
          <div className="w-full h-full bg-[#0a0a0f] flex flex-col items-center justify-center p-3 select-none relative">
            <div className="flex items-center justify-between w-16 mb-2 border-t border-b border-dashed border-slate-700 py-1">
              <div className="w-1.5 h-4 bg-cyan-400 rounded-xs" />
              <div className="w-2 h-2 bg-white rounded-full shadow-sm shadow-white" />
              <div className="w-1.5 h-4 bg-rose-500 rounded-xs" />
            </div>
            <span className="text-slate-300 font-mono text-xs font-semibold uppercase">
              Cyber Pong
            </span>
          </div>
        );

      case 'cyber-runner':
        return (
          <div className="w-full h-full bg-gradient-to-b from-[#134e4a] to-[#042f2e] flex flex-col items-center justify-center p-3 select-none">
            <span className="text-3xl mb-1">🦖</span>
            <span className="text-teal-300 font-bold text-xs uppercase">
              Runner
            </span>
          </div>
        );

      case 'orbital-clicker':
        return (
          <div className="w-full h-full bg-gradient-to-br from-[#1e1b4b] to-[#030712] flex flex-col items-center justify-center p-3 select-none">
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-sky-400 to-indigo-500 flex items-center justify-center shadow-lg shadow-sky-500/40 animate-pulse mb-1">
              <span className="text-xl">⚡</span>
            </div>
            <span className="text-sky-300 font-bold text-xs uppercase">
              Clicker
            </span>
          </div>
        );

      case 'minesweeper-retro':
        return (
          <div className="w-full h-full bg-[#c0c0c0] flex flex-col items-center justify-center p-3 select-none border-t-2 border-l-2 border-white border-b-2 border-r-2 border-gray-600">
            <span className="text-3xl mb-1">💣</span>
            <span className="text-red-600 font-mono font-black text-xs uppercase">
              Minesweeper
            </span>
          </div>
        );

      default:
        return (
          <div className="w-full h-full bg-gradient-to-br from-[#23121d] to-[#12070e] flex flex-col items-center justify-center p-3 select-none">
            <span className="text-3xl mb-1">🎮</span>
            <span className="text-slate-200 font-bold text-xs text-center line-clamp-1">
              {game.title}
            </span>
          </div>
        );
    }
  };

  return (
    <div
      onClick={() => onPlay(game)}
      className="group relative aspect-square rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer bg-[#140c11] border border-[#2b1722] hover:border-[#ff5b79]/60 shadow-lg hover:shadow-2xl hover:shadow-[#ff5b79]/15 hover:scale-[1.04] active:scale-[0.98] transition-all duration-200 select-none flex flex-col"
    >
      {/* Visual Tile Thumbnail */}
      <div className="w-full h-full relative">
        {renderGameThumbnail()}

        {/* Favorite Heart on Top Right (visible on hover or if already favorite) */}
        <button
          type="button"
          onClick={(e) => onToggleFavorite(game.id, e)}
          title={isFavorite ? 'Remove favorite' : 'Add favorite'}
          className={`absolute top-2 right-2 p-1.5 rounded-xl z-20 backdrop-blur-md transition-all focus:outline-none ${
            isFavorite
              ? 'bg-black/60 text-[#ff5b79] opacity-100'
              : 'bg-black/40 text-white/70 hover:text-white opacity-0 group-hover:opacity-100'
          }`}
        >
          <Heart
            className={`w-4 h-4 transition-transform group-hover:scale-110 ${
              isFavorite ? 'fill-[#ff5b79]' : ''
            }`}
          />
        </button>

        {/* Rating or Plays badge on top left */}
        <div className="absolute top-2 left-2 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-lg bg-black/60 backdrop-blur-md text-[10px] font-mono font-medium text-amber-300">
            <Star className="w-2.5 h-2.5 fill-amber-400" />
            {Number(game.rating).toFixed(1)}
          </span>
        </div>

        {/* Subtle Dark Bottom Gradient with Title & Category on Hover */}
        <div className="absolute inset-x-0 bottom-0 pt-8 pb-2 px-2.5 bg-gradient-to-t from-black/90 via-black/60 to-transparent flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <p className="text-white text-xs font-bold truncate leading-tight">
            {game.title}
          </p>
          <div className="flex items-center justify-between text-[10px] text-slate-300 mt-0.5">
            <span className="text-[#ff5b79] font-medium">{game.category}</span>
            <span className="flex items-center gap-1 font-semibold text-white">
              <Play className="w-2.5 h-2.5 fill-white" />
              Play
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
