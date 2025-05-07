import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { relations } from 'drizzle-orm';

// USERS
export const users = sqliteTable('users', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
});

// PLAYERS (každý hráč patrí jednému používateľovi)
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
});

// RELATIONS

export const usersRelations = relations(users, ({ one }) => ({
  player: one(players, {
    fields: [users.id],
    references: [players.user_id],
  }),
}));

export const playersRelations = relations(players, ({ one }) => ({
  user: one(users, {
    fields: [players.user_id],
    references: [users.id],
  }),
}));
