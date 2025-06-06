import { db } from "@lib/db/db";
import { players, users, playerResources, miningNodes } from "@lib/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = Number(searchParams.get("userId"));

  if (!userId) {
    return NextResponse.json({ error: "Missing userId" }, { status: 400 });
  }

  // Načítaj hráča spolu s username
  const playerResult = await db
    .select({
      ...players,
      username: users.username,
    })
    .from(players)
    .innerJoin(users, eq(players.user_id, users.id))
    .where(eq(players.user_id, userId))
    .limit(1);

  const player = playerResult[0];
  if (!player) {
    return NextResponse.json(null);
  }

  // Načítaj zdroje hráča (resources)
  const resources = await db
    .select({
      nodeId: miningNodes.id,
      nodeName: miningNodes.name,
      rarity: miningNodes.rarity,
      quantity: playerResources.quantity,
      lastMinedAt: playerResources.last_mined_at,
    })
    .from(playerResources)
    .leftJoin(miningNodes, eq(playerResources.mining_node_id, miningNodes.id))
    .where(eq(playerResources.player_id, player.id));

  return NextResponse.json({
    player,
    resources,
  });
}
