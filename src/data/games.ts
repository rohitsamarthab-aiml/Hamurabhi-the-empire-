// ─────────────────────────────────────────────────────────────
// Central mock-data file for the Nexus Gaming Platform
// Every page imports from here — no duplicated game data.
// ─────────────────────────────────────────────────────────────

export type GameCategory =
  | "Action"
  | "Adventure"
  | "RPG"
  | "Strategy"
  | "Puzzle"
  | "Racing"
  | "Sports"
  | "Simulation"
  | "Horror"
  | "Multiplayer"
  | "Indie"
  | "Shooter";

export type DeliveryMode = "browser" | "download";
export type AccessTier = "free" | "premium";

export interface GameScreenshot {
  id: string;
  alt: string;
  gradient: string; // CSS gradient for placeholder
}

export interface SystemRequirements {
  os: string;
  processor: string;
  memory: string;
  graphics: string;
  storage: string;
}

export interface Game {
  id: string;
  title: string;
  slug: string;
  description: string;
  longDescription: string;
  categories: GameCategory[];
  deliveryMode: DeliveryMode;
  accessTier: AccessTier;
  rating: number; // 0-5
  players: string; // e.g. "1 Player", "1-4 Players"
  developer: string;
  publisher: string;
  releaseDate: string;
  version: string;
  fileSize: string;
  coverGradient: string; // CSS gradient for placeholder cover
  heroGradient: string;
  accentColor: string;
  screenshots: GameScreenshot[];
  systemRequirements?: SystemRequirements;
  isFeatured: boolean;
  isTrending: boolean;
  isNew: boolean;
}

// ─── Colour palettes for game cards ───────────────────────
const gradients = {
  cyberpunk: "linear-gradient(135deg, #0f0c29, #302b63, #24243e)",
  fire: "linear-gradient(135deg, #f12711, #f5af19)",
  ocean: "linear-gradient(135deg, #0052D4, #4364F7, #6FB1FC)",
  neon: "linear-gradient(135deg, #B721FF, #21D4FD)",
  forest: "linear-gradient(135deg, #134E5E, #71B280)",
  sunset: "linear-gradient(135deg, #ee0979, #ff6a00)",
  midnight: "linear-gradient(135deg, #0F2027, #203A43, #2C5364)",
  aurora: "linear-gradient(135deg, #43cea2, #185a9d)",
  ember: "linear-gradient(135deg, #CB356B, #BD3F32)",
  cosmic: "linear-gradient(135deg, #7F00FF, #E100FF)",
  arctic: "linear-gradient(135deg, #2193b0, #6dd5ed)",
  volcanic: "linear-gradient(135deg, #EB3349, #F45C43)",
  deep: "linear-gradient(135deg, #141E30, #243B55)",
  jade: "linear-gradient(135deg, #11998e, #38ef7d)",
  royal: "linear-gradient(135deg, #4A00E0, #8E2DE2)",
  steel: "linear-gradient(135deg, #485563, #29323c)",
};

