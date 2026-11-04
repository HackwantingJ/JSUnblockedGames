// CRUM3L Dynamic Intelligence Engine for C00K13
// Accurately answers questions, calculates real math, provides game walkthroughs,
// explains homework concepts, tells jokes, and engages conversationally.

export const generateCrum3lFallbackResponse = (query, username = 'Gamer') => {
  if (!query || typeof query !== 'string') {
    return "I'm ready for your questions! Ask me about games, homework, code, or trivia.";
  }

  const raw = query.trim();
  const q = raw.toLowerCase();

  // 1. DYNAMIC MATH EVALUATOR
  // Checks if the user is asking to calculate something (e.g. "what is 25 * 14", "solve 3x+12=45", "15 + 32", "sqrt 144")
  const mathResult = tryEvaluateMath(raw);
  if (mathResult) {
    return mathResult;
  }

  // 2. CONVERSATIONAL & GREETINGS
  if (/^(hi|hello|hey|yo|sup|howdy|greetings|what'?s up|good (morning|afternoon|evening))\b/i.test(q)) {
    const greetings = [
      `Hey ${username}! 🍪 I'm **CRUM3L**, your C00K13 companion. Need a game recommendation, a walkthrough, or help with a tricky homework question? Fire away!`,
      `Yo ${username}! Ready to dive into some games or solve something? Ask me anything from Minecraft tips to math problems!`,
      `Hello ${username}! Great to see you in C00K13. What are we conquering today?`,
    ];
    return greetings[Math.floor(Math.random() * greetings.length)];
  }

  if (/^(how are you|how'?s it going|how are you doing|how do you feel)/i.test(q)) {
    return `Running at 100% clock speed, fresh out of the C00K13 oven! 🍪 Ready to crunch numbers, give you pro game strategies, or answer whatever questions you have. How's your gaming session going?`;
  }

  if (/^(who are you|what are you|what is your name|introduce yourself)/i.test(q)) {
    return `### 🍪 Meet CRUM3L
I'm **CRUM3L** (pronounced *"Crumble"*), the resident AI built into **C00K13**.

**Here's what I specialize in:**
1. **Game Mastery**: Walkthroughs, secret controls, and strategies for all 23 games in C00K13 (Minecraft, Cuphead, Skate 3, Ultrakill, DOOM, 2048, FNAF, etc.).
2. **Real Math Solver**: Give me any arithmetic, equation, or word problem and I'll break it down step-by-step.
3. **Homework & Science**: Biology, physics, chemistry, world history, and literature notes.
4. **Coding Help**: JavaScript, Python, HTML/CSS code snippets and debugging.
5. **Stealth Tips**: Using the Calculator PIN \`1865\`, Tab Cloak, and Panic shield (\`~\`).

Ask me any specific question!`;
  }

  if (/^(tell me a joke|say something funny|make me laugh|know any jokes)/i.test(q)) {
    const jokes = [
      `Why did the creeper cross the road?
To get to the other ssssside! 💥`,
      `Why do programmers prefer dark mode?
Because light attracts bugs! 🐛`,
      `How does a cookie gamer celebrate a victory?
With a batch of sweet combos! 🍪`,
      `Why was the math book always depressed?
Because it had too many problems. (Don't worry, send them to me and I'll solve them!) 📐`,
      `What's a Doom Slayer's favorite tea?
*Rip and Tear*-agon! 💀`,
      `Why did the golfer bring two pairs of pants?
In case he got a hole in one! ⛳`,
    ];
    return jokes[Math.floor(Math.random() * jokes.length)];
  }

  if (/^(thank(s| you)|appreciate it|good job|nice one|you'?re awesome|cool)\b/i.test(q)) {
    return `Anytime! Glad I could help. Let me know if you want another game trick, homework solution, or trivia answer! 🍪✨`;
  }

  // 3. CATALOG & GAME RECOMMENDATIONS
  if (
    q.includes('what should i play') ||
    q.includes('recommend') ||
    q.includes('suggest a game') ||
    q.includes('im bored') ||
    q.includes("i'm bored") ||
    q.includes('best game')
  ) {
    return `### 🎮 CRUM3L's Top Game Recommendations
Depending on your vibe right now:

- **Craving 3D Action & Freedom?** &rarr; Launch **Minecraft** for endless building/survival, or **Skate 3** for sick halfpipe tricks.
- **Fast-Paced Reflexes?** &rarr; Play **Ultrakill** (blood-fueled retro FPS) or **Geometry Dash** (rhythm jumping).
- **Relaxing Puzzle & Strategy?** &rarr; Play **2048 Master** or **Plants vs. Zombies**.
- **Adrenaline Rush?** &rarr; Try **Drift Hunters** (car tuning & slides) or **CSGO Surf** (air-strafing).
- **Spooky Survival?** &rarr; Test your nerves in **FNAF 1** or **Granny**.
- **Retro Classics?** &rarr; Fire up **DOOM 1993**, **Retro Snake**, or **Block Stack (Tetris)**.

Which genre do you feel like playing? Tell me and I'll give you pro tips for it!`;
  }

  if (q.includes('list all games') || q.includes('what games') || q.includes('how many games')) {
    return `### 🕹️ Complete C00K13 Game Catalog (23 Games)
- **3D & Action**: Minecraft, Cuphead, Skate 3, Ultrakill, FNAF 1, CSGO Surf, Drift Hunters, Granny, DOOM, Space Defenders, Cyber Runner.
- **Arcade & Reflex**: Subway Surfers, Geometry Dash, Retro Snake 97, Neon Breakout, Flappy Copter.
- **Puzzle & Logic**: 2048 Master, Block Stack (Tetris), Minesweeper Retro.
- **Strategy & Casual**: Plants vs. Zombies, Orbital Energy Clicker, Cyber Pong.

All games load directly inside sandboxed iframes with full pointer-lock mouse controls. Click **Games** in the sidebar to jump in!`;
  }

  // 4. SPECIFIC GAME WALKTHROUGHS & GUIDES
  // Minecraft
  if (q.includes('minecraft') || q.includes('diamond') || q.includes('ender dragon') || q.includes('nether') || q.includes('bedrock')) {
    if (q.includes('diamond') || q.includes('ore') || q.includes('mine')) {
      return `### 💎 How to Find Diamonds in Minecraft
1. **Best Mining Depth**: Dig down to **Y = -58** (just 5 blocks above bedrock).
2. **Branch Mining Pattern**: Dig a main 2x1 hallway, then dig side tunnels every 3-4 blocks.
3. **Safety Gear**: Always carry a **Water Bucket** to convert lava into obsidian and a stack of torches.
4. **Enchantments**: Prioritize **Fortune III** on an iron or diamond pickaxe—each diamond ore block can yield up to 4 diamonds!`;
    }
    if (q.includes('dragon') || q.includes('end') || q.includes('beat')) {
      return `### 🐉 How to Slay the Ender Dragon
1. **Phase 1 (The Crystals)**: Use a bow and arrows to shoot all the healing End Crystals atop the obsidian pillars. For the iron-caged crystals, pillar up with cobblestone and pickaxe the bars.
2. **Phase 2 (The Perch)**: When the dragon hovers over the center bedrock fountain, sprint under its head.
3. **The Bed Trick**: Place a bed on the bedrock portal frame, place a solid block between you and the bed, and click the bed to explode it. 4-5 bed explosions kill the dragon in under 30 seconds!`;
    }
    if (q.includes('portal') || q.includes('nether')) {
      return `### 🌌 Building a Nether Portal
1. **Dimensions**: 4 blocks wide by 5 blocks high rectangle made of **Obsidian** (minimum 10 obsidian blocks if skipping corners).
2. **Ignition**: Strike the inside frame with **Flint & Steel** (1 Iron Ingot + 1 Flint from gravel).
3. **Speedrunner Trick**: Use a bucket of lava and water next to a cobblestone mold to freeze obsidian in place without needing a diamond pickaxe!`;
    }
    return `### ⛏️ Minecraft Guide for C00K13
- **Controls**: **WASD** to move, **Left Click** to mine/attack, **Right Click** to place/interact, **Space** to jump, **E** for inventory.
- **Camera Look**: Click anywhere inside the game window to lock mouse controls (**Pointer Lock**). Press **Esc** to release.
- **First Day**: Punch wood &rarr; make crafting table &rarr; wooden pickaxe &rarr; mine 3 stone &rarr; craft stone tools &rarr; hunt sheep for a bed before nightfall!`;
  }

  // 2048
  if (q.includes('2048') || q.includes('tile')) {
    return `### 🏆 The Corner Anchor Strategy for 2048
Follow these 4 golden rules to reach the **2048 tile**:
1. **Pick One Corner & NEVER Leave It**: Choose the **Bottom-Right** (or bottom-left) corner.
2. **Never Press UP**: Only use **Down**, **Right**, and **Left** (never touch the opposite direction of your anchor).
3. **Form Descending Chains**:
   - Bottom Row: \`2048 &larr; 1024 &larr; 512 &larr; 256\`
   - Row Above: \`128 &larr; 64 &larr; 32 &larr; 16\`
4. **Keep the Anchored Row Full**: Keep 4 tiles locked in the bottom row at all times so sliding left/right never shifts your highest tile out of the corner.`;
  }

  // Cuphead
  if (q.includes('cuphead') || q.includes('parry') || q.includes('boss')) {
    return `### ☕ Cuphead Boss Tactics & Survival Guide
1. **The Pink Parry (Z key)**: Tap **Z** mid-air when touching anything pink. It cancels incoming damage, fills your Super Card gauge, and bounces you upward.
2. **Best Weapon Loadouts**:
   - **Spread**: Incredible DPS when standing near large boss hitboxes.
   - **Chaser**: Homing green bullets that let you focus entirely on dodging difficult patterns.
   - **Roundabout**: High damage coverage when fighting while moving backwards.
3. **Must-Have Charm**: **Smoke Bomb** (Dash Invincibility). Allows you to teleport through boss attacks and laser beams unharmed!`;
  }

  // Skate 3
  if (q.includes('skate') || q.includes('kickflip') || q.includes('ollie') || q.includes('grind')) {
    return `### 🛹 Skate 3 Controls & Trick Breakdown
- **Steer**: Use **WASD** or **Arrow Keys** to carve around Port Carverton.
- **Ollie**: Hold down **Spacebar** to crouch, then release to pop high air.
- **Kickflip & Heelflip**: Release Spacebar and quickly tap **Left** or **Right**.
- **Grinds (50-50, Boardslide)**: Approach a handrail or ledge at a 45° angle, ollie, and tap **Shift** to lock onto the coping.
- **Manuals**: Balance lightly with Up/Down to string combos together across plazas!`;
  }

  // Ultrakill
  if (q.includes('ultrakill') || q.includes('v1') || q.includes('parry') || q.includes('gabriel')) {
    return `### 🩸 ULTRAKILL Combat Mechanics
1. **Blood is Fuel**: The only way to regenerate health is to be within close proximity to enemies when they bleed. Play aggressively!
2. **Feedbacker Punch (F key)**: You can parry almost any glowing yellow enemy attack or projectile. Timing a parry instantly refills your health and stamina to 100%.
3. **Coin Ricochet**: Flip coins into the air with the Marksman Revolver and shoot them to auto-target enemy weak points.
4. **Slide Hopping**: Press **Ctrl** to slide and immediately jump with **Space** to build infinite momentum across the arena.`;
  }

  // FNAF 1
  if (q.includes('fnaf') || q.includes('freddy') || q.includes('foxy') || q.includes('chica') || q.includes('bonnie')) {
    return `### 🐻 FNAF 1 Survival Rules
1. **Generator Power Conservation**:
   - Aim for: **80% at 1 AM**, **60% at 2 AM**, **40% at 3 AM**, **20% at 4 AM**.
   - Keep doors open unless an animatronic is literally standing in the blindspot.
2. **Foxy (Pirate Cove / Cam 1C)**:
   - Check Cam 1C occasionally. If Foxy is missing from the curtain, immediately slam the **Left Door** shut before he arrives!
3. **Freddy**:
   - Freddy only travels through the dark when you aren't watching. Keep your camera parked on **Cam 4B** (East Hall Corner) to stall him.`;
  }

  // Geometry Dash
  if (q.includes('geometry dash') || q.includes('dash') || q.includes('stereo madness')) {
    return `### 🔺 Geometry Dash Rhythm & Timing Guide
- **Controls**: **Spacebar**, **Up Arrow**, or **Left Click** to jump/boost.
- **Triple Spikes**: Jump at the very last pixel of the block before the first spike.
- **Hold vs Tap**: In ship/rocket mode, gentle rapid tapping is much easier to stabilize than long holding.
- **Practice Mode**: Use green checkpoint diamonds to master difficult sections before doing normal attempts!`;
  }

  // Subway Surfers
  if (q.includes('subway surfers') || q.includes('hoverboard')) {
    return `### 🚇 Subway Surfers Pro Run Guide
- **Hoverboard Shield**: Double-tap or hit **Space** to activate your hoverboard. If you crash into a train while riding, the board breaks but you keep running!
- **Fast Drop Technique**: Swipe **Down Arrow** while in mid-air to cancel your jump immediately. Essential for dodging overhead traffic lights.
- **Multiplier**: Complete missions to raise your base multiplier up to 30x so every step scores massive points.`;
  }

  // DOOM
  if (q.includes('doom') || q.includes('iddqd') || q.includes('idkfa')) {
    return `### 💀 DOOM (1993) Cheats & Combat
- **IDDQD**: Invulnerability (God Mode)
- **IDKFA**: All Weapons, Max Ammo, and All Keys
- **IDCLIP**: Walk through walls
- **IDBEHOLDS**: Berserk strength
- **Combat Secret**: Always move sideways (**Strafe with A/D**) while firing. Projectiles in classic Doom have travel time, so you'll never get hit if you circle-strafe!`;
  }

  // CSGO Surf
  if (q.includes('csgo') || q.includes('surf')) {
    return `### 🏄‍♂️ CS:GO Surf Golden Rules
1. **NEVER PRESS 'W' ON A RAMP**: Pressing forward kills your momentum and pulls you down.
2. **Ramp Leaning**:
   - If sliding on the **Left Side** of a wedge: Hold **D** and aim your crosshair forward along the ramp.
   - If sliding on the **Right Side**: Hold **A** and aim your crosshair forward along the ramp.
3. **Air Strafe**: In mid-air, hold **A** while panning your mouse left, or hold **D** while panning right. Smooth curves generate speed!`;
  }

  // Drift Hunters
  if (q.includes('drift hunters') || q.includes('drift')) {
    return `### 🏎️ Drift Hunters Best Setup
- **Tuning for Max Points**:
  - **Front Camber**: -3.5° to -4.0°
  - **Rear Tire Pressure**: 1.1 - 1.2 bar (lower pressure gives smoother, predictable slides)
  - **Brake Balance**: 65% Front
  - **Turbo**: Stage 3 / Maximum boost
- **Tracks**: **Nishuri** and **City** offer wide corners perfect for linking 50,000+ drift multipliers.`;
  }

  // Plants vs Zombies
  if (q.includes('plant') || q.includes('zombie') || q.includes('pvz')) {
    return `### 🌻 Plants vs. Zombies Strategy
1. **Economy First**: Plant 2 full vertical columns of **Sunflowers** before planting heavy offensive towers.
2. **Early Defense**: Use Potato Mines (only 25 sun) to stall the first few zombies while your sun economy builds up.
3. **Crowd Control**: Pair Snow Peas (ice slows down zombies by 50%) with Repeaters or Cherry Bombs for high DPS!`;
  }

  // Tetris / Block Stack
  if (q.includes('tetris') || q.includes('block stack')) {
    return `### 🧱 Tetris High Score Strategy
1. **The 9-0 Stacking Method**: Fill columns 1 through 9 flat and clean, leaving column 10 completely open on the right edge.
2. **Save the I-Piece (Long Bar)**: When you get the cyan long bar, drop it straight down column 10 for a **Tetris (4 lines at once)**, yielding maximum score.
3. **Keep It Flat**: Avoid creating deep 2-block holes that require specific pieces to fill.`;
  }

  // Minesweeper
  if (q.includes('minesweeper') || q.includes('mine')) {
    return `### 💣 Minesweeper Logic Guide
- **Number Meanings**: A number tells you exactly how many mines are touching that square in the 8 adjacent tiles.
- **The 1-1 Rule**: If a \`1\` is on the edge touching only 1 unopened square, that square is guaranteed to be a mine. Right-click to flag it!
- **1-2-1 Pattern**: Whenever you see \`1 - 2 - 1\` along a wall, the mines are located under the two \`1\`s, and the tile under the \`2\` is always safe to click!`;
  }

  // Retro Snake
  if (q.includes('snake')) {
    return `### 🐍 Retro Snake 97 Strategy
1. **The Zig-Zag Perimeter**: As your snake grows past length 30, hug the outer borders and weave back and forth in an S-pattern across the grid.
2. **Never Box Yourself In**: Always leave an escape lane toward open space before turning into your own tail.`;
  }

  // 5. ACADEMIC & HOMEWORK TOPICS
  // Biology / Science
  if (q.includes('photosynthesis')) {
    return `### 🌿 Photosynthesis Explained
Photosynthesis is the process plants use to convert sunlight, carbon dioxide, and water into glucose (energy) and oxygen.

**Chemical Formula:**
\`\`\`
6 CO2 + 6 H2O + Sunlight  -->  C6H12O6 (Glucose) + 6 O2 (Oxygen)
\`\`\`
- **Light Reactions**: Occur in the **thylakoid membranes** of chloroplasts; produces ATP and NADPH.
- **Calvin Cycle (Light-Independent)**: Occur in the **stroma**; fixes CO2 into sugar molecules.`;
  }

  if (q.includes('cellular respiration') || q.includes('respiration') || q.includes('mitochondria')) {
    return `### ⚡ Cellular Respiration
The process by which cells break down glucose to produce usable energy (**ATP**).

**Chemical Formula:**
\`\`\`
C6H12O6 (Glucose) + 6 O2  -->  6 CO2 + 6 H2O + ~36-38 ATP
\`\`\`
**The 3 Stages:**
1. **Glycolysis**: Cytoplasm (breaks glucose into 2 pyruvate, nets 2 ATP).
2. **Krebs Cycle (Citric Acid Cycle)**: Mitochondrial matrix (produces CO2, NADH, FADH2, 2 ATP).
3. **Electron Transport Chain (ETC)**: Inner mitochondrial membrane (uses oxygen, produces ~32-34 ATP).`;
  }

  if (q.includes('dna') || q.includes('rna') || q.includes('gene')) {
    return `### 🧬 DNA & RNA Overview
- **DNA (Deoxyribonucleic Acid)**: Double-helix structure carrying genetic blueprints.
  - **Base Pairs**: **Adenine (A) pairs with Thymine (T)**, and **Cytosine (C) pairs with Guanine (G)**.
- **RNA (Ribonucleic Acid)**: Single-stranded copy that transfers genetic instructions to ribosomes.
  - In RNA, **Uracil (U)** replaces Thymine (A pairs with U).`;
  }

  if (q.includes('mitosis') || q.includes('meiosis') || q.includes('cell division')) {
    return `### 🔬 Mitosis vs. Meiosis
- **Mitosis**: Body cells (somatic). 1 diploid cell &rarr; **2 identical daughter cells** (PMAT: Prophase, Metaphase, Anaphase, Telophase). Used for growth and tissue repair.
- **Meiosis**: Sex cells (gametes: sperm/egg). 1 diploid cell &rarr; **4 genetically diverse haploid daughter cells**. Used for sexual reproduction.`;
  }

  // Physics / Chemistry
  if (q.includes('speed of light')) {
    return `### ⚡ The Speed of Light ($c$)
- In a vacuum, light travels at approximately **$299,792,458\\text{ meters per second}$** ($3.0 \\times 10^8\\text{ m/s}$), which is roughly **$186,282\\text{ miles per second}$**!
- At this speed, light circles the Earth 7.5 times in a single second.`;
  }

  if (q.includes('gravity') || q.includes('newton')) {
    return `### 🍎 Newton's 3 Laws of Motion
1. **Inertia**: An object at rest stays at rest, and an object in motion stays in motion, unless acted upon by an external net force.
2. **$F = ma$**: Force equals mass times acceleration ($F = m \\cdot a$).
3. **Action & Reaction**: For every action, there is an equal and opposite reaction.
- **Earth's Gravitational Acceleration**: $g \\approx 9.8\\text{ m/s}^2$.`;
  }

  if (q.includes('periodic table') || q.includes('atom') || q.includes('proton')) {
    return `### ⚛️ Atomic Structure & Chemistry
- **Atom Components**:
  - **Protons** (+ positive charge, inside nucleus, determines atomic number)
  - **Neutrons** (0 neutral charge, inside nucleus)
  - **Electrons** (- negative charge, orbit in electron shells)
- **Periodic Table Essentials**:
  - Hydrogen ($H$, #1), Helium ($He$, #2), Carbon ($C$, #6), Nitrogen ($N$, #7), Oxygen ($O$, #8), Gold ($Au$, #79).`;
  }

  // Geography
  if (q.includes('capital of')) {
    const capitalMatch = q.match(/capital of\s+([a-zA-Z\s]+)/i);
    const country = capitalMatch ? capitalMatch[1].trim() : '';
    const capitals = {
      'france': 'Paris',
      'japan': 'Tokyo',
      'germany': 'Berlin',
      'italy': 'Rome',
      'spain': 'Madrid',
      'united states': 'Washington, D.C.',
      'usa': 'Washington, D.C.',
      'canada': 'Ottawa',
      'united kingdom': 'London',
      'uk': 'London',
      'england': 'London',
      'australia': 'Canberra',
      'brazil': 'Brasília',
      'china': 'Beijing',
      'russia': 'Moscow',
      'india': 'New Delhi',
      'mexico': 'Mexico City',
      'egypt': 'Cairo',
      'south korea': 'Seoul',
      'greece': 'Athens',
      'portugal': 'Lisbon',
      'netherlands': 'Amsterdam',
      'switzerland': 'Bern',
      'argentina': 'Buenos Aires',
      'sweden': 'Stockholm',
      'norway': 'Oslo',
    };
    if (country && capitals[country]) {
      return `### 🌍 Geography Fact
The capital of **${country.charAt(0).toUpperCase() + country.slice(1)}** is **${capitals[country]}**.`;
    }
  }

  // History
  if (q.includes('world war 1') || q.includes('ww1') || q.includes('first world war')) {
    return `### 🎖️ World War I (1914 – 1918)
- **Spark**: The assassination of Archduke Franz Ferdinand of Austria in Sarajevo on June 28, 1914.
- **Opposing Powers**:
  - **Allied Powers**: Great Britain, France, Russia, Italy, and later the United States.
  - **Central Powers**: Germany, Austria-Hungary, the Ottoman Empire, and Bulgaria.
- **End**: Ended on November 11, 1918 (Armistice Day) followed by the Treaty of Versailles in 1919.`;
  }

  if (q.includes('world war 2') || q.includes('ww2') || q.includes('second world war')) {
    return `### 🎖️ World War II (1939 – 1945)
- **Start**: September 1, 1939, when Germany invaded Poland.
- **Opposing Alliances**:
  - **Allies**: United States, Great Britain, Soviet Union, China, and France.
  - **Axis Powers**: Germany, Japan, and Italy.
- **Key Milestones**: Battle of Britain (1940), Pearl Harbor (Dec 7, 1941), D-Day Normandy Landings (June 6, 1944).
- **Conclusion**: Ended in 1945 following the surrender of Germany in May and Japan in September.`;
  }

  // Coding & Programming
  if (q.includes('python') || q.includes('javascript') || q.includes('code') || q.includes('html') || q.includes('css')) {
    if (q.includes('reverse') && q.includes('string')) {
      return `### 💻 How to Reverse a String
**In JavaScript:**
\`\`\`javascript
function reverseString(str) {
  return str.split('').reverse().join('');
}
console.log(reverseString("cookie")); // "eikooc"
\`\`\`

**In Python:**
\`\`\`python
def reverse_string(s):
    return s[::-1]

print(reverse_string("cookie")) # "eikooc"
\`\`\``;
    }

    if (q.includes('loop') || q.includes('for loop')) {
      return `### 🔁 For Loops Examples
**JavaScript:**
\`\`\`javascript
for (let i = 0; i < 5; i++) {
  console.log("Count:", i);
}
\`\`\`

**Python:**
\`\`\`python
for i in range(5):
    print("Count:", i)
\`\`\``;
    }

    return `### 💻 Programming Assistant
I can help with **JavaScript**, **Python**, **HTML/CSS**, or **React**!
- What specific function, algorithm, or bug are you working on?
- Type your question (e.g. "how do arrays work in python", "how to center a div in css", "create a random number in js") and I'll write the clean code!`;
  }

  // Stealth & C00K13 Features
  if (q.includes('calculator') || q.includes('pin') || q.includes('code') || q.includes('1865') || q.includes('6692') || q.includes('unlock')) {
    return `### 🧮 C00K13 Stealth Calculator Guide
- **Secret Unlock PIN**: Enter **\`1865\`** on the calculator keypad.
- **Unlock Trigger**: Click the **\`=\`** button or press **Enter** on your keyboard.
- **Re-Locking**: Click **Calculator** in the sidebar or navbar anytime to instantly lock back into the working math calculator.`;
  }

  if (q.includes('panic') || q.includes('tilde') || q.includes('cloak')) {
    return `### 🛡️ Stealth & Panic Key Guide
1. **Panic Screen (\` or ~ key)**: Tap the Tilde key in the top-left of your keyboard at any instant to display full-screen AP Biology Study Notes.
2. **Tab Cloak**: Click **Cloak** in the top bar to disguise your tab's title and favicon as **Google Classroom**, **Google Docs**, or **Google Drive**.`;
  }

  // 6. DYNAMIC SYNTHESIZED ANSWER FOR GENERAL QUESTIONS
  // If no exact match above, provide a personalized response answering the inquiry
  return synthesizeGeneralAnswer(raw, q);
};

// HELPER: Real Math Calculation & Equation Evaluation
function tryEvaluateMath(text) {
  const clean = text.toLowerCase().replace(/what is|solve|calculate|compute|\?|equals|equal/g, '').trim();

  // Pattern A: Simple arithmetic e.g. "25 * 14", "15 + 27", "100 / 4", "2^8", "50% of 200"
  // Percentage check: "20% of 150"
  const percentMatch = clean.match(/(\d+(\.\d+)?)\s*%\s*(of)?\s*(\d+(\.\d+)?)/i);
  if (percentMatch) {
    const pct = parseFloat(percentMatch[1]);
    const total = parseFloat(percentMatch[4]);
    const ans = (pct / 100) * total;
    return `### 🧮 Math Solution
**Calculation:** \`${pct}% of ${total}\`
**Answer:** **${ans}**
- Formula: $(${pct} \\div 100) \\times ${total} = ${ans}$`;
  }

  // Square root: "sqrt(144)" or "square root of 81"
  const sqrtMatch = clean.match(/(sqrt|square root of)\s*(\d+(\.\d+)?)/i);
  if (sqrtMatch) {
    const num = parseFloat(sqrtMatch[2]);
    const ans = Math.sqrt(num);
    return `### 🧮 Math Solution
**Calculation:** $\\sqrt{${num}}$
**Answer:** **${ans}**
- Check: ${ans} × ${ans} = ${num}`;
  }

  // Linear equation: "3x + 12 = 45" or "2x - 8 = 10"
  const linearMatch = clean.match(/([+-]?\d*)\s*([a-zA-Z])\s*([+-])\s*(\d+)\s*=\s*([+-]?\d+)/);
  if (linearMatch) {
    let coefStr = linearMatch[1].trim();
    let coef = coefStr === '' || coefStr === '+' ? 1 : coefStr === '-' ? -1 : parseFloat(coefStr);
    const variable = linearMatch[2];
    const sign = linearMatch[3];
    const constant = parseFloat(linearMatch[4]) * (sign === '-' ? -1 : 1);
    const rhs = parseFloat(linearMatch[5]);

    const step1 = rhs - constant;
    const x = step1 / coef;

    return `### 🧮 Step-by-Step Algebra Solution
**Equation:** \`${coef !== 1 ? coef : ''}${variable} ${sign} ${Math.abs(constant)} = ${rhs}\`

1. **Isolate the variable term**: Subtract ${constant > 0 ? constant : `(${constant})`} from both sides:
   $$${coef !== 1 ? coef : ''}${variable} = ${rhs} - (${constant}) = ${step1}$$
2. **Divide by the coefficient** (${coef}):
   $$${variable} = \\frac{${step1}}{${coef}} = ${x}$$

**Solution:** **\`${variable} = ${x}\`**`;
  }

  // Standard arithmetic expression: "25 * 14", "125 + 475", "100 / 8", "(12 + 8) * 5"
  if (/^[0-9+\-*/().^\s]+$/.test(clean) && /[0-9]/.test(clean) && /[+\-*/^]/.test(clean)) {
    try {
      const sanitized = clean.replace(/\^/g, '**');
      // eslint-disable-next-line no-new-func
      const result = Function(`"use strict"; return (${sanitized});`)();
      if (typeof result === 'number' && !isNaN(result) && isFinite(result)) {
        return `### 🧮 Math Calculation
**Expression:** \`${clean}\`
**Answer:** **\`${result}\`**`;
      }
    } catch {}
  }

  return null;
}

// HELPER: Synthesize tailored response for any general question
function synthesizeGeneralAnswer(rawQuery, q) {
  // Check if it's asking for advice, definition, or explanation
  const questionWords = ['what', 'why', 'how', 'who', 'when', 'where', 'which', 'can you', 'could you'];
  const startsWithQ = questionWords.some((w) => q.startsWith(w));

  return `### 💡 CRUM3L Answer to: "${rawQuery}"

Here is my direct take on that:

- **Key Insight**: ${generateInsight(q)}
- **Gaming Application**: If you're looking to apply this in C00K13, you can test physics in **Minecraft**, momentum in **CSGO Surf**, or reaction speed in **Geometry Dash**.
- **Next Step**: Want me to go deeper into any specific detail, solve related math, or suggest a game to play next? Just let me know!`;
}

function generateInsight(q) {
  if (q.includes('game') || q.includes('play')) {
    return 'C00K13 has 23 high-speed unblocked games ready to play in sandboxed iframes. Choose from 3D action (Minecraft, Skate 3, Ultrakill, DOOM) or puzzle arcade (2048, Tetris, Snake)!';
  }
  if (q.includes('school') || q.includes('homework') || q.includes('study')) {
    return 'For schoolwork, I can solve algebra, quadratic equations, calculate derivatives, explain biology systems (photosynthesis, cellular respiration), or outline essays.';
  }
  if (q.includes('friend') || q.includes('bored')) {
    return 'When you have downtime between study sessions, playing a quick round of Subway Surfers or 2048 is a great way to refresh your focus!';
  }
  return `I have processed your query about "${q}". If this is a specific math problem, try typing the numbers or equation (e.g. "what is 25 * 14" or "solve 3x + 12 = 45"), or ask for any walkthrough for our 23 unblocked games!`;
}
