import { db } from "@lib/db/db";
import { players, playerInventory, items, playerResources } from "@lib/db/schema";
import { eq, and } from "drizzle-orm";
import { sql } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { playerId, itemId, quantity } = body;

    if (!playerId || !itemId || quantity < 1) {
      return NextResponse.json({ success: false, message: "Invalid input" }, { status: 400 });
    }

    // 1. Fetch item
    const [item] = await db.select().from(items).where(eq(items.id, itemId));
    if (!item) {
      return NextResponse.json({ success: false, message: "Item not found" }, { status: 404 });
    }

    // 2. Fetch player
    const [player] = await db.select().from(players).where(eq(players.id, playerId));
    if (!player) {
      return NextResponse.json({ success: false, message: "Player not found" }, { status: 404 });
    }

    // 3. Fetch player inventory entry
    const [inventoryEntry] = await db
      .select()
      .from(playerInventory)
      .where(and(eq(playerInventory.player_id, playerId), eq(playerInventory.item_id, itemId)));

    if (!inventoryEntry || inventoryEntry.quantity < quantity) {
      return NextResponse.json({ success: false, message: "Not enough items to sell" }, { status: 400 });
    }

    // 4. Calculate total reward
    const creditReward = item.credits * quantity;
    const ironReward = item.iron * quantity;
    const goldReward = item.gold * quantity;

    // 5. Update player's credits
    await db
      .update(players)
      .set({
        credits: player.credits + creditReward,
      })
      .where(eq(players.id, playerId));

    // 6. Update resources
    if (ironReward > 0) {
      await db
        .update(playerResources)
        .set({
          quantity: sql`${playerResources.quantity} + ${ironReward}`,
        })
        .where(
          and(eq(playerResources.player_id, playerId), eq(playerResources.mining_node_id, 1)) // Iron Node ID = 1
        );
    }

    if (goldReward > 0) {
      await db
        .update(playerResources)
        .set({
          quantity: sql`${playerResources.quantity} + ${goldReward}`,
        })
        .where(
          and(eq(playerResources.player_id, playerId), eq(playerResources.mining_node_id, 4)) // Gold Node ID = 4
        );
    }

    // 7. Update or delete inventory
const newQuantity = inventoryEntry.quantity - quantity;

if (newQuantity <= 0) {
  await db
    .delete(playerInventory)
    .where(and(eq(playerInventory.player_id, playerId), eq(playerInventory.item_id, itemId)));
} else {
  await db
    .update(playerInventory)
    .set({ quantity: newQuantity })
    .where(and(eq(playerInventory.player_id, playerId), eq(playerInventory.item_id, itemId)));
}

// 8. Fetch updated resources and inventory
const updatedResources = await db
  .select({
    mining_node_id: playerResources.mining_node_id,
    quantity: playerResources.quantity,
  })
  .from(playerResources)
  .where(eq(playerResources.player_id, playerId));

const updatedInventory = await db
  .select({
    id: items.id,
    name: items.name,
    description: items.description,
    iron: items.iron,
    credits: items.credits,
    gold: items.gold,
    rarity: items.rarity,
    contentType: items.content_type,
    quantity: playerInventory.quantity,
  })
  .from(playerInventory)
  .innerJoin(items, eq(playerInventory.item_id, items.id))
  .where(eq(playerInventory.player_id, playerId));

// 9. Return response
return NextResponse.json({
  success: true,
  message: `Sold ${quantity}x ${item.name}`,
  updatedResources,
  updatedInventory,
});
  } catch (err) {
    console.error("Sell error:", err);
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
  }
}