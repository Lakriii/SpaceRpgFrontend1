import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/schema.ts",
  out: "./drizzle",
});
/*import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const users = sqliteTable('users', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  email: text('email').notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  createdAt: text('created_at').default(new Date().toISOString()),
});
 import { sqliteTable, text, integer, uniqueIndex, real } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';

export const users = sqliteTable("users", {
  id: integer("id").primaryKey(),  // Corrected autoIncrement syntax
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  created_at: text("created_at")
    .notNull()
    .default(sql`(current_timestamp)`),  // Setting the default current timestamp
  updated_at: text("updated_at")
    .notNull()
    .default(sql`(current_timestamp)`)
    
});

export const shipTypes = sqliteTable('ship_types', {
  id: integer('id').primaryKey(),  // Corrected autoIncrement syntax
  name: text('name').notNull(),
}, (table) => {
  return {
    nameUnique: uniqueIndex('ship_types_name_unique').on(table.name),
  };
});

export const ships = sqliteTable('ships', {
  id: integer('id').primaryKey(),  // Corrected autoIncrement syntax
  user_id: integer('user_id').notNull().references(() => users.id),
  name: text('name').notNull(),
  ship_type_id: integer('ship_type_id').references(() => shipTypes.id),
  hp: integer('hp').default(100),
  shield: integer('shield').default(100),
  created_at: text('created_at').default(sql`(current_timestamp)`),  // Setting default current timestamp
});

export const attachmentTypes = sqliteTable('attachment_types', {
  id: integer('id').primaryKey(),  // Corrected autoIncrement syntax
  name: text('name').notNull(),
}, (table) => {
  return {
    nameUnique: uniqueIndex('attachment_types_name_unique').on(table.name),
  };
});

export const attachments = sqliteTable('attachments', {
  id: integer('id').primaryKey(),  // Corrected autoIncrement syntax
  ship_id: integer('ship_id').notNull().references(() => ships.id),
  name: text('name').notNull(),
  attachment_type_id: integer('attachment_type_id').references(() => attachmentTypes.id),
  damage: integer('damage').default(0),
  defense: integer('defense').default(0),
  utility: integer('utility').default(0),
});

export const researchTypes = sqliteTable('research_types', {
  id: integer('id').primaryKey(),  // Corrected autoIncrement syntax
  name: text('name').notNull(),
}, (table) => {
  return {
    nameUnique: uniqueIndex('research_types_name_unique').on(table.name),
  };
});

export const research = sqliteTable('research', {
  id: integer('id').primaryKey(),  // Corrected autoIncrement syntax
  user_id: integer('user_id').notNull().references(() => users.id),
  research_type_id: integer('research_type_id').references(() => researchTypes.id),
  level: integer('level').default(1),
  progress: real('progress'),
  started_at: text('started_at').default(sql`(current_timestamp)`),  // Setting default current timestamp
});

// ✅ Export schema to be used in drizzle configuration
export const schema = {
  users,
  shipTypes,
  ships,
  attachmentTypes,
  attachments,
  researchTypes,
  research,
};
*/