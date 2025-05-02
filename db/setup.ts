import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import * as schema from './schema';

const sqlite = new Database('src/db/database.db');
const db = drizzle(sqlite, { schema });

const setupDatabase = async () => {
  await db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL
    );
  `);

  console.log('Database setup completed!');
};

// Spustíme asynchrónnu funkciu
setupDatabase().catch((err) => {
  console.error('Error setting up the database:', err);
});
