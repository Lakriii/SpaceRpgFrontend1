import { db } from "@lib/db/db";
import { eq, and } from "drizzle-orm";
import { playerResearch, researchNodes, players } from "@lib/db/schema";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { id, userId } = await req.json();

    if (!id || !userId) {
      console.error("❌ Missing id or userId in request body", id, userId);
      return NextResponse.json({ message: "Invalid data" }, { status: 400 });
    }

    console.log("📥 Výskum ID:", id, "od používateľa ID:", userId);

    // Získame player_id
    const playerResult = await db
      .select()
      .from(players)
      .where(eq(players.user_id, Number(userId)))
      .limit(1)
      .then(rows => rows[0]);

    if (!playerResult) {
      console.error("❌ Player not found");
      return NextResponse.json({ message: "Player not found" }, { status: 404 });
    }

    const playerId = playerResult.id;

    // Skontrolujeme existujúci záznam pre tento research node
    const existingResearch = await db
      .select()
      .from(playerResearch)
      .where(and(
        eq(playerResearch.player_id, playerId),
        eq(playerResearch.research_node_id, id)
      ))
      .limit(1)
      .then(rows => rows[0]);

    if (!existingResearch) {
      // Ak záznam neexistuje, vložíme nový completed
      await db.insert(playerResearch).values({
        player_id: playerId,
        research_node_id: id,
        status: "completed",
        completed_at: Date.now(),
      });
      console.log("✅ Pridaný nový completed research.");
    } else if (existingResearch.status === 'unlocked') {
      // Ak existuje unlocked, aktualizujeme na completed
      await db
        .update(playerResearch)
        .set({ status: "completed", completed_at: Date.now() })
        .where(and(
          eq(playerResearch.player_id, playerId),
          eq(playerResearch.research_node_id, id)
        ));
      console.log("✅ Updatnutý unlocked na completed.");
    } else {
      console.log("✅ Výskum už bol completed, preskakujem.");
    }

    // Odomknutie detí (rovnaká logika ako predtým)
    const children = await db
      .select({ id: researchNodes.id })
      .from(researchNodes)
      .where(eq(researchNodes.parent_id, id));

    for (const child of children) {
      const existingChild = await db
        .select()
        .from(playerResearch)
        .where(and(
          eq(playerResearch.player_id, playerId),
          eq(playerResearch.research_node_id, child.id)
        ))
        .limit(1)
        .then(rows => rows[0]);

      if (!existingChild) {
        await db.insert(playerResearch).values({
          player_id: playerId,
          research_node_id: child.id,
          status: "unlocked",
          completed_at: null,
        });
        console.log(`✅ Sub-research ${child.id} odomknutý.`);
      } else {
        console.log(`✅ Sub-research ${child.id} už existuje, preskakujem insert.`);
      }
    }

    const updatedResearch = await db
      .select()
      .from(playerResearch)
      .where(eq(playerResearch.player_id, playerId));

    console.log("✅ Výskum aktualizovaný");
    return NextResponse.json(updatedResearch);
  } catch (error) {
    console.error("❌ Server error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}