export const games: Game[] = [
  {
    id: "1",
    title: "Cyber Nexus 2088",
    slug: "cyber-nexus-2088",
    description: "Explore a vast cyberpunk metropolis in this open-world action RPG set in a dystopian future.",
    longDescription: "In the neon-drenched streets of Neo Tokyo 2088, you are a rogue hacker fighting against the megacorporations that control every aspect of human life. Cyber Nexus 2088 combines breathtaking open-world exploration with deep RPG mechanics, allowing you to customize your character with cybernetic augmentations, hack into corporate networks, and make choices that shape the fate of an entire city. With a dynamic day-night cycle, hundreds of side quests, and a branching narrative with multiple endings, every playthrough is unique.",
    categories: ["Action", "RPG"],
    deliveryMode: "download",
    accessTier: "premium",
    rating: 4.8,
    players: "1 Player",
    developer: "Neon Forge Studios",
    publisher: "Nexus Games",
    releaseDate: "2026-03-15",
    version: "1.2.4",
    fileSize: "65 GB",
    coverGradient: gradients.cyberpunk,
    heroGradient: "linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)",
    accentColor: "#B721FF",
    screenshots: [
      { id: "s1", alt: "Neo Tokyo cityscape at night", gradient: gradients.neon },
      { id: "s2", alt: "Combat sequence in the underground", gradient: gradients.cosmic },
      { id: "s3", alt: "Character customization screen", gradient: gradients.cyberpunk },
      { id: "s4", alt: "Hacking minigame interface", gradient: gradients.arctic },
    ],
    systemRequirements: {
      os: "Windows 10/11 64-bit",
      processor: "Intel Core i7-10700K / AMD Ryzen 7 5800X",
      memory: "16 GB RAM",
      graphics: "NVIDIA RTX 3070 / AMD RX 6800 XT",
      storage: "65 GB SSD",
    },
    isFeatured: true,
    isTrending: true,
    isNew: false,
  },
  {
    id: "2",
    title: "Stellar Odyssey",
    slug: "stellar-odyssey",
    description: "Embark on an epic space adventure across galaxies in this stunning sci-fi exploration game.",
    longDescription: "Stellar Odyssey invites you on a breathtaking journey through the cosmos. Command your own starship, explore uncharted planets, trade with alien civilizations, and uncover the mysteries of an ancient galactic empire. With procedurally generated star systems, real-time space combat, and a rich storyline spanning multiple galaxies, Stellar Odyssey redefines what it means to explore the final frontier. Build your crew, upgrade your ship, and chart your own course through the stars.",
    categories: ["Adventure", "RPG"],
    deliveryMode: "download",
    accessTier: "premium",
    rating: 4.9,
    players: "1-4 Players",
    developer: "Cosmos Interactive",
    publisher: "Nexus Games",
    releaseDate: "2026-06-22",
    version: "1.0.3",
    fileSize: "48 GB",
    coverGradient: gradients.ocean,
    heroGradient: "linear-gradient(135deg, #0052D4 0%, #4364F7 50%, #6FB1FC 100%)",
    accentColor: "#4364F7",
    screenshots: [
      { id: "s1", alt: "Deep space nebula", gradient: gradients.midnight },
      { id: "s2", alt: "Alien planet surface", gradient: gradients.aurora },
      { id: "s3", alt: "Starship bridge view", gradient: gradients.ocean },
      { id: "s4", alt: "Space station hub", gradient: gradients.deep },
    ],
    systemRequirements: {
      os: "Windows 10/11 64-bit",
      processor: "Intel Core i5-12400 / AMD Ryzen 5 5600X",
      memory: "16 GB RAM",
      graphics: "NVIDIA RTX 3060 / AMD RX 6700 XT",
      storage: "48 GB SSD",
    },
    isFeatured: true,
    isTrending: true,
    isNew: true,
  },
  {
    id: "3",
    title: "Shadow Realms",
    slug: "shadow-realms",
    description: "Survive the darkness in this atmospheric horror adventure with procedural dungeons.",
    longDescription: "Shadow Realms plunges you into a world consumed by an ancient darkness. As one of the last surviving light bearers, you must venture into procedurally generated dungeons, face terrifying creatures, and uncover the secrets that led to the fall of civilization. Every run is different — with randomized layouts, enemy placements, and loot drops. Craft weapons from the remnants of the old world, master elemental magic, and push deeper into the shadows. But be warned: death is permanent, and the darkness grows stronger with each passing hour.",
    categories: ["Horror", "Adventure"],
    deliveryMode: "browser",
    accessTier: "free",
    rating: 4.5,
    players: "1 Player",
    developer: "Dark Pixel Games",
    publisher: "Indie Collective",
    releaseDate: "2026-08-10",
    version: "2.1.0",
    fileSize: "Browser",
    coverGradient: gradients.ember,
    heroGradient: "linear-gradient(135deg, #CB356B 0%, #BD3F32 100%)",
    accentColor: "#CB356B",
    screenshots: [
      { id: "s1", alt: "Dungeon entrance", gradient: gradients.steel },
      { id: "s2", alt: "Boss encounter", gradient: gradients.ember },
      { id: "s3", alt: "Inventory and crafting", gradient: gradients.deep },
      { id: "s4", alt: "Dark forest exploration", gradient: gradients.forest },
    ],
    isFeatured: true,
    isTrending: false,
    isNew: true,
  },
  {
    id: "4",
    title: "Puzzle Dimensions",
    slug: "puzzle-dimensions",
    description: "Bend reality and solve mind-bending puzzles across multiple dimensions.",
    longDescription: "Puzzle Dimensions challenges your perception of reality with increasingly complex spatial puzzles that span multiple dimensions. Rotate gravity, fold space, and manipulate time to navigate through over 200 hand-crafted levels. The minimalist art style hides deep mechanical complexity, with each new world introducing unique physics rules. Perfect for puzzle enthusiasts who love a cerebral challenge. Compete on global leaderboards or collaborate with friends in cooperative puzzle-solving mode.",
    categories: ["Puzzle", "Indie"],
    deliveryMode: "browser",
    accessTier: "free",
    rating: 4.3,
    players: "1-2 Players",
    developer: "Mindcraft Studios",
    publisher: "Nexus Games",
    releaseDate: "2026-09-01",
    version: "3.0.1",
    fileSize: "Browser",
    coverGradient: gradients.neon,
    heroGradient: "linear-gradient(135deg, #B721FF 0%, #21D4FD 100%)",
    accentColor: "#21D4FD",
    screenshots: [
      { id: "s1", alt: "Dimension shifting puzzle", gradient: gradients.neon },
      { id: "s2", alt: "Gravity manipulation", gradient: gradients.cosmic },
      { id: "s3", alt: "Time-based challenge", gradient: gradients.royal },
      { id: "s4", alt: "Multiplayer co-op mode", gradient: gradients.arctic },
    ],
    isFeatured: false,
    isTrending: true,
    isNew: true,
  },
  {
    id: "5",
    title: "Dragon's Legacy",
    slug: "dragons-legacy",
    description: "Command mighty dragons and build your kingdom in this epic fantasy strategy game.",
    longDescription: "Dragon's Legacy combines the depth of grand strategy with the thrill of dragon combat. Rule your kingdom, forge alliances with neighbouring realms, and raise a flight of dragons to dominate the skies. Research ancient magic, develop your economy, and lead your armies into massive real-time battles. With a detailed campaign spanning centuries and a robust multiplayer mode, Dragon's Legacy offers hundreds of hours of strategic gameplay. Every decision matters — will you rule through diplomacy or fire?",
    categories: ["Strategy", "RPG"],
    deliveryMode: "download",
    accessTier: "premium",
    rating: 4.6,
    players: "1-8 Players",
    developer: "Mythic Games",
    publisher: "Nexus Games",
    releaseDate: "2026-01-20",
    version: "2.3.1",
    fileSize: "35 GB",
    coverGradient: gradients.fire,
    heroGradient: "linear-gradient(135deg, #f12711 0%, #f5af19 100%)",
    accentColor: "#f5af19",
    screenshots: [
      { id: "s1", alt: "Dragon aerial combat", gradient: gradients.fire },
      { id: "s2", alt: "Kingdom overview", gradient: gradients.forest },
      { id: "s3", alt: "Army management", gradient: gradients.steel },
      { id: "s4", alt: "Magic research tree", gradient: gradients.royal },
    ],
    systemRequirements: {
      os: "Windows 10/11 64-bit",
      processor: "Intel Core i5-10400 / AMD Ryzen 5 3600",
      memory: "12 GB RAM",
      graphics: "NVIDIA GTX 1660 Super / AMD RX 5600 XT",
      storage: "35 GB SSD",
    },
    isFeatured: false,
    isTrending: true,
    isNew: false,
  },
  {
    id: "6",
    title: "Velocity Rush",
    slug: "velocity-rush",
    description: "High-speed futuristic racing with anti-gravity vehicles and neon-lit tracks.",
    longDescription: "Feel the rush of pure speed in Velocity Rush, a futuristic anti-gravity racing game that pushes the boundaries of velocity. Race through neon-lit mega-cities, across alien landscapes, and through gravity-defying loops at breakneck speeds. Customize your vehicle with hundreds of parts, master the boost mechanics, and compete against players worldwide. With a pulsating electronic soundtrack and stunning visual effects, every race is an adrenaline-fueled spectacle.",
    categories: ["Racing", "Multiplayer"],
    deliveryMode: "browser",
    accessTier: "free",
    rating: 4.4,
    players: "1-12 Players",
    developer: "Turbo Digital",
    publisher: "Nexus Games",
    releaseDate: "2026-07-04",
    version: "1.5.2",
    fileSize: "Browser",
    coverGradient: gradients.jade,
    heroGradient: "linear-gradient(135deg, #11998e 0%, #38ef7d 100%)",
    accentColor: "#38ef7d",
    screenshots: [
      { id: "s1", alt: "Neon city track", gradient: gradients.jade },
      { id: "s2", alt: "Vehicle customization", gradient: gradients.neon },
      { id: "s3", alt: "Anti-gravity loop", gradient: gradients.arctic },
      { id: "s4", alt: "Multiplayer race start", gradient: gradients.aurora },
    ],
    isFeatured: false,
    isTrending: true,
    isNew: false,
  },
  {
    id: "7",
    title: "Arcane Legends Online",
    slug: "arcane-legends-online",
    description: "A massive multiplayer online RPG set in a magical world of endless adventure.",
    longDescription: "Enter the world of Aethoria in Arcane Legends Online, a sprawling MMORPG where magic and mystery await at every turn. Choose from eight unique classes, each with deep skill trees and playstyles. Explore vast open worlds, conquer challenging dungeons with your guild, participate in epic PvP battles, and craft legendary equipment. With regular content updates, seasonal events, and a thriving player community, there is always something new to discover in Aethoria.",
    categories: ["RPG", "Multiplayer"],
    deliveryMode: "download",
    accessTier: "free",
    rating: 4.2,
    players: "Massively Multiplayer",
    developer: "Eternal Worlds Studio",
    publisher: "Nexus Games",
    releaseDate: "2025-11-15",
    version: "4.1.0",
    fileSize: "28 GB",
    coverGradient: gradients.royal,
    heroGradient: "linear-gradient(135deg, #4A00E0 0%, #8E2DE2 100%)",
    accentColor: "#8E2DE2",
    screenshots: [
      { id: "s1", alt: "Open world landscape", gradient: gradients.forest },
      { id: "s2", alt: "Dungeon raid", gradient: gradients.royal },
      { id: "s3", alt: "PvP arena", gradient: gradients.ember },
      { id: "s4", alt: "Character selection", gradient: gradients.cosmic },
    ],
    systemRequirements: {
      os: "Windows 10/11 64-bit",
      processor: "Intel Core i5-9400 / AMD Ryzen 5 2600",
      memory: "8 GB RAM",
      graphics: "NVIDIA GTX 1060 / AMD RX 580",
      storage: "28 GB HDD",
    },
    isFeatured: false,
    isTrending: false,
    isNew: false,
  },
  {
    id: "8",
    title: "Neon Blitz",
    slug: "neon-blitz",
    description: "Fast-paced arcade shooter with vibrant neon aesthetics and endless waves of enemies.",
    longDescription: "Neon Blitz is a fast-paced arcade twin-stick shooter that throws waves of geometric enemies at you in a dazzling display of neon lights and particle effects. Choose from a roster of unique characters, each with special abilities and ultimate attacks. Survive as long as you can in endless mode, or tackle hand-crafted missions in the campaign. With local and online co-op, leaderboards, and daily challenges, Neon Blitz delivers endless replayability in short, intense bursts.",
    categories: ["Shooter", "Indie"],
    deliveryMode: "browser",
    accessTier: "free",
    rating: 4.1,
    players: "1-2 Players",
    developer: "Pixel Storm Games",
    publisher: "Indie Collective",
    releaseDate: "2026-10-01",
    version: "1.0.0",
    fileSize: "Browser",
    coverGradient: gradients.cosmic,
    heroGradient: "linear-gradient(135deg, #7F00FF 0%, #E100FF 100%)",
    accentColor: "#E100FF",
    screenshots: [
      { id: "s1", alt: "Intense neon combat", gradient: gradients.cosmic },
      { id: "s2", alt: "Boss battle", gradient: gradients.neon },
      { id: "s3", alt: "Power-up selection", gradient: gradients.royal },
      { id: "s4", alt: "Co-op gameplay", gradient: gradients.arctic },
    ],
    isFeatured: false,
    isTrending: false,
    isNew: true,
  },
  {
    id: "9",
    title: "Kingdom Architect",
    slug: "kingdom-architect",
    description: "Design and manage the ultimate medieval kingdom in this detailed city builder.",
    longDescription: "Kingdom Architect puts you in charge of building a thriving medieval civilization from scratch. Place every building, manage resources, keep your citizens happy, and defend against invaders. With a deep economic simulation, dynamic weather and seasons, and a complex diplomatic system, every kingdom tells a unique story. Trade with neighbouring realms, research technologies, and watch your settlement grow from a small village into a mighty empire. Features both sandbox and campaign modes.",
    categories: ["Simulation", "Strategy"],
    deliveryMode: "download",
    accessTier: "premium",
    rating: 4.7,
    players: "1 Player",
    developer: "Clockwork Studios",
    publisher: "Nexus Games",
    releaseDate: "2026-04-18",
    version: "1.4.2",
    fileSize: "22 GB",
    coverGradient: gradients.forest,
    heroGradient: "linear-gradient(135deg, #134E5E 0%, #71B280 100%)",
    accentColor: "#71B280",
    screenshots: [
      { id: "s1", alt: "Kingdom overview", gradient: gradients.forest },
      { id: "s2", alt: "Siege defense", gradient: gradients.fire },
      { id: "s3", alt: "Trade routes", gradient: gradients.aurora },
      { id: "s4", alt: "Seasonal changes", gradient: gradients.jade },
    ],
    systemRequirements: {
      os: "Windows 10/11 64-bit",
      processor: "Intel Core i5-10400 / AMD Ryzen 5 3600",
      memory: "8 GB RAM",
      graphics: "NVIDIA GTX 1650 / AMD RX 5500 XT",
      storage: "22 GB SSD",
    },
    isFeatured: false,
    isTrending: false,
    isNew: false,
  },
  {
    id: "10",
    title: "Turbo Kickoff",
    slug: "turbo-kickoff",
    description: "Arcade-style football with rocket-powered players and explosive goals.",
    longDescription: "Turbo Kickoff reimagines football with rocket-powered athletes, destructible arenas, and physics-defying trick shots. Play quick matches against AI or challenge friends in online multiplayer. Unlock cosmetic items, rank up in competitive seasons, and master the art of the turbo goal. With simple controls but deep mastery, Turbo Kickoff is easy to pick up and impossible to put down.",
    categories: ["Sports", "Multiplayer"],
    deliveryMode: "browser",
    accessTier: "free",
    rating: 4.0,
    players: "1-6 Players",
    developer: "Goal Line Games",
    publisher: "Nexus Games",
    releaseDate: "2026-09-20",
    version: "1.1.0",
    fileSize: "Browser",
    coverGradient: gradients.sunset,
    heroGradient: "linear-gradient(135deg, #ee0979 0%, #ff6a00 100%)",
    accentColor: "#ff6a00",
    screenshots: [
      { id: "s1", alt: "Stadium overview", gradient: gradients.sunset },
      { id: "s2", alt: "Rocket goal celebration", gradient: gradients.fire },
      { id: "s3", alt: "Character select", gradient: gradients.neon },
      { id: "s4", alt: "Online tournament", gradient: gradients.royal },
    ],
    isFeatured: false,
    isTrending: false,
    isNew: true,
  },
  {
    id: "11",
    title: "Frost & Flame",
    slug: "frost-and-flame",
    description: "Master dual elemental powers in this visually stunning action platformer.",
    longDescription: "Frost & Flame tells the story of twin elementalists separated at birth — one wielding ice, the other fire. Switch between both characters in real-time to solve environmental puzzles, defeat elemental guardians, and reunite the twins. With hand-painted art, a sweeping orchestral soundtrack, and tight responsive controls, Frost & Flame is a love letter to classic platformers reimagined for the modern era. Features 60+ levels across six unique biomes.",
    categories: ["Action", "Indie"],
    deliveryMode: "browser",
    accessTier: "premium",
    rating: 4.6,
    players: "1-2 Players",
    developer: "Twin Spark Games",
    publisher: "Indie Collective",
    releaseDate: "2026-05-12",
    version: "1.3.0",
    fileSize: "Browser",
    coverGradient: gradients.arctic,
    heroGradient: "linear-gradient(135deg, #2193b0 0%, #6dd5ed 100%)",
    accentColor: "#6dd5ed",
    screenshots: [
      { id: "s1", alt: "Ice world", gradient: gradients.arctic },
      { id: "s2", alt: "Fire temple", gradient: gradients.volcanic },
      { id: "s3", alt: "Boss battle", gradient: gradients.ember },
      { id: "s4", alt: "Co-op platforming", gradient: gradients.neon },
    ],
    isFeatured: false,
    isTrending: false,
    isNew: false,
  },
  {
    id: "12",
    title: "Phantom Protocol",
    slug: "phantom-protocol",
    description: "Tactical stealth shooter where every mission can be completed without firing a single bullet.",
    longDescription: "Phantom Protocol is a tactical stealth game that rewards patience, planning, and precision. As an elite operative, infiltrate heavily guarded facilities using a vast arsenal of gadgets, disguises, and environmental interactions. Every level is a sandbox of possibilities — go in guns blazing or complete the entire mission as a ghost. With a realistic AI system that reacts to sound, sight, and even smell, Phantom Protocol delivers the most immersive stealth experience ever created.",
    categories: ["Shooter", "Strategy"],
    deliveryMode: "download",
    accessTier: "premium",
    rating: 4.5,
    players: "1 Player",
    developer: "Stealth Works",
    publisher: "Nexus Games",
    releaseDate: "2026-02-28",
    version: "1.1.5",
    fileSize: "42 GB",
    coverGradient: gradients.steel,
    heroGradient: "linear-gradient(135deg, #485563 0%, #29323c 100%)",
    accentColor: "#485563",
    screenshots: [
      { id: "s1", alt: "Night infiltration", gradient: gradients.steel },
      { id: "s2", alt: "Gadget selection", gradient: gradients.midnight },
      { id: "s3", alt: "Tactical overview", gradient: gradients.deep },
      { id: "s4", alt: "Stealth takedown", gradient: gradients.cyberpunk },
    ],
    systemRequirements: {
      os: "Windows 10/11 64-bit",
      processor: "Intel Core i7-9700K / AMD Ryzen 7 3700X",
      memory: "16 GB RAM",
      graphics: "NVIDIA RTX 2070 / AMD RX 6700 XT",
      storage: "42 GB SSD",
    },
    isFeatured: false,
    isTrending: false,
    isNew: false,
  },
  {
    id: "13",
    title: "RetroRevive: 1970s Arcade",
    slug: "retrorevive",
    description: "Step inside an authentic 1970s computing arcade featuring Hammurabi, 23 Matches, and Lunar Lander.",
    longDescription: "RetroRevive brings classic computer games from the 1970s into the modern era through polished graphics, responsive controls, and authentic simulation rules. Features verified historical engines including Doug Dyment's Hammurabi, Bob Albrecht's 23 Matches, and Jim Storer's Lunar Lander, enhanced with optional CRT scanlines and real-time 8-bit sound synthesis.",
    categories: ["Indie", "Strategy", "Puzzle"],
    deliveryMode: "browser",
    accessTier: "free",
    rating: 4.9,
    players: "1 Player",
    developer: "RetroRevive Team",
    publisher: "Nexus Games",
    releaseDate: "2026-10-25",
    version: "1.0.0",
    fileSize: "Browser",
    coverGradient: "linear-gradient(135deg, #f59e0b 0%, #d97706 50%, #b45309 100%)",
    heroGradient: "linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #4338ca 100%)",
    accentColor: "#f59e0b",
    screenshots: [
      { id: "s1", alt: "Hammurabi Sumerian Kingdom", gradient: "linear-gradient(135deg, #78350f, #d97706)" },
      { id: "s2", alt: "23 Matches Wooden Nim Table", gradient: "linear-gradient(135deg, #b45309, #f59e0b)" },
      { id: "s3", alt: "Apollo 11 Lunar Descent", gradient: "linear-gradient(135deg, #0f172a, #38bdf8)" },
      { id: "s4", alt: "Retro CRT Scanline Display", gradient: "linear-gradient(135deg, #022c22, #10b981)" },
    ],
    isFeatured: true,
    isTrending: true,
    isNew: true,
  },
  {
    id: "14",
    title: "Hammurabi (1978)",
    slug: "hammurabi",
    description: "Rule ancient Sumeria for a 10-year term. Allocate grain, feed citizens, plant crops, and trade land.",
    longDescription: "Hammurabi is the iconic ancient Sumerian kingdom simulation originally authored in 1968 by Doug Dyment and popularized in David H. Ahl's 1978 book BASIC Computer Games. Manage grain stockpiles, land trades, and food rations while enduring plagues and rat infestations. Features royal advisor recommendations and animated Sumerian landscape graphics.",
    categories: ["Strategy", "Simulation"],
    deliveryMode: "browser",
    accessTier: "free",
    rating: 4.8,
    players: "1 Player",
    developer: "Doug Dyment & David H. Ahl",
    publisher: "RetroRevive",
    releaseDate: "1978-01-01",
    version: "2.0.0",
    fileSize: "Browser",
    coverGradient: "linear-gradient(135deg, #92400e, #d97706)",
    heroGradient: "linear-gradient(135deg, #451a03, #b45309)",
    accentColor: "#d97706",
    screenshots: [
      { id: "s1", alt: "Ziggurat of Ur and Euphrates River", gradient: "linear-gradient(135deg, #451a03, #b45309)" },
      { id: "s2", alt: "Granary Silos Ledger", gradient: "linear-gradient(135deg, #78350f, #d97706)" },
      { id: "s3", alt: "Royal Advisors Council", gradient: "linear-gradient(135deg, #b45309, #f59e0b)" },
      { id: "s4", alt: "Harvest Fields", gradient: "linear-gradient(135deg, #1e293b, #64748b)" },
    ],
    isFeatured: true,
    isTrending: true,
    isNew: true,
  },
  {
    id: "15",
    title: "23 Matches (1978)",
    slug: "23-matches",
    description: "Bob Albrecht's classic mathematical Nim subtraction strategy game. Avoid taking the last match!",
    longDescription: "23 Matches is a timeless mathematical Nim game published in 101 BASIC Computer Games (1973) and BASIC Computer Games (1978). You and the computer take turns removing 1, 2, or 3 matches from a pool of 23. Under Misère rules, the player forced to take the final match loses. Features classic 1978 Albrecht AI and optimal modular AI.",
    categories: ["Puzzle", "Strategy"],
    deliveryMode: "browser",
    accessTier: "free",
    rating: 4.7,
    players: "1 Player",
    developer: "Bob Albrecht & David H. Ahl",
    publisher: "RetroRevive",
    releaseDate: "1978-01-01",
    version: "2.0.0",
    fileSize: "Browser",
    coverGradient: "linear-gradient(135deg, #ea580c, #f59e0b)",
    heroGradient: "linear-gradient(135deg, #7c2d12, #ea580c)",
    accentColor: "#ea580c",
    screenshots: [
      { id: "s1", alt: "Matchsticks Table", gradient: "linear-gradient(135deg, #7c2d12, #ea580c)" },
      { id: "s2", alt: "Glowing Ember Sparks", gradient: "linear-gradient(135deg, #9a3412, #f97316)" },
      { id: "s3", alt: "AI Strategy Mode Selection", gradient: "linear-gradient(135deg, #431407, #c2410c)" },
      { id: "s4", alt: "Turn History Log", gradient: "linear-gradient(135deg, #1c1917, #78716c)" },
    ],
    isFeatured: false,
    isTrending: true,
    isNew: true,
  },
  {
    id: "16",
    title: "Lunar Lander (Apollo 11)",
    slug: "lunar-lander",
    description: "Jim Storer's 1969 Apollo 11 LEM descent simulation with 5th-order Taylor series rocket physics.",
    longDescription: "Pilot the Apollo 11 Lunar Excursion Module down from 120 miles altitude to Tranquility Base. Manage retro-rocket fuel burn rate against lunar gravity over 10-second cycles. Features verified 5th-order numerical integration of Tsiolkovsky's rocket equation and telemetry HUD.",
    categories: ["Simulation", "Indie"],
    deliveryMode: "browser",
    accessTier: "free",
    rating: 4.9,
    players: "1 Player",
    developer: "Jim Storer (1969) / David H. Ahl (1978)",
    publisher: "RetroRevive",
    releaseDate: "1978-01-01",
    version: "2.0.0",
    fileSize: "Browser",
    coverGradient: "linear-gradient(135deg, #0284c7, #38bdf8)",
    heroGradient: "linear-gradient(135deg, #0c4a6e, #0284c7)",
    accentColor: "#38bdf8",
    screenshots: [
      { id: "s1", alt: "Lunar Descent Telemetry", gradient: "linear-gradient(135deg, #082f49, #0284c7)" },
      { id: "s2", alt: "Apollo LEM Thruster Burn", gradient: "linear-gradient(135deg, #0c4a6e, #38bdf8)" },
      { id: "s3", alt: "Tranquility Base Radar Check", gradient: "linear-gradient(135deg, #0369a1, #7dd3fc)" },
      { id: "s4", alt: "Flight Velocity Dashboard", gradient: "linear-gradient(135deg, #0f172a, #475569)" },
    ],
    isFeatured: false,
    isTrending: true,
    isNew: true,
  },
];

