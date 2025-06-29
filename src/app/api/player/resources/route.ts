import { db } from '@/lib/db';
import { playerResources } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const playerId = Number(searchParams.get('playerId'));
  if (!playerId) return NextResponse.json({ error: 'Missing playerId' }, { status: 400 });

  try {
    const resources = await db
      .select()
      .from(playerResources)
      .where(eq(playerResources.player_id, playerId));

    return NextResponse.json(resources);
  } catch (error) {
    console.error('Error fetching player resources:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
