// app/api/npcs/route.ts
import { NextResponse } from "next/server";
import { db } from "@lib/db/db";
import { npcs, npcInteractions } from "@lib/db/schema";

export async function GET() {
  const allNpcs = await db.select().from(npcs);
  const allInteractions = await db.select().from(npcInteractions);

  const data = allNpcs.map((npc) => {
    const interactions = allInteractions
      .filter((i) => i.npc_id === npc.id)
      .map((i) => i.interaction_type);

    return {
      ...npc,
      interactions: interactions ?? [], // vždy pole
    };
  });

  return NextResponse.json(data);
}
