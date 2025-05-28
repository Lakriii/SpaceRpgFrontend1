// src/app/api/player/route.ts
import { db } from "@lib/db/db";
import { players, users } from "@lib/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = Number(searchParams.get("userId"));

  if (!userId) {
    return NextResponse.json({ error: "Missing userId" }, { status: 400 });
  }

  const result = await db
    .select({
      ...players,
      username: users.username, 
    })
    .from(players)
    .innerJoin(users, eq(players.user_id, users.id))
    .where(eq(players.user_id, userId))
    .limit(1);

  return NextResponse.json(result[0] || null);
}