export interface GameControl {
  key: string;
  action: string;
}

export interface GameItem {
  id: string;
  title: string;
  category: 'Arcade' | 'Puzzle' | 'Action' | 'Strategy' | 'Classic' | string;
  tags: string[];
  description: string;
  iframeCode: string;
  iframeSrc: string;
  rating: number;
  plays: number;
  featured?: boolean;
  accentColor?: string;
  controls?: GameControl[];
  isCustom?: boolean;
}

export interface GamesDatabase {
  version: string;
  name: string;
  description: string;
  games: GameItem[];
}