// ─── Helper selectors ─────────────────────────────────────
export const featuredGames = games.filter((g) => g.isFeatured);
export const trendingGames = games.filter((g) => g.isTrending);
export const newGames = games.filter((g) => g.isNew);
export const allCategories: GameCategory[] = [
  "Action",
  "Adventure",
  "RPG",
  "Strategy",
  "Puzzle",
  "Racing",
  "Sports",
  "Simulation",
  "Horror",
  "Multiplayer",
  "Indie",
  "Shooter",
];

export function getGameBySlug(slug: string): Game | undefined {
  return games.find((g) => g.slug === slug);
}

export function getGameById(id: string): Game | undefined {
  return games.find((g) => g.id === id);
}

export function searchGames(query: string): Game[] {
  const lower = query.toLowerCase();
  return games.filter(
    (g) =>
      g.title.toLowerCase().includes(lower) ||
      g.description.toLowerCase().includes(lower) ||
      g.categories.some((c) => c.toLowerCase().includes(lower))
  );
}

export function filterGames(opts: {
  category?: GameCategory;
  accessTier?: AccessTier;
  deliveryMode?: DeliveryMode;
  sortBy?: "title" | "rating" | "releaseDate";
  query?: string;
}): Game[] {
  let result = [...games];

  if (opts.query) {
    const lower = opts.query.toLowerCase();
    result = result.filter(
      (g) =>
        g.title.toLowerCase().includes(lower) ||
        g.description.toLowerCase().includes(lower) ||
        g.categories.some((c) => c.toLowerCase().includes(lower))
    );
  }

  if (opts.category) {
    result = result.filter((g) => g.categories.includes(opts.category!));
  }
  if (opts.accessTier) {
    result = result.filter((g) => g.accessTier === opts.accessTier);
  }
  if (opts.deliveryMode) {
    result = result.filter((g) => g.deliveryMode === opts.deliveryMode);
  }

  if (opts.sortBy === "title") {
    result.sort((a, b) => a.title.localeCompare(b.title));
  } else if (opts.sortBy === "rating") {
    result.sort((a, b) => b.rating - a.rating);
  } else if (opts.sortBy === "releaseDate") {
    result.sort(
      (a, b) =>
        new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime()
    );
  }

  return result;
}

