import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core";
import { items } from "./items/base"; // predpokladám, že items už máš definované

export const npcs = sqliteTable("npcs", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  avatar: text("avatar").notNull(), // napr. emoji alebo URL obrázka
  role: text("role").notNull(),
  location: text("location").notNull(),
  bio: text("bio"),
  tooltip: text("tooltip"),
});

export const npcInteractions = sqliteTable("npc_interactions", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  npc_id: integer("npc_id")
    .notNull()
    .references(() => npcs.id, { onDelete: "cascade" }),
  interaction_type: text("interaction_type").notNull(), // napr. 'trade', 'combat', 'conversation', 'reward'
});
 
export const npcItemsForSale = sqliteTable("npc_items_for_sale", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  npc_id: integer("npc_id")
    .notNull()
    .references(() => npcs.id, { onDelete: "cascade" }),
  item_id: integer("item_id")
    .notNull()
    .references(() => items.id, { onDelete: "cascade" }),
  quantity: integer("quantity").default(0),
  price: integer("price").notNull(),
});
