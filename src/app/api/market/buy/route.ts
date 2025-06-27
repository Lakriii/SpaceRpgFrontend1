import { db } from "@lib/db/db";
import { players, playerInventory, items, playerResources } from "@lib/db/schema";
import { eq, and } from "drizzle-orm";
import { NextResponse } from "next/server";
import { sql } from 'drizzle-orm';


export async function POST(req: Request) {
  const body = await req.json();
  const { itemId, playerId } = body;

  console.log("📌 itemId:", itemId, "playerId:", playerId);

  if (!playerId) {
    return NextResponse.json(
      { success: false, message: "Player ID missing" },
      { status: 400 }
    );
  }

  // Načítaj hráča
  const playersFound = await db
    .select()
    .from(players)
    .where(eq(players.id, playerId))
    .limit(1);

  const player = playersFound[0];
  console.log("player:", player);

  if (!player) {
    return NextResponse.json(
      { success: false, message: "Player not found" },
      { status: 404 }
    );
  }

  // Načítaj playerResources
  const resources = await db
    .select()
    .from(playerResources)
    .where(eq(playerResources.player_id, playerId));
  console.log("playerResources:", resources);

  // Spočítaj všetky dostupné zdroje
  const totalResources = {
    credits: player.credits || 0,
    iron: player.iron || 0,
    gold: player.gold || 0,
  };

  for (const res of resources) {
    if (res.mining_node_id === 1) totalResources.iron += res.quantity;
    if (res.mining_node_id === 2) totalResources.gold += res.quantity;
    if (res.mining_node_id === 3) totalResources.credits += res.quantity;
  }

  console.log("totalResources:", totalResources);

  // Načítaj item
  const itemsFound = await db
    .select()
    .from(items)
    .where(eq(items.id, itemId))
    .limit(1);

  const item = itemsFound[0];
  console.log("item:", item);

  if (!item) {
    return NextResponse.json(
      { success: false, message: "Item not found" },
      { status: 404 }
    );
  }

  const cost = {
    credits: item.credits || 0,
    iron: item.iron || 0,
    gold: item.gold || 0,
  };
  console.log("cost:", cost);

  if (
    totalResources.credits < cost.credits ||
    totalResources.iron < cost.iron ||
    totalResources.gold < cost.gold
  ) {
    return NextResponse.json({
      success: false,
      message: "❌ Not enough resources to buy this item!",
    });
  }

  const IRON_NODE_ID = 1; // alebo aké ID má iron v mining_nodes
const GOLD_NODE_ID = 4; // alebo aké ID má gold v mining_nodes

 // 1. Odpočítaj credits z tabuľky players
await db
  .update(players)
  .set({
    credits: player.credits - cost.credits,
  })
  .where(eq(players.id, playerId));

// 2. Odpočítaj iron z tabuľky player_resources
await db
  .update(playerResources)
  .set({
    quantity: sql`${playerResources.quantity} - ${cost.iron}`,
  })
  .where(
    and(
      eq(playerResources.player_id, playerId),
      eq(playerResources.mining_node_id, IRON_NODE_ID)
    )
  );

// 3. Odpočítaj gold z tabuľky player_resources
await db
  .update(playerResources)
  .set({
    quantity: sql`${playerResources.quantity} - ${cost.gold}`,
  })
  .where(
    and(
      eq(playerResources.player_id, playerId),
      eq(playerResources.mining_node_id, GOLD_NODE_ID)
    )
  );

  // Inventár: skontroluj či item už má
  const inventoryFound = await db
    .select()
    .from(playerInventory)
    .where(
      and(
        eq(playerInventory.player_id, playerId),
        eq(playerInventory.item_id, item.id)
      )
    )
    .limit(1);

  const existingItem = inventoryFound[0];
  console.log("existingItem:", existingItem);

  if (existingItem) {
    await db
      .update(playerInventory)
      .set({ quantity: existingItem.quantity + 1 })
      .where(
        and(
          eq(playerInventory.player_id, playerId),
          eq(playerInventory.item_id, item.id)
        )
      );
  } else {
    await db.insert(playerInventory).values({
      player_id: playerId,
      item_id: item.id,
      quantity: 1,
      is_equipped: false,
    });
  }

  return NextResponse.json({
    success: true,
    message: `✅ Successfully purchased ${item.name}!`,
  });
}