// ─── Membership plans ─────────────────────────────────────
export interface MembershipPlan {
  id: string;
  name: string;
  price: string;
  period: string;
  features: string[];
  highlighted: boolean;
  badge?: string;
}

export const membershipPlans: MembershipPlan[] = [
  {
    id: "free",
    name: "Free",
    price: "$0",
    period: "forever",
    features: [
      "Access to all free games",
      "Browser-based gaming",
      "Basic profile",
      "Community forums",
      "Standard support",
    ],
    highlighted: false,
  },
  {
    id: "premium-monthly",
    name: "Premium",
    price: "$9.99",
    period: "month",
    features: [
      "Access to ALL games (free + premium)",
      "PC game downloads",
      "Priority queue for multiplayer",
      "Exclusive cosmetics & rewards",
      "Cloud save sync",
      "Ad-free experience",
      "Priority support",
      "Early access to new releases",
    ],
    highlighted: true,
    badge: "Most Popular",
  },
  {
    id: "premium-annual",
    name: "Premium Annual",
    price: "$89.99",
    period: "year",
    features: [
      "Everything in Premium",
      "Save 25% vs monthly",
      "Exclusive annual member badge",
      "2 buddy passes per year",
      "VIP beta access",
      "Dedicated support channel",
    ],
    highlighted: false,
    badge: "Best Value",
  },
];

