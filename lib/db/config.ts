import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';

const client = createClient({
  url: 'file:sqlite.db', // lokálna SQLite databáza
});

export const db = drizzle(client);