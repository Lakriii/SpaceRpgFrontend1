// lib/db/migrate.ts
import { migrate } from 'drizzle-orm/libsql/migrator';
import { db } from './config'; // Importujte db z config.ts

await migrate(db, { migrationsFolder: './drizzle' });
console.log('Migrácia úspešne dokončená.');