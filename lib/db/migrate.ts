import { migrate } from 'drizzle-orm/libsql/migrator';
import { db } from './config.ts'; // <- dôležité: prípona .ts

await migrate(db, { migrationsFolder: './drizzle' });
console.log('Migrácia úspešne dokončená.');