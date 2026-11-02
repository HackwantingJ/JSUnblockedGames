import { GamesDatabase } from '../types/game';

export const DEFAULT_GAMES_DATA: GamesDatabase = {
  version: "1.0.0",
  name: "Vault Unblocked Games Hub",
  description: "Collection of unblocked web games rendered directly via iframe containers defined in this JSON database.",
  games: [
    {
      id: "snake-retro",
      title: "Retro Snake 97",
      category: "Arcade",
      tags: ["Arcade", "Retro", "Snake", "High Score"],
      description: "The quintessential arcade classic. Slither around the grid, consume glowing power orbs, and grow your tail without hitting borders or yourself.",
      iframeCode: "<iframe src=\"/games/snake.html\" title=\"Retro Snake 97\" width=\"100%\" height=\"100%\" frameborder=\"0\" allow=\"fullscreen; autoplay\" allowfullscreen></iframe>",
      iframeSrc: "/games/snake.html",
      rating: 4.9,
      plays: 34820,
      featured: true,
      accentColor: "emerald",
      controls: [
        { key: "Arrow Keys / WASD", action: "Steer Snake" },
        { key: "Space", action: "Pause Game" },
        { key: "R", action: "Quick Restart" }
      ]
    },
    {
      id: "game-2048",
      title: "2048 Master",
      category: "Puzzle",
      tags: ["Puzzle", "Math", "Logic", "Strategy"],
      description: "Join numerical tiles and calculate your path toward the legendary 2048 tile. Features silky smooth slide physics and undo support.",
      iframeCode: "<iframe src=\"/games/2048.html\" title=\"2048 Master\" width=\"100%\" height=\"100%\" frameborder=\"0\" allow=\"fullscreen; autoplay\" allowfullscreen></iframe>",
      iframeSrc: "/games/2048.html",
      rating: 4.95,
      plays: 48900,
      featured: true,
      accentColor: "sky",
      controls: [
        { key: "Arrow Keys / WASD", action: "Slide Tiles" },
        { key: "Swipe", action: "Mobile Gesture Slide" },
        { key: "R", action: "Reset Board" }
      ]
    },
    {
      id: "space-defenders",
      title: "Space Defenders",
      category: "Action",
      tags: ["Action", "Shooter", "Retro", "Sci-Fi"],
      description: "Defend humanity from alien armada waves descending toward Earth. Dodge enemy laser fire and eliminate alien commanders.",
      iframeCode: "<iframe src=\"/games/space-invaders.html\" title=\"Space Defenders\" width=\"100%\" height=\"100%\" frameborder=\"0\" allow=\"fullscreen; autoplay\" allowfullscreen></iframe>",
      iframeSrc: "/games/space-invaders.html",
      rating: 4.88,
      plays: 29150,
      featured: true,
      accentColor: "cyan",
      controls: [
        { key: "Arrow Keys / A & D", action: "Maneuver Cannon" },
        { key: "Spacebar", action: "Fire Plasma Blaster" }
      ]
    },
    {
      id: "neon-breakout",
      title: "Neon Breakout",
      category: "Arcade",
      tags: ["Arcade", "Physics", "Retro", "Bricks"],
      description: "Smash vibrant neon brick prisms with dynamic ball ricochets and paddle angle physics. Rack up multi-hit combo bonuses.",
      iframeCode: "<iframe src=\"/games/breakout.html\" title=\"Neon Breakout\" width=\"100%\" height=\"100%\" frameborder=\"0\" allow=\"fullscreen; autoplay\" allowfullscreen></iframe>",
      iframeSrc: "/games/breakout.html",
      rating: 4.84,
      plays: 22300,
      featured: false,
      accentColor: "amber",
      controls: [
        { key: "Mouse / Touch", action: "Guide Paddle Position" },
        { key: "Arrow Keys", action: "Keyboard Paddle Drift" }
      ]
    },
    {
      id: "block-stack",
      title: "Block Stack",
      category: "Puzzle",
      tags: ["Puzzle", "Classic", "Tetris", "Blocks"],
      description: "Stack falling tetromino geometry blocks, execute strategic wall kicks, and clear simultaneous quadruple lines for maximum score multiplier.",
      iframeCode: "<iframe src=\"/games/tetris.html\" title=\"Block Stack\" width=\"100%\" height=\"100%\" frameborder=\"0\" allow=\"fullscreen; autoplay\" allowfullscreen></iframe>",
      iframeSrc: "/games/tetris.html",
      rating: 4.92,
      plays: 41200,
      featured: true,
      accentColor: "indigo",
      controls: [
        { key: "Left / Right", action: "Shift Block" },
        { key: "Up Arrow / X", action: "Rotate Block" },
        { key: "Down Arrow", action: "Soft Drop" },
        { key: "Spacebar", action: "Hard Drop" }
      ]
    },
    {
      id: "flappy-copter",
      title: "Flappy Copter",
      category: "Arcade",
      tags: ["Arcade", "Skill", "Casual", "Hard"],
      description: "Tap or hit space to flap your copter wings through narrow pipe obstacles. Test your rhythm, reaction time, and nerve.",
      iframeCode: "<iframe src=\"/games/flappy.html\" title=\"Flappy Copter\" width=\"100%\" height=\"100%\" frameborder=\"0\" allow=\"fullscreen; autoplay\" allowfullscreen></iframe>",
      iframeSrc: "/games/flappy.html",
      rating: 4.79,
      plays: 56100,
      featured: true,
      accentColor: "yellow",
      controls: [
        { key: "Space / Click / Tap", action: "Flap Altitude Boost" }
      ]
    },
    {
      id: "cyber-pong",
      title: "Cyber Pong",
      category: "Classic",
      tags: ["Classic", "Sports", "2-Player", "Arcade"],
      description: "High-velocity table tennis battle against an intelligent predictive CPU opponent. First paddle to 7 points secures the victory cup.",
      iframeCode: "<iframe src=\"/games/pong.html\" title=\"Cyber Pong\" width=\"100%\" height=\"100%\" frameborder=\"0\" allow=\"fullscreen; autoplay\" allowfullscreen></iframe>",
      iframeSrc: "/games/pong.html",
      rating: 4.75,
      plays: 18450,
      featured: false,
      accentColor: "pink",
      controls: [
        { key: "Mouse / Touch", action: "Position Paddle" },
        { key: "W & S / Up & Down", action: "Keyboard Drift" }
      ]
    },
    {
      id: "cyber-runner",
      title: "Cyber Runner",
      category: "Action",
      tags: ["Action", "Runner", "Endless", "Dino"],
      description: "Dash across neon wasteland frontiers jumping over cyber hurdles, cacti, and obstacles as acceleration progressively scales higher.",
      iframeCode: "<iframe src=\"/games/dino-runner.html\" title=\"Cyber Runner\" width=\"100%\" height=\"100%\" frameborder=\"0\" allow=\"fullscreen; autoplay\" allowfullscreen></iframe>",
      iframeSrc: "/games/dino-runner.html",
      rating: 4.82,
      plays: 37600,
      featured: false,
      accentColor: "teal",
      controls: [
        { key: "Spacebar / Up Arrow", action: "Jump Over Obstacle" },
        { key: "Click / Touch", action: "Mobile Jump" }
      ]
    },
    {
      id: "orbital-clicker",
      title: "Orbital Energy Clicker",
      category: "Strategy",
      tags: ["Strategy", "Clicker", "Idle", "Sci-Fi"],
      description: "Harness boundless cosmic power by tapping the plasma reactor core. Invest generated watts into solar relays, nano conductors, and quantum drills.",
      iframeCode: "<iframe src=\"/games/cookie-clicker.html\" title=\"Orbital Energy Clicker\" width=\"100%\" height=\"100%\" frameborder=\"0\" allow=\"fullscreen; autoplay\" allowfullscreen></iframe>",
      iframeSrc: "/games/cookie-clicker.html",
      rating: 4.89,
      plays: 31200,
      featured: false,
      accentColor: "blue",
      controls: [
        { key: "Left Click / Tap", action: "Harvest Plasma Energy" },
        { key: "Store Items", action: "Automate Energy Grid" }
      ]
    },
    {
      id: "minesweeper-retro",
      title: "Minesweeper Retro",
      category: "Puzzle",
      tags: ["Puzzle", "Logic", "Strategy", "Retro"],
      description: "Clear the grid without triggering hidden explosive naval mines. Use logic, numerical proximity indicators, and precision tactical flags.",
      iframeCode: "<iframe src=\"/games/minesweeper.html\" title=\"Minesweeper Retro\" width=\"100%\" height=\"100%\" frameborder=\"0\" allow=\"fullscreen; autoplay\" allowfullscreen></iframe>",
      iframeSrc: "/games/minesweeper.html",
      rating: 4.87,
      plays: 24800,
      featured: false,
      accentColor: "red",
      controls: [
        { key: "Left Click", action: "Reveal Tile" },
        { key: "Right Click", action: "Toggle Mine Flag" },
        { key: "Smiley Face", action: "Restart Grid" }
      ]
    }
  ]
};
