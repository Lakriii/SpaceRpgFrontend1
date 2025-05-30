import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';
import { players } from './players';

export const miningNodes = sqliteTable('mining_nodes', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  parent_id: integer('parent_id', { mode: 'number' }).references(() => miningNodes.id, {
    onDelete: 'cascade',
  }).default(null),
  name: text('name').notNull(),
  description: text('description').notNull(),
  rarity: text('rarity').notNull(),
  yield_amount: integer('yield_amount').notNull(),
  cooldown: integer('cooldown').notNull(),
});

export const playerResources = sqliteTable(
  'player_resources',
  {
    player_id: integer('player_id').notNull().references(() => players.id, {
      onDelete: 'cascade',
    }),
    mining_node_id: integer('mining_node_id').notNull().references(() => miningNodes.id, {
      onDelete: 'cascade',
    }),
    quantity: integer('quantity').notNull().default(0),
    last_mined_at: integer('last_mined_at', { mode: 'timestamp' }).default(null),
  },
  (table) => ({
    primaryKey: [table.player_id, table.mining_node_id],
  })
);
