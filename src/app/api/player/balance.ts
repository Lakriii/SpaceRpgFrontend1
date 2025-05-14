// app/api/player/balance/route.ts
import { db } from "@lib/db/db";
import { players } from "@lib/db/schema";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";

export async function GET() {
  const player = await db.query.players.findFirst({
    where: eq(players.id, 1), // Dočasne hráč s ID 1
  });

  if (!player) {
    return NextResponse.json({ error: "Player not found" }, { status: 404 });
  }

  return NextResponse.json({ credits: player.credits });
}
