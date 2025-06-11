import { db } from "@lib/db/db";
import { npcs, npcInteractions, npcItemsForSale } from "@lib/db/schema";
import { items } from "@lib/db/schema/items/base";
import { inArray } from "drizzle-orm";

async function seedNpcs() {
  // Vyčisti tabuľky
  await db.delete(npcItemsForSale);
  await db.delete(npcInteractions);
  await db.delete(npcs);

// pred tým než vložíš náhodné položky, vlož tieto:
const requiredItems = [
  { name: "Iron Ore", description: "Basic iron ore.", value: 100, rarity: "common", content_type: "quest_item" },
  { name: "Copper Ore", description: "Basic copper ore.", value: 80, rarity: "common", content_type: "quest_item" },
  { name: "Gold Nugget", description: "Shiny gold nugget.", value: 500, rarity: "rare", content_type: "quest_item" },
  { name: "Silver Chunk", description: "Chunk of silver.", value: 300, rarity: "uncommon", content_type: "quest_item" },
  { name: "Crystal Shard", description: "Rare energy crystal.", value: 1000, rarity: "epic", content_type: "quest_item" },
];
await db.insert(items).values(requiredItems);


const itemNames = ["Iron Ore", "Copper Ore", "Gold Nugget", "Silver Chunk", "Crystal Shard"];

const existingItems = await db
  .select()
  .from(items)
  .where(inArray(items.name, itemNames));

if (existingItems.length !== itemNames.length) {
  console.error("❌ Niektoré položky neexistujú v databáze, seed nemôže pokračovať.");
  console.log("Existujúce položky:", existingItems.map(i => i.name));
  process.exit(1);
}

// Mapa pre rýchle vyhľadávanie item_id podľa názvu
const itemMap = new Map(existingItems.map(item => [item.name, item.id]));

  // ✅ 3. Vlož 5 NPC
  const insertedNpcs = await db
    .insert(npcs)
    .values([
      {
        name: "Bárdos the Merchant",
        avatar: "🧑‍🌾",
        role: "Trader",
        location: "Market Square",
        bio: "Experienced merchant dealing in rare goods.",
        tooltip: "Click to trade or talk with Bárdos",
      },
      {
        name: "Luna the Warrior",
        avatar: "🗡️",
        role: "Guard",
        location: "Castle Gate",
        bio: "Skilled swordswoman protecting the realm.",
        tooltip: "Click to fight or chat with Luna",
      },
      {
        name: "Elder Mira",
        avatar: "🧙‍♀️",
        role: "Sage",
        location: "Ancient Library",
        bio: "Wise sage offering knowledge and quests.",
        tooltip: "Click to talk or earn rewards from Mira",
      },
      {
        name: "Gifty the Giver",
        avatar: "🎁",
        role: "Reward Giver",
        location: "Town Hall",
        bio: "Offers rewards and wisdom.",
        tooltip: "Click to get rewards or talk with Gifty",
      },
      {
        name: "Drago the Smuggler",
        avatar: "🦹‍♂️",
        role: "Outlaw",
        location: "Hidden Alley",
        bio: "Black market trader with shady offers.",
        tooltip: "Click to trade or fight with Drago",
      },
    ])
    .returning({ id: npcs.id, name: npcs.name });

  // ✅ 4. Interakcie pre každé NPC
  const npcInteractionsData = insertedNpcs.flatMap((npc) => {
    switch (npc.name) {
      case "Bárdos the Merchant":
        return [
          { npc_id: npc.id, interaction_type: "🛒" },
          { npc_id: npc.id, interaction_type: "🧠" },
        ];
      case "Luna the Warrior":
        return [
          { npc_id: npc.id, interaction_type: "⚔️" },
          { npc_id: npc.id, interaction_type: "🧠" },
        ];
      case "Elder Mira":
        return [
          { npc_id: npc.id, interaction_type: "🧠" },
          { npc_id: npc.id, interaction_type: "🎁" },
        ];
      case "Gifty the Giver":
        return [
          { npc_id: npc.id, interaction_type: "🎁" },
          { npc_id: npc.id, interaction_type: "🧠" },
        ];
      case "Drago the Smuggler":
        return [
          { npc_id: npc.id, interaction_type: "🛒" },
          { npc_id: npc.id, interaction_type: "⚔️" },
        ];
      default:
        return [];
    }
  });

  await db.insert(npcInteractions).values(npcInteractionsData);

  // ✅ 5. Items na predaj (naviazané na mining)
  const itemsForSale = insertedNpcs.flatMap((npc) => {
    if (npc.name === "Bárdos the Merchant") {
      return [
        {
          npc_id: npc.id,
          item_id: itemMap["Iron Ore"],
          quantity: 10,
          price: 100,
        },
        {
          npc_id: npc.id,
          item_id: itemMap["Gold Nugget"],
          quantity: 2,
          price: 500,
        },
      ];
    }

    if (npc.name === "Drago the Smuggler") {
      return [
        {
          npc_id: npc.id,
          item_id: itemMap["Crystal Shard"],
          quantity: 1,
          price: 1000,
        },
        {
          npc_id: npc.id,
          item_id: itemMap["Copper Ore"],
          quantity: 5,
          price: 150,
        },
      ];
    }

    return [];
  });

  if (itemsForSale.length > 0) {
    await db.insert(npcItemsForSale).values(itemsForSale);

  }

  console.log("✅ NPC seed complete: 5 NPCs, multi-interactions, and mining-based items.");
}

seedNpcs().catch((e) => {
  console.error("❌ Error seeding NPCs:", e);
});
