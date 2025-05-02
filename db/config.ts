import { drizzle } from 'drizzle-orm/sqlite3';
import sqlite3 from 'sqlite3';
import { migrate } from 'drizzle-orm/sqlite3/migrator';

const sqlite = new sqlite3.Database('sqlite.db');
export const db = drizzle(sqlite);