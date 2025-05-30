// lib/db/config.ts
import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';

const client = createClient({
  url: 'file:sqlite.db', // Lokálna SQLite databáza
});

export const db = drizzle(client); // Správny export db