// ─── Mock user for profile/library pages ──────────────────
export interface MockUser {
  username: string;
  displayName: string;
  email: string;
  avatar: string;
  memberSince: string;
  membership: "free" | "premium";
  level: number;
  xp: number;
  xpToNextLevel: number;
  gamesPlayed: number;
  hoursPlayed: number;
  achievements: number;
  library: string[]; // game IDs
}

export const mockUser: MockUser = {
  username: "nexus_gamer",
  displayName: "NexusGamer",
  email: "gamer@nexus.gg",
  avatar: "",
  memberSince: "2025-06-15",
  membership: "premium",
  level: 42,
  xp: 7800,
  xpToNextLevel: 10000,
  gamesPlayed: 24,
  hoursPlayed: 386,
  achievements: 157,
  library: ["1", "2", "5", "7", "9"],
};

// ─── Admin dashboard mock data ────────────────────────────
export interface AdminStats {
  totalUsers: number;
  activeToday: number;
  totalGames: number;
  premiumSubscribers: number;
  revenue: string;
  monthlyGrowth: string;
}

export const adminStats: AdminStats = {
  totalUsers: 145_230,
  activeToday: 12_847,
  totalGames: games.length,
  premiumSubscribers: 38_912,
  revenue: "$389,120",
  monthlyGrowth: "+12.4%",
};
