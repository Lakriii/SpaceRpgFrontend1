import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const items = sqliteTable("items", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  description: text("description").notNull(),
  iron: integer("iron").default(0),
  credits: integer("credits"),
  gold: integer("gold"),
  rarity: text("rarity").notNull(),
  content_type: text("content_type").notNull(),
});
