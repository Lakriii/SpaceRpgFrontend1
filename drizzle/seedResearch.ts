import { drizzle } from 'drizzle-orm';
import { db } from "../lib/db/db.ts";
import { researchNodes, playerResearch } from '../lib/db/schema/research.ts';

// Pomocná funkcia na extrakciu čísel z timeRequired stringu "Xd"
function parseDays(timeRequired: string): number {
  return parseInt(timeRequired.replace('d', ''), 10);
}

// Pripravený seed data
const techTreeSeed = [
  {
    id: 1,
    parent_id: null,
    name: "Základná integrácia",
    level: 1,
    description: "Prvé kroky k prepojeniu rôznych neurónových sietí cez jednotné API a synchronizačný protokol.",
    x: 4,
    y: 0,
    time_required: 0, // hlavný uzol nemá čas
  },
  // Podvýskumy Základnej integrácie
  {
    id: 2,
    parent_id: 1,
    name: "API most medzi modelmi",
    level: 1,
    description: "Umožňuje komunikáciu medzi rôznymi typmi modelov.",
    x: 3,
    y: 0,
    time_required: 3,
  },
  {
    id: 3,
    parent_id: 1,
    name: "Výber modelov pre kooperáciu",
    level: 1,
    description: "Odomkne kombinovanie GPT a Vision Transformer modelov.",
    x: 5,
    y: 0,
    time_required: 2,
  },
  {
    id: 4,
    parent_id: 1,
    name: "Synchronizačný protokol",
    level: 1,
    description: "Zníženie latencie pri prenose dát medzi modelmi.",
    x: 4,
    y: 1,
    time_required: 4,
  },

  // Druhý hlavný uzol
  {
    id: 5,
    parent_id: null,
    name: "Optimalizácia učenia",
    level: 2,
    description: "Zefektívnenie výpočtov medzi prepojenými modelmi vďaka zdieľaniu znalostí a váh.",
    x: 4,
    y: 2,
    time_required: 0,
  },
  {
    id: 6,
    parent_id: 5,
    name: "Zdieľané embeddingy",
    level: 2,
    description: "Znižuje redundanciu a pamäťovú stopu.",
    x: 3,
    y: 2,
    time_required: 3,
  },
  {
    id: 7,
    parent_id: 5,
    name: "Transfer Learning pipeline",
    level: 2,
    description: "Zrýchlenie učenia na malých datasadoch.",
    x: 5,
    y: 2,
    time_required: 5,
  },
  {
    id: 8,
    parent_id: 5,
    name: "Distribuované učenie",
    level: 2,
    description: "Paralelizácia tréningu medzi viacerými modelmi.",
    x: 4,
    y: 3,
    time_required: 6,
  },

  // Tretí hlavný uzol
  {
    id: 9,
    parent_id: null,
    name: "Experimentálny framework",
    level: 3,
    description: "Vytvorenie systému na testovanie a dynamickú úpravu správania modelov v reálnom čase.",
    x: 4,
    y: 4,
    time_required: 0,
  },
  {
    id: 10,
    parent_id: 9,
    name: "Dataset orchestrácia",
    level: 3,
    description: "Odomkne pokročilé tréningové scenáre pre multi-modely.",
    x: 3,
    y: 4,
    time_required: 3,
  },
  {
    id: 11,
    parent_id: 9,
    name: "Performance tracking",
    level: 3,
    description: "Zobrazí metriky pre každý model v reálnom čase.",
    x: 5,
    y: 4,
    time_required: 2,
  },
  {
    id: 12,
    parent_id: 9,
    name: "Dynamický switch modelov",
    level: 3,
    description: "Zlepšuje reakčnosť systému podľa kontextu.",
    x: 4,
    y: 5,
    time_required: 4,
  },

  // Štvrtý hlavný uzol
  {
    id: 13,
    parent_id: null,
    name: "Bezpečnosť & interpretácia",
    level: 4,
    description: "Zabezpečenie dôveryhodnosti modelov a detekcia anomálií v komunikácii.",
    x: 4,
    y: 6,
    time_required: 0,
  },
  {
    id: 14,
    parent_id: 13,
    name: "Audit komunikácie",
    level: 4,
    description: "Zvýši transparentnosť medzi modelmi.",
    x: 3,
    y: 6,
    time_required: 3,
  },
  {
    id: 15,
    parent_id: 13,
    name: "Explainable AI moduly",
    level: 4,
    description: "Zvýši dôveru používateľov cez vysvetlenia rozhodnutí.",
    x: 5,
    y: 6,
    time_required: 4,
  },
  {
    id: 16,
    parent_id: 13,
    name: "Anomálna detekcia",
    level: 4,
    description: "Zachytí podozrivé správanie medzi modelmi.",
    x: 4,
    y: 7,
    time_required: 5,
  },

  // Piaty hlavný uzol
  {
    id: 17,
    parent_id: null,
    name: "Deployment",
    level: 5,
    description: "Prenos technológie z výskumu do produkcie s dôrazom na flexibilitu a monitoring.",
    x: 4,
    y: 8,
    time_required: 0,
  },
  {
    id: 18,
    parent_id: 17,
    name: "Kontajnerizácia systému",
    level: 5,
    description: "Pripraví modely na nasadenie cez Docker/Kubernetes.",
    x: 3,
    y: 8,
    time_required: 2,
  },
  {
    id: 19,
    parent_id: 17,
    name: "Cloud/Edge rozhodovanie",
    level: 5,
    description: "Dynamický výber platformy pre nasadenie.",
    x: 5,
    y: 8,
    time_required: 3,
  },
  {
    id: 20,
    parent_id: 17,
    name: "Live monitoring",
    level: 5,
    description: "Zber spätnej väzby z reálneho nasadenia.",
    x: 6,
    y: 8,
    time_required: 4,
  },
];

// Príklad seed pre playerResearch (pre hráča s player_id=1)
const playerResearchSeed = [
  {
    player_id: 1,
    research_node_id: 2,
    status: "completed",
    started_at: Date.now() - 7 * 24 * 3600 * 1000, // pred 7 dňami
    completed_at: Date.now() - 4 * 24 * 3600 * 1000, // pred 4 dňami
  },
  {
    player_id: 1,
    research_node_id: 4,
    status: "in_progress",
    started_at: Date.now() - 1 * 24 * 3600 * 1000, // pred 1 dňom
    completed_at: null,
  },
  {
    player_id: 1,
    research_node_id: 1,
    status: "completed",
    started_at: Date.now() - 10 * 24 * 3600 * 1000,
    completed_at: Date.now() - 8 * 24 * 3600 * 1000,
  }
];

// Funkcia na vloženie seed dát
export async function seedResearch() {
  try {
    console.log("Začínam seedovanie dát...");

    // Vloženie researchNodes
    const resNodes = await db.insert(researchNodes).values(techTreeSeed);
    console.log(`Vložených uzlov výskumu: ${techTreeSeed.length}`);

    // Vloženie playerResearch
    const resPlayer = await db.insert(playerResearch).values(playerResearchSeed);
    console.log(`Vložených záznamov pre hráča: ${playerResearchSeed.length}`);

    console.log("Seedovanie úspešne dokončené.");
  } catch (error) {
    console.error("Chyba pri seedovaní dát:", error);
  }
}
seedResearch();
