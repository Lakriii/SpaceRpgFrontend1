import { NextResponse } from 'next/server';
import { db } from '@lib/db/db';
import { researchNodes, playerResearch, players } from '@lib/db/schema';
import { eq, and } from 'drizzle-orm';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId');

  if (!userId) {
    return NextResponse.json({ message: "Missing userId" }, { status: 400 });
  }

  // Najdeme playerId z userId
  const playerResult = await db
    .select()
    .from(players)
    .where(eq(players.user_id, Number(userId)))
    .limit(1)
    .then(rows => rows[0]);

  if (!playerResult) {
    return NextResponse.json({ message: "Player not found" }, { status: 404 });
  }

  const playerId = playerResult.id;

  // Načítame všetky research nody
  const allNodes = await db.select().from(researchNodes);

  // Načítame player research stavy
  const playerResearches = await db
    .select()
    .from(playerResearch)
    .where(eq(playerResearch.player_id, playerId));

  // Vytvoríme mapu statusov pre rýchle lookupy
  const researchStatusMap = new Map<number, string>();
  playerResearches.forEach(pr => {
    researchStatusMap.set(pr.research_node_id, pr.status);
  });

  // Rozdelíme na hlavné a sub researchy
  const mainResearch = allNodes.filter((node) => node.parent_id === null);
  const subResearch = allNodes.filter((node) => node.parent_id !== null);

  const researchWithSubs = mainResearch.map((main) => ({
    ...main,
    status: researchStatusMap.get(main.id) || 'locked',
    subResearch: subResearch
      .filter((sub) => sub.parent_id === main.id)
      .map((sub) => ({
        ...sub,
        status: researchStatusMap.get(sub.id) || 'locked',
      })),
  }));

  return NextResponse.json(researchWithSubs);
}