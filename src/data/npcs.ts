export type Mission = {
  id: string;
  title: string;
  description: string;
  reward: string;
};

export type Npc = {
  id: string;
  name: string;
  role: string;
  avatar: string; // Emoji
  tooltip: string;
  bio: string;
  interactions: string[]; // Emoji interakcie
  location: string;
  missions: Mission[];
  conditions?: string[]; // voliteľné podmienky výskytu
};

export const npcs: Npc[] = [
  {
    id: "1",
    name: "Zargus",
    role: "Obchodník s technológiami",
    avatar: "🦎",
    tooltip: "Špecializuje sa na výmenu pokročilých technológií.",
    bio: "Zargus pochádza z planéty Tek'Thar. Je známy svojimi technickými znalosťami a schopnosťou obchodovať s takmer čímkoľvek.",
    interactions: ["🛒", "🧠", "🎁"],
    location: "Výskumná stanica Omega-7",
    missions: [
      {
        id: "m1",
        title: "Dodaj kyberčipy",
        description: "Zargus potrebuje 5 kyberčipov na upgrade systému AI.",
        reward: "800 kreditov + reputácia +1",
      },
    ],
  },
  {
    id: "2",
    name: "Vora",
    role: "Veliteľka povstalcov",
    avatar: "🦅",
    tooltip: "Vodkyňa tajnej frakcie odporu proti Galaktickej rade.",
    bio: "Neľútostná stratég, ktorá vedie povstalcov z tieňa. Pomoc jej frakcii môže priniesť moc… alebo problémy.",
    interactions: ["🧠", "⚔️", "🔁"],
    location: "Tajná základňa v pásme Ares",
    missions: [
      {
        id: "m2",
        title: "Znič imperiálny dron",
        description: "Pomôž Vore eliminovať špehovacie zariadenie v oblasti.",
        reward: "1000 kreditov, +2 reputácia u Povstalcov",
      },
      {
        id: "m3",
        title: "Získaj kódové dáta",
        description: "Prenikni do imperiálnej siete a získaš šifrované dáta.",
        reward: "900 kreditov, špeciálny modul",
      },
    ],
  },
  {
    id: "3",
    name: "Dr. Xenari",
    role: "Vedec - xenobiológ",
    avatar: "🦉",
    tooltip: "Skúma mimozemské formy života.",
    bio: "Xenari je fascinovaný tajomstvami hlbokého vesmíru. Je ochotný zdieľať poznatky výmenou za pomoc.",
    interactions: ["🧠", "🎁"],
    location: "Laboratórium na planéte Erythraea",
    missions: [
      {
        id: "m4",
        title: "Zber vzoriek",
        description: "Nazbieraj vzorky z planéty X-42 pre výskum.",
        reward: "700 kreditov, experimentálny stimulátor",
      },
    ],
  },
  {
    id: "4",
    name: "Grunk",
    role: "Aréna boss",
    avatar: "🐗",
    tooltip: "Silný, tvrdohlavý bojovník – len pre odvážnych.",
    bio: "Bývalý gladiátor, ktorý teraz vedie vlastnú arénu. Boj s ním zaručí rešpekt… ak prežiješ.",
    interactions: ["⚔️", "🎁"],
    location: "Bojová Aréna na orbitálnej stanici Kragg",
    missions: [],
    conditions: ["Dostupný len v noci"],
  },
  {
    id: "5",
    name: "Tiko",
    role: "Putujúci obchodník",
    avatar: "🦊",
    tooltip: "Objavuje sa náhodne na rôznych planétach.",
    bio: "Tiko je známy tým, že vždy má niečo vzácne – ak vieš, kde ho nájsť.",
    interactions: ["🛒"],
    location: "❓ Neznáma poloha",
    missions: [],
    conditions: ["Objavuje sa náhodne počas eventov"],
  },
];
