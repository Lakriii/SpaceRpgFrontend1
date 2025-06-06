// src/app/api/mining/complete/route.ts
import { NextResponse } from 'next/server';
import { db } from '@lib/db/db';
import { players } from '@lib/db/schema/players';
import { playerResources } from '@lib/db/schema/mining';
import { eq, and } from 'drizzle-orm';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { playerId, credits, experience, miningResults } = body;

    if (!playerId || !miningResults || !Array.isArray(miningResults)) {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }

    // ✅ Update hráčov profil
    await db.update(players)
      .set({
        credits: players.credits + credits,
        experience: players.experience + experience,
        missions_completed: players.missions_completed + 1
      })
      .where(eq(players.id, playerId));

    // ✅ Update playerResources pre každý mining_node_id
    for (const result of miningResults) {
      const { miningNodeId, quantity } = result;

      // Check if playerResource row already exists
      const existing = await db
        .select()
        .from(playerResources)
        .where(and(
          eq(playerResources.player_id, playerId),
          eq(playerResources.mining_node_id, miningNodeId)
        ));

      if (existing.length > 0) {
        // ✅ Existuje → update množstva
        await db
          .update(playerResources)
          .set({
            quantity: playerResources.quantity + quantity,
            last_mined_at: new Date(),
          })
          .where(and(
            eq(playerResources.player_id, playerId),
            eq(playerResources.mining_node_id, miningNodeId)
          ));
      } else {
        // ✅ Neexistuje → insert
        await db.insert(playerResources).values({
          player_id: playerId,
          mining_node_id: miningNodeId,
          quantity,
          last_mined_at: new Date()
        });
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[MINING COMPLETE ERROR]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
