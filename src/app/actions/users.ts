'use server';

import { db } from '../../../lib/db/migrate';
import { users } from '../../../lib/db/schema';

export async function getAllUsers() {
  return await db.select().from(users);
}

export async function addUser(name: string, email: string) {
  await db.insert(users).values({ name, email });
}
