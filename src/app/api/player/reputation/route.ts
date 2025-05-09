// src/app/api/player/reputation/route.ts
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { db } from "@lib/db/db";
import { players, achievements, playerAchievements } from "@lib/db/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  try {
    // 🟡 Získaj ID používateľa z cookie (nastavené pri login)
    const cookieStore = cookies();
    const userId = Number(cookieStore.get("userId")?.value);

    if (!userId) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    // 🔵 Nájdeme hráča priradeného k tomuto userovi
    const playerResult = await db
      .select({ id: players.id, reputation: players.reputation })
      .from(players)
      .where(eq(players.user_id, userId))
      .limit(1);

    const player = playerResult[0];
    if (!player) {
      return NextResponse.json({ error: "Player not found" }, { status: 404 });
    }

    // 🏆 Získame achievementy hráča
    const achievementResult = await db
      .select({
        name: achievements.name,
        description: achievements.description,
        earned: playerAchievements.earned,
      })
      .from(playerAchievements)
      .innerJoin(achievements, eq(achievements.id, playerAchievements.achievement_id))
      .where(eq(playerAchievements.player_id, player.id));

    return NextResponse.json({
      reputation: player.reputation ?? 0,
      achievements: achievementResult,
    });
  } catch (error) {
    console.error("Error loading reputation data:", error);
    return NextResponse.json({ error: "Failed to load data" }, { status: 500 });
  }
}