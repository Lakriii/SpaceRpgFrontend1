import { db } from '@/lib/db';
import { players } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const playerId = Number(searchParams.get('playerId'));
  if (!playerId) return NextResponse.json({ error: 'Missing playerId' }, { status: 400 });

  try {
    const player = await db
      .select({ credits: players.credits, experience: players.experience })
      .from(players)
      .where(eq(players.id, playerId))
      .limit(1);

    if (!player.length) return NextResponse.json({ error: 'Player not found' }, { status: 404 });

    return NextResponse.json(player[0]);
  } catch (error) {
    console.error('Error fetching player status:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
