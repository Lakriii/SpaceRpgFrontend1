import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@lib/db/db";
import { players } from "@lib/db/schema";
import { items } from "@lib/db/schema/items/base";
import { playerInventory } from "@lib/db/schema/items/inventory";
import { playerResources } from "@lib/db/schema/mining";
import { miningNodes } from "@lib/db/schema/mining";

export async function GET(request: Request) {
  console.log("✅ [STEP 1] GET /api/playerresources called");

  try {
    const url = new URL(request.url);
    const playerId = url.searchParams.get("playerId");
    console.log("📌 playerId:", playerId);

    if (!playerId) {
      console.warn("❌ Missing playerId in request");
      return NextResponse.json({ error: "Missing playerId" }, { status: 400 });
    }

    // Fetch player
    console.log("➡️ [STEP 2] Fetching player...");
    const player = await db
      .select()
      .from(players)
      .where(eq(players.id, Number(playerId)))
      .limit(1);
    console.log("✅ [STEP 2] Player fetched:", player);

    if (player.length === 0) {
      console.warn("❌ Player not found");
      return NextResponse.json({ error: "Player not found" }, { status: 404 });
    }

    // Fetch resources
    console.log("➡️ [STEP 3] Fetching player resources...");
    const resourcesRows = await db
      .select({
        mining_node_id: playerResources.mining_node_id,
        quantity: playerResources.quantity,
        node_name: miningNodes.name,
      })
      .from(playerResources)
      .innerJoin(miningNodes, eq(playerResources.mining_node_id, miningNodes.id))
      .where(eq(playerResources.player_id, Number(playerId)));

    console.log("✅ [STEP 3] Resources fetched:", resourcesRows);

    const resources: Record<string, number> = {};
    resourcesRows.forEach((row) => {
      console.log(`📦 Resource - ID: ${row.mining_node_id}, Name: ${row.node_name}, Qty: ${row.quantity}`);
      if (row.node_name) {
        resources[row.node_name] = row.quantity;
      }
    });

    // Fetch inventory
    console.log("➡️ [STEP 4] Fetching player inventory...");
    const inventoryItems = await db
      .select({
        itemId: playerInventory.item_id,
        quantity: playerInventory.quantity,
        id: items.id,
        name: items.name,
        price: items.price,
        description: items.description,
        costType: items.costType,
      })
      .from(playerInventory)
      .innerJoin(items, eq(playerInventory.item_id, items.id))
      .where(eq(playerInventory.player_id, Number(playerId)));

    console.log("✅ [STEP 4] Inventory items fetched:", inventoryItems);

    // Transform and return
    const transformedInventory = inventoryItems.map((inv) => ({
      id: inv.itemId,
      name: inv.name,
      price: inv.price,
      description: inv.description,
      costType: inv.costType,
      quantity: inv.quantity,
    }));

    console.log("✅ [FINAL] Sending full response");

    return NextResponse.json({
      player: player[0],
      resources,
      resourcesDetails: resourcesRows,
      inventory: transformedInventory,
    });
  } catch (error: any) {
    console.error("🔥 [ERROR] Exception in GET /api/playerresources:", error);
    console.trace();
    return NextResponse.json(
      { error: error.message || "Server error" },
      { status: 500 }
    );
  }
}
