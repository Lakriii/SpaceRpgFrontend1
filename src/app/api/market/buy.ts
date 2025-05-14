// app/api/market/buy/route.ts
import { db } from "@lib/db/db";
import { players, items, marketItems, playerInventory } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const itemName = body.itemName;

  const player = await db.query.players.findFirst({
    where: eq(players.id, 1), // Dočasne hráč ID 1
  });

  if (!player) {
    return NextResponse.json({ success: false, message: "Player not found" });
  }

  const marketItem = await db.query.marketItems.findFirst({
    where: and(
      eq(marketItems.price, marketItems.price), // Needed for Drizzle optimizer
      eq(marketItems.item_id, items.id)
    ),
    with: {
      item: true,
    },
    whereClause: (mi) => eq(items.name, itemName),
  });

  if (!marketItem || !marketItem.item) {
    return NextResponse.json({ success: false, message: "Item not found" });
  }

  if (player.credits < marketItem.price) {
    return NextResponse.json({
      success: false,
      message: "❌ Not enough credits!",
    });
  }

  // Update credits
  await db
    .update(players)
    .set({ credits: player.credits - marketItem.price })
    .where(eq(players.id, player.id));

  // Add to inventory
  await db.insert(playerInventory).values({
    player_id: player.id,
    item_id: marketItem.item.id,
    quantity: 1,
    is_equipped: false,
  });

  return NextResponse.json({
    success: true,
    message: `✅ Successfully purchased ${marketItem.item.name}!`,
  });
}
