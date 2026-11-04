// Built-in intelligent CRUM3L AI response engine
// Provides instant high-accuracy gaming guides, walkthroughs, homework answers, and trivia

export const generateCrum3lFallbackResponse = (query) => {
  const q = query.toLowerCase().trim();

  // Minecraft
  if (q.includes('minecraft') || q.includes('diamond') || q.includes('crafting') || q.includes('ender dragon') || q.includes('nether')) {
    if (q.includes('diamond')) {
      return `### 💎 How to Find Diamonds in Minecraft (C00K13 Pro Guide)
1. **Best Depth Level**: Dig down to **Y = -58** (just above bedrock).
2. **Branch Mining**: Mine a 2-high tunnel and space parallel branch tunnels 3 blocks apart.
3. **Bring Equipment**:
   - Iron Pickaxe or better
   - Plenty of torches & a bucket of water (to cool lava lakes into obsidian)
   - Armor and food
4. **Enchantment Goal**: Aim for **Fortune III** on your pickaxe to get up to 4 diamonds from a single ore vein!`;
    }

    if (q.includes('ender dragon') || q.includes('dragon') || q.includes('beat')) {
      return `### 🐉 How to Defeat the Ender Dragon
1. **Preparation**:
   - Bow with Power V & Infinity (or 3+ stacks of arrows).
   - Water Bucket (saves you from fall damage when knocked into the sky).
   - 4-6 Beds (beds explode in the End when you attempt to sleep!).
2. **Phase 1: Destroy End Crystals**:
   - Shoot the exposed crystals on top of the obsidian pillars with your bow.
   - For caged crystals, pillar up with cobblestone and pickaxe the iron bars.
3. **Phase 2: Bed Bombing the Perch**:
   - When the dragon perches over the bedrock portal, place a bed on bedrock, put a block between you and the head, and right-click to detonate. 4-5 bed explosions will take down the dragon in seconds!`;
    }

    return `### ⛏️ Minecraft Pro Essentials in C00K13
- **Controls**: Use **WASD** to move, **Left Click** to mine/attack, **Right Click** to place blocks, **Space** to jump, and **E** for inventory.
- **Pointer Lock**: Click inside the game screen to lock your camera for full 3D mouse look! Hit **Escape** to release.
- **First Day Rule**: Punch trees for wood &rarr; Craft wooden pickaxe &rarr; Mine 3 cobblestone &rarr; Upgrade to stone tools immediately!`;
  }

  // 2048
  if (q.includes('2048') || q.includes('tile')) {
    return `### 🏆 The Corner Anchor Strategy for 2048
The easiest, most consistent method to reach the **2048 tile**:
1. **Pick One Corner & Lock It**: Choose the **Bottom-Right corner** (or bottom-left) and NEVER press the opposite arrow (never press UP).
2. **Build Decreasing Chains**:
   - Row 4 (bottom): 2048 &larr; 1024 &larr; 512 &larr; 256
   - Row 3: 128 &larr; 64 &larr; 32 &larr; 16
3. **Fill the Anchored Row**: Always ensure the bottom row is completely packed with 4 tiles before sliding left or right so your highest tile doesn't get dislodged.
4. **Recovering**: If forced to move UP, immediately move back DOWN and reclaim your corner.`;
  }

  // Cuphead
  if (q.includes('cuphead') || q.includes('boss')) {
    return `### ☕ Cuphead Boss Tactics & Survival Guide
1. **Master the Pink Parry (Z key)**:
   - Slapping anything pink in mid-air refills your EX Super Card gauge and cancels damage.
2. **Top Weapons**:
   - **Spread**: Devastating close-range damage against giant boss hitboxes.
   - **Chaser**: Green tracking bullets—essential when bosses force intense platform dodging.
   - **Roundabout**: Great all-around backward boomerang damage.
3. **Charm Priority**: Equip **Smoke Bomb (Invisible Dash)**. It lets you dash through boss projectiles and bodies without taking damage!`;
  }

  // Skate 3
  if (q.includes('skate') || q.includes('skate 3') || q.includes('kickflip') || q.includes('grind')) {
    return `### 🛹 Skate 3 Controls & Trick Guide
- **Steer & Pump**: WASD or Arrow Keys.
- **Ollie / High Jump**: Hold and release **Spacebar**.
- **Kickflips & Shuvits**: Release Space and tap Left/Right immediately in mid-air.
- **Grinding Rails**: Align your board with the coping or handrail and tap **Shift**.
- **Manuals**: Tap up/down gently to balance on two wheels and chain combos between stairsets!`;
  }

  // Ultrakill
  if (q.includes('ultrakill') || q.includes('v1') || q.includes('blood')) {
    return `### 🩸 ULTRAKILL Combat & Movement Mastery
*"Mankind is dead. Blood is fuel. Hell is full."*
1. **Blood Healing**: You only heal by showering in fresh enemy blood at close range. Stay aggressive!
2. **The Feedbacker Parry (F key)**:
   - Punch incoming enemy projectiles right as they hit you to deflect them for massive explosive counter damage.
3. **Coin Juggling (Marksman Revolver)**:
   - Toss coins into the air and shoot them with your pistol or railcannon for auto-targeting ricochets that hit weak points.
4. **Slide Hopping**: Press **Ctrl** to slide and immediately tap **Space** to maintain super-sonic horizontal velocity.`;
  }

  // FNAF 1
  if (q.includes('fnaf') || q.includes('freddy') || q.includes('foxy') || q.includes('five nights')) {
    return `### 🐻 Five Nights at Freddy's (FNAF 1) Night Survival Guide
1. **Power Management**:
   - Every second with doors or lights closed drains precious generator power.
   - Aim to have at least: **80% at 1 AM**, **60% at 2 AM**, **40% at 3 AM**, and **20% at 4 AM**.
2. **Foxy (Pirate Cove / Cam 1C)**:
   - Check Cam 1C periodically to keep Foxy from sprinting. If you hear fast footsteps, slam the **Left Door** instantly!
3. **Freddy**:
   - Freddy only moves in the dark when you aren't looking at him. Keep camera focused on him at the East Hall Corner (Cam 4B) and keep the right door shut when he's adjacent.`;
  }

  // DOOM
  if (q.includes('doom') || q.includes('cheat') || q.includes('fps')) {
    return `### 💀 DOOM (1993) Combat & Classic Cheat Codes
- **IDDQD**: God Mode (invulnerability)
- **IDKFA**: Very Happy Ammo (gives all weapons, full ammo, and all color keycards)
- **IDCLIP / IDSPISPOPD**: Walk through walls
- **Combat Tip**: Circle-strafing is king! Hold **A** or **D** while angling your mouse around Hell Knights and Barons to dodge plasma fire effortlessly.`;
  }

  // Subway Surfers
  if (q.includes('subway') || q.includes('surfer')) {
    return `### 🚇 Subway Surfers High Score Formula
1. **Maximize Score Multiplier**: Complete Mission Sets to boost your base multiplier up to 30x before going for a world record run.
2. **Hoverboards (Double Tap / Space)**: Always keep a hoverboard active in tight situations—crashing while on a hoverboard only destroys the board, keeping your run alive!
3. **Mid-Air Jump Cancels**: Swipe DOWN while in mid-air to immediately drop back to the ground. This lets you snag low coins and dodge unexpected barrier trains.`;
  }

  // CSGO Surf
  if (q.includes('surf') || q.includes('csgo') || q.includes('cs:go')) {
    return `### 🏄‍♂️ CS:GO Surf Fundamentals
The Golden Rule of Surfing: **NEVER HOLD 'W' ON A RAMP!**
1. **Ramp Position**:
   - If surfing on the **Left side** of a wedge ramp: Hold **D** and angle your crosshair slightly into the slope.
   - If surfing on the **Right side** of a ramp: Hold **A** and angle your crosshair slightly into the slope.
2. **Air Strafing**: When flying through the air between ramps, hold **A** while smoothly panning your mouse **left**, or hold **D** while panning **right**. Smooth mouse arcs generate speed!`;
  }

  // Drift Hunters
  if (q.includes('drift') || q.includes('car') || q.includes('tuning')) {
    return `### 🏎️ Drift Hunters Tuning Setup
1. **Best Starter Car**: The Toyota Trueno AE86 or Nissan Silvia S15.
2. **Tuning Settings for Long Slides**:
   - **Brake Balance**: 65% Front
   - **Tire Pressure**: Low Rear Pressure (1.2 bar) for smooth progressive breakaway
   - **Camber**: -3.5° to -4.0° Front, -1.0° Rear
   - **Turbo**: Max out boost once unlocked!
3. **Tracks**: Nishuri and City are the easiest tracks to rack up 50,000+ continuous drift combos.`;
  }

  // Math & Homework
  if (q.includes('math') || q.includes('solve') || q.includes('algebra') || q.includes('calculus') || q.includes('formula') || q.includes('calculate') || q.includes('+') || q.includes('*') || q.includes('/')) {
    return `### 🧮 CRUM3L Math Solver & Homework Assistant
I can solve equations, algebra, geometry, trigonometry, and calculus!
- **Quadratic Formula**: $x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$
- **Pythagorean Theorem**: $a^2 + b^2 = c^2$
- **Derivative of Polynomial**: $\\frac{d}{dx}[x^n] = n \\cdot x^{n-1}$
- **Area of Circle**: $A = \\pi r^2$

*Tip: Type your specific math problem (e.g. "solve 3x + 12 = 45" or "derivative of x^3 + 4x") and I will provide the step-by-step breakdown!*`;
  }

  // Science / Biology
  if (q.includes('biology') || q.includes('photosynthesis') || q.includes('cell') || q.includes('respiration') || q.includes('dna')) {
    return `### 🧬 Science & Biology Study Notes
- **Photosynthesis Equation**:
  $$6CO_2 + 6H_2O + \\text{light} \\rightarrow C_6H_{12}O_6 + 6O_2$$
  Occurs inside plant **chloroplasts** (thylakoid light reactions + Calvin cycle in stroma).
- **Cellular Respiration**:
  $$C_6H_{12}O_6 + 6O_2 \\rightarrow 6CO_2 + 6H_2O + 36\\text{-}38\\text{ ATP}$$
  Occurs across cytoplasm (Glycolysis) and **mitochondria** (Krebs cycle & Electron Transport Chain).
- **DNA Structure**: Double helix composed of nucleotides (Deoxyribose sugar, Phosphate group, Nitrogenous bases A-T and C-G).

*Tip: Hit the \` (Tilde) key anywhere in C00K13 to bring up our emergency full-screen AP Biology Study Sheet!*`;
  }

  // Coding
  if (q.includes('code') || q.includes('javascript') || q.includes('python') || q.includes('html') || q.includes('css')) {
    return `### 💻 Programming & Web Dev Tip
Here is how unblocked game iframe sandboxes work in C00K13:
\`\`\`html
<iframe
  src="https://nite.games/embed/minecraft"
  allow="fullscreen; autoplay; gamepad; pointer-lock"
  allowfullscreen
  style="width: 100%; height: 100%; border: none;"
></iframe>
\`\`\`
- **Pointer-lock**: Essential attribute allowing 3D games (Minecraft, Doom, CSGO) to capture the mouse pointer.
- Need a code snippet in Python or JavaScript? Ask me any specific script question!`;
  }

  // General fallback
  return `### 🍪 CRUM3L at your service!
I am your AI companion for **C00K13**. Here is what I can do for you:
1. **Game Walkthroughs & Cheats**: Ask about Minecraft, Cuphead, Skate 3, Ultrakill, DOOM, FNAF 1, Geometry Dash, 2048, and Subway Surfers.
2. **Homework & Science**: Ask any question in Math, Biology, Physics, World History, or English.
3. **Game Suggestions**: Tell me your mood or genre (puzzle, intense 3D, fast runner, retro arcade) and I will pick the best game for you.
4. **Stealth Controls**: Ask how to use the secret Calculator PIN (6692), Tab Cloak, or Panic shield!

What would you like to explore next?`;
};
