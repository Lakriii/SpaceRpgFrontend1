// lib/db/db.ts
import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';

// Vytvorte klienta pre SQLite databázu
const client = createClient({
  url: 'file:sqlite.db', // Lokálna SQLite databáza
});

// Inicializujte Drizzle ORM s klientom
export const db = drizzle(client);