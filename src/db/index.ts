import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import * as schema from './schema';

// Vytvorenie SQLite databázy (ak neexistuje, vytvorí sa)
const sqlite = new Database('./src/db/database.db');

// Inicializácia Drizzle ORM
export const db = drizzle(sqlite, { schema });
