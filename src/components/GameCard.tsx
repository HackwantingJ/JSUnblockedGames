import React from 'react';
import { Play, Heart, Star, Flame } from 'lucide-react';
import { GameItem } from '../types/game';

interface GameCardProps {
  game: GameItem;
  isFavorite: boolean;
  onPlay: (game: GameItem) => void;
  onToggleFavorite: (id: string, e: React.MouseEvent) => void;
}

export const GameCard: React.FC<GameCardProps> = ({
  game,
  isFavorite,
  onPlay,
  onToggleFavorite,
}) => {
  // Visual gradient accents matching theme
  const getGradient = (accent?: string) => {
    switch (accent) {
      case 'emerald':
        return 'from-emerald-950/60 to-slate-900 border-emerald-500/20 group-hover:border-emerald-500/50';
      case 'sky':
        return 'from-sky-950/60 to-slate-900 border-sky-500/20 group-hover:border-sky-500/50';
      case 'cyan':
        return 'from-cyan-950/60 to-slate-900 border-cyan-500/20 group-hover:border-cyan-500/50';
      case 'amber':
        return 'from-amber-950/60 to-slate-900 border-amber-500/20 group-hover:border-amber-500/50';
      case 'indigo':
        return 'from-indigo-950/60 to-slate-900 border-indigo-500/20 group-hover:border-indigo-500/50';
      case 'yellow':
        return 'from-yellow-950/60 to-slate-900 border-yellow-500/20 group-hover:border-yellow-500/50';
      case 'pink':
        return 'from-pink-950/60 to-slate-900 border-pink-500/20 group-hover:border-pink-500/50';
      case 'teal':
        return 'from-teal-950/60 to-slate-900 border-teal-500/20 group-hover:border-teal-500/50';
      case 'blue':
        return 'from-blue-950/60 to-slate-900 border-blue-500/20 group-hover:border-blue-500/50';
      case 'red':
        return 'from-red-950/60 to-slate-900 border-red-500/20 group-hover:border-red-500/50';
      default:
        return 'from-slate-900 to-slate-950 border-slate-800 group-hover:border-slate-700';
    }
  };

  const getAccentColor = (accent?: string) => {
    switch (accent) {
      case 'emerald': return 'text-emerald-400 bg-emerald-500/10';
      case 'sky': return 'text-sky-400 bg-sky-500/10';
      case 'cyan': return 'text-cyan-400 bg-cyan-500/10';
      case 'amber': return 'text-amber-400 bg-amber-500/10';
      case 'indigo': return 'text-indigo-400 bg-indigo-500/10';
      case 'yellow': return 'text-yellow-400 bg-yellow-500/10';
      case 'pink': return 'text-pink-400 bg-pink-500/10';
      case 'teal': return 'text-teal-400 bg-teal-500/10';
      case 'blue': return 'text-blue-400 bg-blue-500/10';
      case 'red': return 'text-red-400 bg-red-500/10';
      default: return 'text-sky-400 bg-sky-500/10';
    }
  };

  return (
    <div
      onClick={() => onPlay(game)}
      className={`group relative rounded-xl bg-gradient-to-b ${getGradient(
        game.accentColor
      )} border p-4 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/40 flex flex-col justify-between cursor-pointer`}
    >
      <div>
        {/* Top bar inside card */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <span className="font-medium text-slate-300">{game.category}</span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-0.5 text-amber-300 font-mono">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              {game.rating.toFixed(1)}
            </span>
            <span aria-hidden="true">·</span>
            <span className="font-mono text-slate-400 tabular-nums">
              {(game.plays / 1000).toFixed(1)}k plays
            </span>
          </div>

          <button
            onClick={(e) => onToggleFavorite(game.id, e)}
            title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800/80 transition-colors focus:outline-none"
          >
            <Heart
              className={`w-4 h-4 transition-colors ${
                isFavorite ? 'fill-rose-500 text-rose-500' : ''
              }`}
            />
          </button>
        </div>

        {/* Thumbnail Preview Area */}
        <div className="relative aspect-video w-full rounded-lg bg-slate-950/70 border border-slate-800/80 overflow-hidden mb-3.5 flex items-center justify-center">
          <div className="absolute inset-0 bg-radial from-slate-900/60 to-slate-950/90" />
          
          {/* Subtle grid texture */}
          <div
            className="absolute inset-0 opacity-15"
            style={{
              backgroundImage: 'radial-gradient(circle, #94a3b8 1px, transparent 1px)',
              backgroundSize: '16px 16px',
            }}
          />

          {/* Central Title/Visual Symbol */}
          <div className="relative text-center px-4">
            <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl mb-1.5 ${getAccentColor(game.accentColor)}`}>
              <Play className="w-5 h-5 ml-0.5 fill-current" />
            </div>
            <div className="text-xs font-mono text-slate-400 line-clamp-1">
              {game.iframeSrc}
            </div>
          </div>

          {game.featured && (
            <div className="absolute top-2 left-2 flex items-center gap-1 text-[11px] font-semibold text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 backdrop-blur-sm">
              <Flame className="w-3 h-3 text-amber-400" />
              <span>POPULAR</span>
            </div>
          )}

          {game.isCustom && (
            <div className="absolute top-2 right-2 text-[10px] font-mono font-medium text-emerald-300 bg-emerald-500/20 px-1.5 py-0.5 rounded border border-emerald-500/30">
              CUSTOM
            </div>
          )}

          {/* Hover Play Glow Overlay */}
          <div className="absolute inset-0 bg-sky-500/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[1px]">
            <span className="px-3.5 py-1.5 bg-sky-500 text-white text-xs font-bold rounded-lg shadow-lg shadow-sky-500/40 flex items-center gap-1.5 transform scale-95 group-hover:scale-100 transition-transform">
              <Play className="w-3.5 h-3.5 fill-current" /> Play in Iframe
            </span>
          </div>
        </div>

        {/* Title & Description */}
        <h3 className="text-base font-bold text-white group-hover:text-sky-300 transition-colors tracking-tight mb-1">
          {game.title}
        </h3>
        <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-3">
          {game.description}
        </p>
      </div>

      {/* Bottom tag / controls snippet */}
      <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-500">
        <span className="font-mono">JSON Iframe Ready</span>
        <span className="text-sky-400 group-hover:translate-x-0.5 transition-transform font-medium">
          Launch →
        </span>
      </div>
    </div>
  );
};
