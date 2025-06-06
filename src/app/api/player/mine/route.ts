import { db } from '@/lib/db';
import { playerResources, players } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export async function POST(req: Request, { params }: { params: { playerId: string } }) {
  const playerId = Number(params.playerId);
  const body = await req.json();
  const { nodeId, gainedResources, gainedCredits, gainedExp } = body;

  // aktualizuj kredity a exp
  await db
    .update(players)
    .set({
      credits: db.raw(`credits + ${gainedCredits}`),
      experience: db.raw(`experience + ${gainedExp}`),
    })
    .where(eq(players.id, playerId));

  // aktualizuj množstvo surovín
  await db
    .insert(playerResources)
    .values({
      player_id: playerId,
      mining_node_id: nodeId,
      quantity: gainedResources,
      last_mined_at: Math.floor(Date.now() / 1000),
    })
    .onConflictDoUpdate({
      target: [playerResources.player_id, playerResources.mining_node_id],
      set: {
        quantity: db.raw(`quantity + ${gainedResources}`),
        last_mined_at: Math.floor(Date.now() / 1000),
      },
    });

  return NextResponse.json({ success: true });
}
