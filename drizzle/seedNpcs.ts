import { db } from "@lib/db/db"; // Tvoja Drizzle ORM databázová inštancia
import { npcs, npcInteractions } from "@lib/db/schema";

async function seedNpcs() {
  // Vlož NPC
  const insertedNpcs = await db.insert(npcs).values([
    {
      name: "Bárdos the Merchant",
      avatar: "🧑‍🌾",
      role: "Trader",
      location: "Market Square",
      bio: "Experienced merchant dealing in rare goods.",
      tooltip: "Click to trade with Bárdos",
    },
    {
      name: "Luna the Warrior",
      avatar: "🗡️",
      role: "Guard",
      location: "Castle Gate",
      bio: "Skilled swordswoman protecting the realm.",
      tooltip: "Click to engage in combat with Luna",
    },
    {
      name: "Elder Mira",
      avatar: "🧙‍♀️",
      role: "Sage",
      location: "Ancient Library",
      bio: "Wise sage offering knowledge and quests.",
      tooltip: "Click to converse with Elder Mira",
    },
    {
      name: "Gifty the Giver",
      avatar: "🎁",
      role: "Reward Giver",
      location: "Town Hall",
      bio: "Offers rewards for completed quests.",
      tooltip: "Click to claim rewards from Gifty",
    },
  ]);

  // Získaj ID vložených NPC (v SQLite často býva automaticky vrátený insert result)
  // Ak tvoja db.insert nevracia inserted IDs, môžeš urobiť select, napr:
  const allNpcs = await db.select().from(npcs);

  // Priprav interakcie pre NPC podľa ich ID
  const npcInteractionsData = allNpcs.map((npc) => {
    switch (npc.name) {
      case "Bárdos the Merchant":
        return { npc_id: npc.id, interaction_type: "🛒" };
      case "Luna the Warrior":
        return { npc_id: npc.id, interaction_type: "⚔️" };
      case "Elder Mira":
        return { npc_id: npc.id, interaction_type: "🧠" };
      case "Gifty the Giver":
        return { npc_id: npc.id, interaction_type: "🎁" };
      default:
        return null;
    }
  }).filter(Boolean);

  // Vlož interakcie
  await db.insert(npcInteractions).values(npcInteractionsData);

  console.log("NPC seed complete.");
}

seedNpcs()
  .catch((e) => {
    console.error("Error seeding NPCs:", e);
  });
