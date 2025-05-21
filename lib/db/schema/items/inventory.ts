import { sqliteTable, integer } from 'drizzle-orm/sqlite-core';
import { players } from '../players';
import { items } from './base';

export const playerInventory = sqliteTable("player_inventory", {
  player_id: integer("player_id").notNull().references(() => players.id, { onDelete: "cascade" }),
  item_id: integer("item_id").notNull().references(() => items.id, { onDelete: "cascade" }),
  quantity: integer("quantity").notNull().default(1),
  is_equipped: integer("is_equipped", { mode: "boolean" }).notNull().default(false),
});
