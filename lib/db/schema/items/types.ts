import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { items } from './base';

export const weapons = sqliteTable("weapons", {
  item_id: integer("item_id").primaryKey().references(() => items.id, { onDelete: "cascade" }),
  base_damage: integer("base_damage").notNull(),
  critical_chance: integer("critical_chance").notNull(),
  critical_damage_bonus: integer("critical_damage_bonus").notNull(),
});

export const armor = sqliteTable("armor", {
  item_id: integer("item_id").primaryKey().references(() => items.id, { onDelete: "cascade" }),
  defense_bonus: integer("defense_bonus").notNull(),
  special_effect: text("special_effect"),
});

// etc.
