import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';
import { items } from './base';

export const marketItems = sqliteTable("market_items", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  item_id: integer("item_id").notNull().references(() => items.id, { onDelete: "cascade" }),
  market_type: text("market_type").notNull(),
  location: text("location"),
  price: integer("price").notNull(),
  delivery_time: integer("delivery_time"),
});
