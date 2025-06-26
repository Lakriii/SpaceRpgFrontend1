import { db } from "@lib/db/db";
import { players, playerInventory, items, playerResources, miningNodes } from "@lib/db/schema";
import { eq, and } from "drizzle-orm";
import { NextResponse } from "next/server";

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

  // Načítaj hráča podľa playerId
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

  // Načítaj playerResources pre hráča
  const resources = await db
    .select()
    .from(playerResources)
    .where(eq(playerResources.player_id, playerId));
  console.log("playerResources:", resources);

  // Vytvoríme súhrn dostupných zdrojov zo základných + mining nodes
  const totalResources = {
    credits: player.credits || 0,
    iron: player.iron || 0,
    gold: player.gold || 0,
  };

  // Tu predpokladám, že mining_node_id predstavuje typ zdroja:
  // napr. 1 = iron, 2 = gold, 3 = credits
  for (const res of resources) {
    if (res.mining_node_id === 1) {
      totalResources.iron += res.quantity;
    } else if (res.mining_node_id === 2) {
      totalResources.gold += res.quantity;
    } else if (res.mining_node_id === 3) {
      totalResources.credits += res.quantity;
    }
  }

  console.log("totalResources:", totalResources);

  // Načítaj položku priamo z items
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

  // Overenie zdrojov podľa totalResources
  const cost = {
    credits: item.credits || 0,
    iron: item.iron || 0,
    gold: item.gold || 0,
  };
  console.log("cost", cost);

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

  // Odpočítaj zdroje hráča z pôvodného playera (len základné zdroje, nie mining nodes)
  await db
    .update(players)
    .set({
      credits: player.credits - cost.credits,
      iron: player.iron - cost.iron,
      gold: player.gold - cost.gold,
    })
    .where(eq(players.id, playerId));

  // Skontroluj inventár hráča pre danú položku
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
    // Ak už má hráč túto položku, zvýš množstvo o 1
    await db
      .update(playerInventory)
      .set({ quantity: existingItem.quantity + 1 })
      .where(eq(playerInventory.id, existingItem.id));
  } else {
    // Ak ju ešte nemá, vlož ju do inventára
    await db.insert(playerInventory).values({
      player_id: playerId,
      item_id: item.id,
      quantity: 1,
      is_equipped: false,
    });
  }

  // Aktualizuj alebo vlož playerResources podľa mining_node_id z item.id
  const existingResource = await db
    .select()
    .from(playerResources)
    .where(
      and(
        eq(playerResources.player_id, playerId),
        eq(playerResources.mining_node_id, item.id)
      )
    )
    .limit(1);

  console.log("existingResource:", existingResource);

  if (existingResource.length > 0) {
    const resource = existingResource[0];
    await db
      .update(playerResources)
      .set({ quantity: resource.quantity + 1 })
      .where(eq(playerResources.id, resource.id));
  } else {
    await db.insert(playerResources).values({
      player_id: playerId,
      mining_node_id: item.id,
      quantity: 1,
      last_mined_at: null,
    });
  }

  return NextResponse.json({
    success: true,
    message: `✅ Successfully purchased ${item.name}!`,
  });
}
