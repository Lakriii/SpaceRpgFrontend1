import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@lib/db/db";
import { players } from "@lib/db/schema";
import { items } from "@lib/db/schema/items/base";
import { playerInventory } from "@lib/db/schema/items/inventory";
import { playerResources } from "@lib/db/schema/mining";
import { miningNodes } from "@lib/db/schema/mining";

export async function GET(request: Request) {

  try {
    const url = new URL(request.url);
    const playerId = url.searchParams.get("playerId");

    if (!playerId) {
      console.warn("❌ Missing playerId in request");
      return NextResponse.json({ error: "Missing playerId" }, { status: 400 });
    }

    // Fetch player
    const player = await db
      .select()
      .from(players)
      .where(eq(players.id, Number(playerId)))
      .limit(1);

    if (player.length === 0) {
      console.warn("❌ Player not found");
      return NextResponse.json({ error: "Player not found" }, { status: 404 });
    }

    // Fetch resources
    const resourcesRows = await db
      .select({
        mining_node_id: playerResources.mining_node_id,
        quantity: playerResources.quantity,
        node_name: miningNodes.name,
      })
      .from(playerResources)
      .innerJoin(miningNodes, eq(playerResources.mining_node_id, miningNodes.id))
      .where(eq(playerResources.player_id, Number(playerId)));


    const resources: Record<string, number> = {};
    resourcesRows.forEach((row) => {
      if (row.node_name) {
        resources[row.node_name] = row.quantity;
      }
    });

    // Fetch inventory

    const inventoryItems = await db
      .select({
        itemId: playerInventory.item_id,
        quantity: playerInventory.quantity,
        id: items.id,
        name: items.name,
        description: items.description,
        iron: items.iron,
        credits: items.credits,
        gold: items.gold,
        rarity: items.rarity,
        contentType: items.content_type,
      })
      .from(playerInventory)
      .innerJoin(items, eq(playerInventory.item_id, items.id))
      .where(eq(playerInventory.player_id, Number(playerId)));


    // Transform and return
    const transformedInventory = inventoryItems.map((inv) => ({
      id: inv.itemId,
      name: inv.name,
      description: inv.description,
      iron: inv.iron, // používaj iron, nie value
      credits: inv.credits,
      gold: inv.gold,
      rarity: inv.rarity,
      contentType: inv.contentType,
      quantity: inv.quantity,
    }));


    return NextResponse.json({
      player: player[0],
      resources,
      resourcesDetails: resourcesRows,
      inventory: transformedInventory,
    });
  } catch (error: any) {
    console.error("🔥 [ERROR] Exception in GET /api/playerresources:", error);
    return NextResponse.json(
      { error: error.message || "Server error" },
      { status: 500 }
    );
  }
}
