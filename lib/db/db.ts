// lib/db/db.ts
import { drizzle } from 'drizzle-orm/libsql'; // or from drizzle-orm depending on your setup
import { createClient } from '@libsql/client';

// Create SQLite client using Drizzle
const client = createClient({
  url: 'file:sqlite.db', // SQLite database path
});

// Initialize Drizzle ORM with the client
export const db = drizzle(client);
