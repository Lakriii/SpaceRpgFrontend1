import { db } from "../lib/db/db.ts";
import {
  users,
  players,
  achievements,
  playerAchievements,
  items,
  marketItems,
} from "../lib/db/schema";
import { eq } from "drizzle-orm";

async function seed() {
  console.log("🌱 Seeding database...");

  await db.insert(users).values({
    email: "test@seed.com",
    username: "test",
    password: "test123", // môžeš použiť bcrypt neskôr
  });

  await db.insert(players).values({
    user_id: 1,
    level: 1,
    class_type: "Rookie",
    hp: 100,
    max_hp: 100,
    energy: 50,
    max_energy: 50,
    stamina: 30,
    strength: 10,
    defense: 10,
    agility: 10,
    intelligence: 10,
    luck: 5,
    credits: 1000000,
    experience: 0,
    next_level_exp: 1000,
    fights_won: 0,
    fights_lost: 0,
    missions_completed: 0,
    missions_failed: 0,
    equipped_weapon: "Basic Blaster",
    equipped_armor: "Cloth Armor",
    reputation: 0,
  });

  // Achievements
  const achievementData = [
    { name: "First Blood", description: "Defeat your first enemy." },
    { name: "Elite Trader", description: "Complete 100 successful trades." },
    { name: "Galactic Savior", description: "Save a star system from invasion." },
    { name: "Underworld Kingpin", description: "Gain infamy among criminal factions." },
    { name: "Explorer", description: "Discover 50 unknown star systems." },
  ];

  const insertedAchievements = await db
    .insert(achievements)
    .values(achievementData)
    .returning({ id: achievements.id });

  const achievementIds = insertedAchievements.map((a) => a.id);

  // PlayerAchievements for player_id = 1
  const playerAchievementData = achievementIds.map((id) => ({
    player_id: 1,
    achievement_id: id,
    earned: Math.random() > 0.5,
  }));

  await db.insert(playerAchievements).values(playerAchievementData);

  // Items
  const rarities = ["common", "uncommon", "rare", "epic", "legendary"];
  const contentTypes = ["weapon", "armor", "jewelry", "quest_item", "market_only"];

  const itemData = Array.from({ length: 40 }, (_, i) => {
    const value = Math.random() > 0.3 ? Math.floor(Math.random() * 9000 + 100) : null;

    return {
      name: `Item ${i + 1}`,
      description: `Description for item ${i + 1}`,
      value,
      credits: Math.floor(Math.random() * 5000),
      gold: Math.floor(Math.random() * 200),
      rarity: rarities[Math.floor(Math.random() * rarities.length)],
      content_type: contentTypes[Math.floor(Math.random() * contentTypes.length)],
    };
  });

  const insertedItems = await db
    .insert(items)
    .values(itemData)
    .returning({ id: items.id });

  // Market items (20 položiek)
  const marketTypes = ["black", "local", "galactic"];
  const locations = ["Shadow Station", "Galactic Hub", "Terra Station"];

  const marketItemData = Array.from({ length: 20 }, () => {
    const item = insertedItems[Math.floor(Math.random() * insertedItems.length)];
    const marketType = marketTypes[Math.floor(Math.random() * marketTypes.length)];
    const deliveryTime = marketType === "galactic" ? Math.floor(Math.random() * 25 + 5) : null;

    return {
      item_id: item.id,
      market_type: marketType,
      location: locations[Math.floor(Math.random() * locations.length)],
      price: Math.floor(Math.random() * 9500 + 500),
      delivery_time: deliveryTime,
    };
  });

  await db.insert(marketItems).values(marketItemData);

  console.log("✅ Database seeded successfully!");
}

seed().catch((err) => {
  console.error("❌ Seeding error:", err);
  process.exit(1);
});
