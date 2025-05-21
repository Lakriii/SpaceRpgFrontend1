import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';
import { relations } from 'drizzle-orm';
import { players } from './players';

export const achievements = sqliteTable('achievements', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull().unique(),
  description: text('description').notNull(),
});

export const playerAchievements = sqliteTable('player_achievements', {
  player_id: integer('player_id')
    .notNull()
    .references(() => players.id, { onDelete: 'cascade' }),
  achievement_id: integer('achievement_id')
    .notNull()
    .references(() => achievements.id, { onDelete: 'cascade' }),
  earned: integer('earned', { mode: 'boolean' }).notNull().default(false),
});
