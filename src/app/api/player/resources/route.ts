import { NextResponse } from 'next/server';
import { db } from '@lib/db/db';
import { playerResources, miningNodes } from '@lib/db/schema/mining';
import { eq } from 'drizzle-orm';

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const playerId = url.searchParams.get('playerId');
    if (!playerId) {
      return NextResponse.json({ error: 'Missing playerId' }, { status: 400 });
    }

    const resources = await db
      .select({
        miningNodeName: miningNodes.name,
        quantity: playerResources.quantity,
      })
      .from(playerResources)
      .innerJoin(miningNodes, eq(playerResources.mining_node_id, miningNodes.id))
      .where(eq(playerResources.player_id, Number(playerId)));

    return NextResponse.json(resources);
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
