import type { Config } from 'drizzle-kit';

console.log("Drizzle config loaded");

export default {
  schema: './lib/db/schema/**/*.ts',
  out: './drizzle',
  dialect: 'sqlite',
  dbCredentials: {
    url: './sqlite.db',
  },
} satisfies Config;
