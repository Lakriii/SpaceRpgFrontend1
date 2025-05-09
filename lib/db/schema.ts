import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { relations } from 'drizzle-orm';

// USERS
export const users = sqliteTable('users', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
});

// PLAYERS
export const players = sqliteTable('players', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  user_id: integer('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),

  level: integer('level').notNull(),
  class_type: text('class_type').notNull(),

  hp: integer('hp').notNull(),
  max_hp: integer('max_hp').notNull(),
  energy: integer('energy').notNull(),
  max_energy: integer('max_energy').notNull(),
  stamina: integer('stamina').notNull(),

  strength: integer('strength').notNull(),
  defense: integer('defense').notNull(),
  agility: integer('agility').notNull(),
  intelligence: integer('intelligence').notNull(),
  luck: integer('luck').notNull(),

  credits: integer('credits').notNull(),
  experience: integer('experience').notNull(),
  next_level_exp: integer('next_level_exp').notNull(),

  fights_won: integer('fights_won').notNull(),
  fights_lost: integer('fights_lost').notNull(),
  missions_completed: integer('missions_completed').notNull(),
  missions_failed: integer('missions_failed').notNull(),

  equipped_weapon: text('equipped_weapon').notNull(),
  equipped_armor: text('equipped_armor').notNull(),

  // 🔥 Nové pole
  reputation: integer('reputation').notNull().default(0),
});

// ACHIEVEMENTS
export const achievements = sqliteTable('achievements', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull().unique(),
  description: text('description').notNull(),
});

// PLAYER_ACHIEVEMENTS (m:n vzťah)
export const playerAchievements = sqliteTable('player_achievements', {
  player_id: integer('player_id')
    .notNull()
    .references(() => players.id, { onDelete: 'cascade' }),
  achievement_id: integer('achievement_id')
    .notNull()
    .references(() => achievements.id, { onDelete: 'cascade' }),
  earned: integer('earned', { mode: 'boolean' }).notNull().default(false),
});


// 1️⃣ Všetky predmety
export const items = sqliteTable("items", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  description: text("description").notNull(),
  value: integer("value"), // môže byť null (napr. quest item)
  rarity: text("rarity").notNull(),
  content_type: text("content_type").notNull(), // weapon, armor, jewelry, quest_item, market_only
});

// 2️⃣ Špecifické typy položiek (1:1 vzťahy)
export const weapons = sqliteTable("weapons", {
  item_id: integer("item_id").primaryKey().references(() => items.id, { onDelete: "cascade" }),
  base_damage: integer("base_damage").notNull(),
  critical_chance: integer("critical_chance").notNull(), // napr. 0.2 = 20%
  critical_damage_bonus: integer("critical_damage_bonus").notNull(), // napr. 1.5
});

export const armor = sqliteTable("armor", {
  item_id: integer("item_id").primaryKey().references(() => items.id, { onDelete: "cascade" }),
  defense_bonus: integer("defense_bonus").notNull(),
  special_effect: text("special_effect"),
});

export const jewelry = sqliteTable("jewelry", {
  item_id: integer("item_id").primaryKey().references(() => items.id, { onDelete: "cascade" }),
  origin: text("origin").notNull(),
});

export const questItems = sqliteTable("quest_items", {
  item_id: integer("item_id").primaryKey().references(() => items.id, { onDelete: "cascade" }),
  quest_name: text("quest_name").notNull(),
  is_consumed: integer("is_consumed", { mode: "boolean" }).notNull().default(false),
});

// 3️⃣ Inventár hráča (m:n vzťah medzi hráčmi a itemami)
export const playerInventory = sqliteTable("player_inventory", {
  player_id: integer("player_id").notNull().references(() => players.id, { onDelete: "cascade" }),
  item_id: integer("item_id").notNull().references(() => items.id, { onDelete: "cascade" }),
  quantity: integer("quantity").notNull().default(1),
  is_equipped: integer("is_equipped", { mode: "boolean" }).notNull().default(false),
});

// 4️⃣ Položky v herných trhoch
export const marketItems = sqliteTable("market_items", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  item_id: integer("item_id").notNull().references(() => items.id, { onDelete: "cascade" }),
  market_type: text("market_type").notNull(), // 'black' | 'local' | 'galactic'
  location: text("location"), // napr. Shadow Station, Galactic Hub
  price: integer("price").notNull(),
  delivery_time: integer("delivery_time"), // môže byť null pre local/black
});

export const itemsRelations = relations(items, ({ one, many }) => ({
  weapon: one(weapons, {
    fields: [items.id],
    references: [weapons.item_id],
  }),
  armor: one(armor, {
    fields: [items.id],
    references: [armor.item_id],
  }),
  jewelry: one(jewelry, {
    fields: [items.id],
    references: [jewelry.item_id],
  }),
  questItem: one(questItems, {
    fields: [items.id],
    references: [questItems.item_id],
  }),
  inventories: many(playerInventory),
  marketEntries: many(marketItems),
}));

export const weaponsRelations = relations(weapons, ({ one }) => ({
  item: one(items, {
    fields: [weapons.item_id],
    references: [items.id],
  }),
}));

export const armorRelations = relations(armor, ({ one }) => ({
  item: one(items, {
    fields: [armor.item_id],
    references: [items.id],
  }),
}));

export const jewelryRelations = relations(jewelry, ({ one }) => ({
  item: one(items, {
    fields: [jewelry.item_id],
    references: [items.id],
  }),
}));

export const questItemsRelations = relations(questItems, ({ one }) => ({
  item: one(items, {
    fields: [questItems.item_id],
    references: [items.id],
  }),
}));

export const playerInventoryRelations = relations(playerInventory, ({ one }) => ({
  player: one(players, {
    fields: [playerInventory.player_id],
    references: [players.id],
  }),
  item: one(items, {
    fields: [playerInventory.item_id],
    references: [items.id],
  }),
}));

export const marketItemsRelations = relations(marketItems, ({ one }) => ({
  item: one(items, {
    fields: [marketItems.item_id],
    references: [items.id],
  }),
}));