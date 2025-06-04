import { db } from "../lib/db/db.ts";
import { miningNodes } from "../lib/db/schema/mining";
async function seedMiningNodes() {
  const baseNodes = [
    {
      id: 1,
      parent_id: null,
      name: "Iron Mine",
      description: "Basic iron mining facility.",
      rarity: "common",
      yield_amount: 10,
      cooldown: 3600,
    },
    {
      id: 2,
      parent_id: null,
      name: "Copper Mine",
      description: "Mine that extracts copper ore.",
      rarity: "common",
      yield_amount: 8,
      cooldown: 3600,
    },
    {
      id: 3,
      parent_id: null,
      name: "Silver Vein",
      description: "A rare silver-rich location.",
      rarity: "uncommon",
      yield_amount: 6,
      cooldown: 7200,
    },
    {
      id: 4,
      parent_id: null,
      name: "Gold Shaft",
      description: "Deep underground gold source.",
      rarity: "rare",
      yield_amount: 4,
      cooldown: 10800,
    },
    {
      id: 5,
      parent_id: null,
      name: "Crystal Cavern",
      description: "Cavern containing energy crystals.",
      rarity: "epic",
      yield_amount: 2,
      cooldown: 14400,
    },
  ];

  // Optional: delete all existing nodes first
  await db.delete(miningNodes);

  // Insert seed data
  await db.insert(miningNodes).values(baseNodes);

  console.log("✅ Seed: miningNodes inserted");
}

seedMiningNodes()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("❌ Seed error:", err);
    process.exit(1);
  });
