//toto je market 

import { NextResponse } from "next/server";
import buyItem from "@lib/market/buyItem";
import { db } from "@lib/db/db";
import { players } from "@lib/db/schema";
import { eq } from "drizzle-orm";

export async function POST(request: Request) {
  try {
    const { playerId, itemId, price } = await request.json();

    if (!playerId || !itemId || !price) {
      return NextResponse.json(
        { success: false, message: "Missing playerId, itemId, or price" },
        { status: 400 }
      );
    }

    // Načítať hráča, aby sme skontrolovali credits ešte pred nákupom
    const [player] = await db
      .select()
      .from(players)
      .where(eq(players.id, playerId))
      .limit(1);

    if (!player) {
      return NextResponse.json(
        { success: false, message: "Player not found" },
        { status: 404 }
      );
    }

    const creditsNeeded = price.credits || 0;
    if (player.credits < creditsNeeded) {
      return NextResponse.json(
        { success: false, message: `❌ Not enough credits! You have ${player.credits}, need ${creditsNeeded}` },
        { status: 400 }
      );
    }

    // Ak je všetko OK, zavoláme buyItem
    const result = await buyItem(playerId, itemId, price);

    if (!result.success) {
      return NextResponse.json({ success: false, message: result.message || "Purchase failed" }, { status: 400 });
    }

    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Purchase failed" },
      { status: 400 }
    );
  }
}

