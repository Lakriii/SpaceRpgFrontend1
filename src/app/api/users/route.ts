import drizzleInstance from '../../../db/schema';
import { User } from '@/modles/User';
import type { NextApiRequest, NextApiResponse } from 'next';
import type { UserType } from '@/modles/User';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      const users: UserType[] = await drizzleInstance.select(User).all();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching users' });
    }
  } else if (req.method === 'POST') {
    try {
      const { name, email } = req.body;
      if (!name || !email) {
        return res.status(400).json({ error: 'Name and email are required' });
      }

      await drizzleInstance.insert(User).values({ name, email }).run();

      res.status(201).json({ success: true });
    } catch (error) {
      res.status(500).json({ error: 'Error creating user' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
