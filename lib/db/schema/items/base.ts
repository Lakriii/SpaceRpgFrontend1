import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const items = sqliteTable("items", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  description: text("description").notNull(),
  value: integer("value"),
  rarity: text("rarity").notNull(),
  content_type: text("content_type").notNull(),
   price: integer("price").notNull().default(1),
  costType: text("cost_type").default("Iron Ore"), // alebo .nullable()
});
