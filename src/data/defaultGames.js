export const DEFAULT_GAMES_DATA = {
  version: "1.2.0",
  name: "C00K13 Unblocked Games Hub",
  description: "Curated collection of 23 unblocked web games rendered directly via iframe containers defined in this JSON database.",
  games: [
    {
      id: "minecraft",
      title: "Minecraft",
      category: "Action",
      tags: ["Minecraft", "Sandbox", "Crafting", "3D", "Adventure"],
      description: "Mine, build, craft, and explore infinite voxel worlds. Build architectural wonders or survive the night against creepers and zombies.",
      iframeCode: '<div style="position:relative;width:100%;max-width:900px;aspect-ratio:16/9;"><iframe src="https://nite.games/embed/minecraft" style="position:absolute;inset:0;width:100%;height:100%;border:none;border-radius:8px;" allow="fullscreen; autoplay; gamepad; pointer-lock"></iframe></div>',
      iframeSrc: "https://nite.games/embed/minecraft",
      rating: 4.98,
      plays: 142000,
      featured: true,
      accentColor: "emerald",
      controls: [
        { key: "WASD", action: "Walk & Move" },
        { key: "Spacebar", action: "Jump" },
        { key: "Left Click", action: "Mine / Attack" },
        { key: "Right Click", action: "Place Block / Use" },
        { key: "E", action: "Open Inventory" }
      ]
    },
    {
      id: "cuphead",
      title: "Cuphead",
      category: "Action",
      tags: ["Cuphead", "Action", "Boss Rush", "Retro", "Shooter"],
      description: "Classic 1930s hand-drawn run-and-gun action game. Traverse strange worlds, acquire new weapons, learn super moves, and battle eccentric bosses.",
      iframeCode: '<div style="position:relative;width:100%;max-width:900px;aspect-ratio:16/9;"><iframe src="https://nite.games/embed/cuphead" style="position:absolute;inset:0;width:100%;height:100%;border:none;border-radius:8px;" allow="fullscreen; autoplay; gamepad; pointer-lock"></iframe></div>',
      iframeSrc: "https://nite.games/embed/cuphead",
      rating: 4.94,
      plays: 98400,
      featured: true,
      accentColor: "red",
      controls: [
        { key: "Arrow Keys", action: "Move & Aim" },
        { key: "Z", action: "Jump" },
        { key: "X", action: "Shoot" },
        { key: "C", action: "EX / Super Move" },
        { key: "Shift", action: "Dash" }
      ]
    },
    {
      id: "subway-surfers",
      title: "Subway Surfers",
      category: "Arcade",
      tags: ["Subway Surfers", "Runner", "Endless", "3D", "Casual"],
      description: "Dash along railway tracks, dodge oncoming subway trains, collect shiny gold coins, and ride hoverboards away from the grumpy Inspector.",
      iframeCode: '<div style="position:relative;width:100%;max-width:900px;aspect-ratio:16/9;"><iframe src="https://nite.games/embed/subway-surfers" style="position:absolute;inset:0;width:100%;height:100%;border:none;border-radius:8px;" allow="fullscreen; autoplay; gamepad; pointer-lock"></iframe></div>',
      iframeSrc: "https://nite.games/embed/subway-surfers",
      rating: 4.93,
      plays: 189000,
      featured: true,
      accentColor: "teal",
      controls: [
        { key: "Left / Right", action: "Switch Railway Tracks" },
        { key: "Up Arrow", action: "Jump Over Barriers" },
        { key: "Down Arrow", action: "Slide Under Hurdles" },
        { key: "Spacebar", action: "Activate Hoverboard" }
      ]
    },
    {
      id: "geometry-dash",
      title: "Geometry Dash",
      category: "Arcade",
      tags: ["Geometry Dash", "Rhythm", "Platformer", "Music", "Hard"],
      description: "Jump, fly, and flip your way through dangerous geometric passages and spiky obstacles in sync with electrifying electronic beats.",
      iframeCode: '<div style="position:relative;width:100%;max-width:900px;aspect-ratio:16/9;"><iframe src="https://nite.games/embed/geometry-dash" style="position:absolute;inset:0;width:100%;height:100%;border:none;border-radius:8px;" allow="fullscreen; autoplay; gamepad; pointer-lock"></iframe></div>',
      iframeSrc: "https://nite.games/embed/geometry-dash",
      rating: 4.96,
      plays: 167000,
      featured: true,
      accentColor: "yellow",
      controls: [
        { key: "Spacebar / Up Arrow", action: "Jump & Boost" },
        { key: "Left Click", action: "Tap / Leap" }
      ]
    },
    {
      id: "plants-vs-zombies",
      title: "Plants vs. Zombies",
      category: "Strategy",
      tags: ["Plants vs Zombies", "Strategy", "Tower Defense", "Casual", "Zombies"],
      description: "Stem a zombie invasion using an arsenal of 49 zombie-zapping plants — peashooters, wall-nuts, cherry bombs, and sunflower solar power.",
      iframeCode: '<div style="position:relative;width:100%;max-width:900px;aspect-ratio:16/9;"><iframe src="https://nite.games/embed/plants-vs-zombies" style="position:absolute;inset:0;width:100%;height:100%;border:none;border-radius:8px;" allow="fullscreen; autoplay; gamepad; pointer-lock"></iframe></div>',
      iframeSrc: "https://nite.games/embed/plants-vs-zombies",
      rating: 4.96,
      plays: 153000,
      featured: true,
      accentColor: "emerald",
      controls: [
        { key: "Left Click", action: "Select Seed Packet & Plant" },
        { key: "Mouse Hover", action: "Harvest Sun Units" },
        { key: "Shovel", action: "Dig Up Plant" }
      ]
    },
    {
      id: "fnaf-1",
      title: "Five Nights at Freddy's",
      category: "Action",
      tags: ["FNAF", "Horror", "Survival", "Strategy", "Classic"],
      description: "Survive five night shifts as security guard at Freddy Fazbear's Pizza. Monitor surveillance cameras and manage your limited generator power.",
      iframeCode: '<div style="position:relative;width:100%;max-width:900px;aspect-ratio:16/9;"><iframe src="https://nite.games/embed/fnaf" style="position:absolute;inset:0;width:100%;height:100%;border:none;border-radius:8px;" allow="fullscreen; autoplay; gamepad; pointer-lock"></iframe></div>',
      iframeSrc: "https://nite.games/embed/fnaf",
      rating: 4.92,
      plays: 135000,
      featured: true,
      accentColor: "pink",
      controls: [
        { key: "Mouse Move", action: "Look Around Office" },
        { key: "Hover Bottom", action: "Flip Camera Monitor" },
        { key: "Click Buttons", action: "Toggle Doors & Lights" }
      ]
    },
    {
      id: "hollow-knight",
      title: "Hollow Knight",
      category: "Action",
      tags: ["Hollow Knight", "Metroidvania", "Action", "Platformer", "Adventure"],
      description: "Forge your own path in Hallownest. An epic action adventure through a vast ruined kingdom of insects and heroes.",
      iframeCode: '<div style="position:relative;width:100%;max-width:900px;aspect-ratio:16/9;"><iframe src="https://nite.games/embed/hollow-knight" style="position:absolute;inset:0;width:100%;height:100%;border:none;border-radius:8px;" allow="fullscreen; autoplay; gamepad; pointer-lock"></iframe></div>',
      iframeSrc: "https://nite.games/embed/hollow-knight",
      rating: 4.97,
      plays: 112000,
      featured: true,
      accentColor: "indigo",
      controls: [
        { key: "Arrow Keys", action: "Move" },
        { key: "Z", action: "Jump" },
        { key: "X", action: "Nail Slash" },
        { key: "C", action: "Dash" },
        { key: "A", action: "Focus / Soul Spell" }
      ]
    },
    {
      id: "drift-hunters",
      title: "Drift Hunters",
      category: "Action",
      tags: ["Drift Hunters", "Racing", "Cars", "Drifting", "3D"],
      description: "High-fidelity 3D car drifting simulation. Customize and tune iconic tuner cars, upgrade turbochargers, and rack up drift combos across 10 tracks.",
      iframeCode: '<div style="position:relative;width:100%;max-width:900px;aspect-ratio:16/9;"><iframe src="https://nite.games/embed/drift-hunters" style="position:absolute;inset:0;width:100%;height:100%;border:none;border-radius:8px;" allow="fullscreen; autoplay; gamepad; pointer-lock"></iframe></div>',
      iframeSrc: "https://nite.games/embed/drift-hunters",
      rating: 4.92,
      plays: 104000,
      featured: true,
      accentColor: "blue",
      controls: [
        { key: "WASD / Arrows", action: "Steer & Accelerate" },
        { key: "Spacebar", action: "Handbrake Drift" },
        { key: "C", action: "Change Camera View" },
        { key: "Shift / Ctrl", action: "Shift Gears" }
      ]
    },
    {
      id: "ultrakill",
      title: "Ultrakill",
      category: "Action",
      tags: ["Ultrakill", "FPS", "Fast-Paced", "Retro", "Gore"],
      description: "Mankind is dead. Blood is fuel. Hell is full. High-octane retro movement shooter combining stylish character action with hyper-violent gunplay.",
      iframeCode: '<div style="position:relative;width:100%;max-width:900px;aspect-ratio:16/9;"><iframe src="https://nite.games/embed/ultrakill" style="position:absolute;inset:0;width:100%;height:100%;border:none;border-radius:8px;" allow="fullscreen; autoplay; gamepad; pointer-lock"></iframe></div>',
      iframeSrc: "https://nite.games/embed/ultrakill",
      rating: 4.97,
      plays: 92300,
      featured: true,
      accentColor: "cyan",
      controls: [
        { key: "WASD", action: "Move" },
        { key: "Mouse", action: "Aim & Shoot" },
        { key: "Shift", action: "Air Dash" },
        { key: "Ctrl", action: "High-Speed Slide" },
        { key: "F", action: "Feedbacker Parry Punch" }
      ]
    },
    {
      id: "doom",
      title: "DOOM",
      category: "Classic",
      tags: ["DOOM", "FPS", "Retro", "Classic", "Shooter"],
      description: "The legendary 1993 pioneer of first-person shooters. Grab your shotgun, blast through hellish Martian corridors, and defeat demonic invasions.",
      iframeCode: '<div style="position:relative;width:100%;max-width:900px;aspect-ratio:16/9;"><iframe src="https://nite.games/embed/doom" style="position:absolute;inset:0;width:100%;height:100%;border:none;border-radius:8px;" allow="fullscreen; autoplay; gamepad; pointer-lock"></iframe></div>',
      iframeSrc: "https://nite.games/embed/doom",
      rating: 4.95,
      plays: 89000,
      featured: true,
      accentColor: "red",
      controls: [
        { key: "WASD / Arrows", action: "Move & Strafe" },
        { key: "Left Click / Ctrl", action: "Fire Weapon" },
        { key: "Spacebar", action: "Open Door / Switch" },
        { key: "1 - 7", action: "Select Weapons" }
      ]
    },
    {
      id: "csgo-surf",
      title: "CSGO Surf",
      category: "Action",
      tags: ["CSGO", "Surf", "FPS", "Speedrun", "3D"],
      description: "Glide smoothly across steep ramp slopes using Source-engine air-strafe physics. Master momentum, time tricks, and reach the finish line.",
      iframeCode: '<div style="position:relative;width:100%;max-width:900px;aspect-ratio:16/9;"><iframe src="https://nite.games/embed/csgo-surf" style="position:absolute;inset:0;width:100%;height:100%;border:none;border-radius:8px;" allow="fullscreen; autoplay; gamepad; pointer-lock"></iframe></div>',
      iframeSrc: "https://nite.games/embed/csgo-surf",
      rating: 4.88,
      plays: 83100,
      featured: true,
      accentColor: "sky",
      controls: [
        { key: "W / S", action: "Forward / Reverse" },
        { key: "A / D", action: "Air Strafe Balance" },
        { key: "Mouse", action: "Steer Camera" },
        { key: "Spacebar", action: "Jump" }
      ]
    },
    {
      id: "skate-3",
      title: "Skate 3",
      category: "Action",
      tags: ["Skate 3", "Skateboarding", "Sports", "3D", "Tricks"],
      description: "Hit the streets of Port Carverton. Pull off sick flip tricks, grinds, massive air on halfpipes, and build your skate legacy.",
      iframeCode: '<div style="position:relative;width:100%;max-width:900px;aspect-ratio:16/9;"><iframe src="https://nite.games/embed/skate-3" style="position:absolute;inset:0;width:100%;height:100%;border:none;border-radius:8px;" allow="fullscreen; autoplay; gamepad; pointer-lock"></iframe></div>',
      iframeSrc: "https://nite.games/embed/skate-3",
      rating: 4.91,
      plays: 76500,
      featured: true,
      accentColor: "amber",
      controls: [
        { key: "Arrow Keys / WASD", action: "Steer Skateboard" },
        { key: "Spacebar", action: "Ollie / Jump" },
        { key: "Shift", action: "Grind & Grab" }
      ]
    },
    {
      id: "granny",
      title: "Granny",
      category: "Action",
      tags: ["Granny", "Horror", "Escape", "Survival", "3D"],
      description: "Trapped inside Granny's spooky house. You must be completely quiet — she hears everything. Search for keys and escape tools before Day 5.",
      iframeCode: '<div style="position:relative;width:100%;max-width:900px;aspect-ratio:16/9;"><iframe src="https://nite.games/embed/granny" style="position:absolute;inset:0;width:100%;height:100%;border:none;border-radius:8px;" allow="fullscreen; autoplay; gamepad; pointer-lock"></iframe></div>',
      iframeSrc: "https://nite.games/embed/granny",
      rating: 4.86,
      plays: 64200,
      featured: false,
      accentColor: "red",
      controls: [
        { key: "WASD", action: "Walk / Sneak" },
        { key: "Mouse", action: "Look Around" },
        { key: "C", action: "Crouch / Stand" },
        { key: "E", action: "Interact / Pick Item" }
      ]
    },
    {
      id: "snake-retro",
      title: "Retro Snake 97",
      category: "Arcade",
      tags: ["Arcade", "Retro", "Snake", "High Score"],
      description: "The quintessential arcade classic. Slither around the grid, consume glowing power orbs, and grow your tail without hitting borders or yourself.",
      iframeCode: '<iframe src="./games/snake.html" title="Retro Snake 97" width="100%" height="100%" frameborder="0" allow="fullscreen; autoplay; gamepad" allowfullscreen></iframe>',
      iframeSrc: "./games/snake.html",
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
      iframeCode: '<iframe src="./games/2048.html" title="2048 Master" width="100%" height="100%" frameborder="0" allow="fullscreen; autoplay; gamepad" allowfullscreen></iframe>',
      iframeSrc: "./games/2048.html",
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
      iframeCode: '<iframe src="./games/space-invaders.html" title="Space Defenders" width="100%" height="100%" frameborder="0" allow="fullscreen; autoplay; gamepad" allowfullscreen></iframe>',
      iframeSrc: "./games/space-invaders.html",
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
      iframeCode: '<iframe src="./games/breakout.html" title="Neon Breakout" width="100%" height="100%" frameborder="0" allow="fullscreen; autoplay; gamepad" allowfullscreen></iframe>',
      iframeSrc: "./games/breakout.html",
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
      iframeCode: '<iframe src="./games/tetris.html" title="Block Stack" width="100%" height="100%" frameborder="0" allow="fullscreen; autoplay; gamepad" allowfullscreen></iframe>',
      iframeSrc: "./games/tetris.html",
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
      iframeCode: '<iframe src="./games/flappy.html" title="Flappy Copter" width="100%" height="100%" frameborder="0" allow="fullscreen; autoplay; gamepad" allowfullscreen></iframe>',
      iframeSrc: "./games/flappy.html",
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
      iframeCode: '<iframe src="./games/pong.html" title="Cyber Pong" width="100%" height="100%" frameborder="0" allow="fullscreen; autoplay; gamepad" allowfullscreen></iframe>',
      iframeSrc: "./games/pong.html",
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
      iframeCode: '<iframe src="./games/dino-runner.html" title="Cyber Runner" width="100%" height="100%" frameborder="0" allow="fullscreen; autoplay; gamepad" allowfullscreen></iframe>',
      iframeSrc: "./games/dino-runner.html",
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
      iframeCode: '<iframe src="./games/cookie-clicker.html" title="Orbital Energy Clicker" width="100%" height="100%" frameborder="0" allow="fullscreen; autoplay; gamepad" allowfullscreen></iframe>',
      iframeSrc: "./games/cookie-clicker.html",
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
      iframeCode: '<iframe src="./games/minesweeper.html" title="Minesweeper Retro" width="100%" height="100%" frameborder="0" allow="fullscreen; autoplay; gamepad" allowfullscreen></iframe>',
      iframeSrc: "./games/minesweeper.html",
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
