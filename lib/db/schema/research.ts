import { sqliteTableCreator, text, integer } from 'drizzle-orm/sqlite-core';
import { players } from './players';

const createTable = sqliteTableCreator(name => name);

export const researchNodes = createTable("research_nodes", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  parent_id: integer("parent_id").references(() => researchNodes.id),
  name: text("name").notNull(),
  level: integer("level").notNull(),
  description: text("description").notNull(),
  x: integer("x").notNull(),
  y: integer("y").notNull(),
});

export const playerResearch = createTable("player_research", {
  player_id: integer("player_id")
    .notNull()
    .references(() => players.id, { onDelete: "cascade" }),
  research_node_id: integer("research_node_id")
    .notNull()
    .references(() => researchNodes.id, { onDelete: "cascade" }),
  status: text("status").notNull().default("locked"),
  started_at: integer("started_at"),
  completed_at: integer("completed_at"),
});
