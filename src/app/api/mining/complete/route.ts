import { NextResponse } from 'next/server';
import { db } from '@lib/db/db';
import { eq, and } from 'drizzle-orm';
import { players, playerResources } from '@lib/db/schema';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userId, credits, experience, miningResults } = body;

    if (!userId || credits == null || experience == null || !Array.isArray(miningResults)) {
      return NextResponse.json({ error: 'Missing or invalid data' }, { status: 400 });
    }

    // Získame playerId podľa userId
    const player = await db
      .select()
      .from(players)
      .where(eq(players.user_id, Number(userId)))
      .limit(1)
      .then(rows => rows[0]);

    if (!player) {
      return NextResponse.json({ error: 'Player not found' }, { status: 404 });
    }

    const playerId = player.id;

    // Vypočítame nové kredity a XP
    const newCredits = (player.credits ?? 0) + Number(credits);
    const newExperience = (player.experience ?? 0) + Number(experience);

    // Aktualizujeme kredity a skúsenosti priamo
    await db
      .update(players)
      .set({
        credits: newCredits,
        experience: newExperience,
      })
      .where(eq(players.id, playerId));

    // Update alebo insert mined resources
    for (const result of miningResults) {
      const miningNodeIdNum = Number(result.miningNodeId);
      const quantityNum = Number(result.quantity);

      const existingResource = await db
        .select()
        .from(playerResources)
        .where(
          and(
            eq(playerResources.player_id, playerId),
            eq(playerResources.mining_node_id, miningNodeIdNum)
          )
        )
        .limit(1)
        .then(rows => rows[0]);

      if (existingResource) {
        // Ak existuje, pridáme k existujúcej množine
        const updatedQuantity = (existingResource.quantity ?? 0) + quantityNum;
        await db
          .update(playerResources)
          .set({
            quantity: updatedQuantity,
            last_mined_at: new Date()

          })
           .where(
      and(
        eq(playerResources.player_id, playerId),
        eq(playerResources.mining_node_id, miningNodeIdNum)
      )
    );
      } else {
        // Ak neexistuje, vložíme nový záznam
        await db.insert(playerResources).values({
          player_id: playerId,
          mining_node_id: miningNodeIdNum,
          quantity: quantityNum,
          last_mined_at: new Date()
        });
      }
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('❌ Error saving mining results:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
