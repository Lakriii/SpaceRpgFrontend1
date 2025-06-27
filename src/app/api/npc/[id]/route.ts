import { NextResponse } from "next/server";
import { eq, inArray } from "drizzle-orm";
import { db } from "@lib/db/db";
import { npcs, npcInteractions, npcItemsForSale } from "@lib/db/schema";
import { items } from "@lib/db/schema/items/base";

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }  // tu je Promise
) {
  const params = await context.params;           // await params
  const npcId = Number(params.id);
  console.log(`[API] Received request for NPC ID: ${npcId}`);

  if (isNaN(npcId)) {
    console.warn("[API] Invalid NPC id:", params.id);
    return NextResponse.json({ error: "Invalid NPC id" }, { status: 400 });
  }

  try {
    // Načítanie NPC
    const [npc] = await db
      .select()
      .from(npcs)
      .where(eq(npcs.id, npcId))
      .limit(1);
    console.log("[API] Fetched NPC:", npc);

    if (!npc) {
      console.warn("[API] NPC not found with id:", npcId);
      return NextResponse.json({ error: "NPC not found" }, { status: 404 });
    }

    // Načítanie interakcií
    const interactions = await db
      .select({ interaction_type: npcInteractions.interaction_type })
      .from(npcInteractions)
      .where(eq(npcInteractions.npc_id, npcId));
    

    // Načítanie predajných položiek
    const itemsForSaleRaw = await db
      .select({
        item_id: npcItemsForSale.item_id,
        quantity: npcItemsForSale.quantity,
        price: npcItemsForSale.price,
      })
      .from(npcItemsForSale)
      .where(eq(npcItemsForSale.npc_id, npcId));


    // Načítanie detailov položiek
    const itemIds = itemsForSaleRaw.map((item) => item.item_id);
 

    let itemsDetails = [];

    if (itemIds.length > 0) {
      itemsDetails = await db
        .select({
          id: items.id,
          name: items.name,
          description: items.description,
          iron: items.iron,
          credits: items.credits,
          gold: items.gold,
          rarity: items.rarity,
          contentType: items.content_type,
        })
        .from(items)
        .where(inArray(items.id, itemIds));

    }

    // Spojenie údajov o položkách
    const itemsForSale = itemsForSaleRaw.map((sale) => {
      const details = itemsDetails.find((i) => i.id === sale.item_id);
      const item = {
        id: sale.item_id,
        quantity: sale.quantity,
        price: sale.price,
        name: details?.name || "Unknown",
        description: details?.description || "",
        iron: details?.iron || 0,
        credits: details?.credits || 0,
        gold: details?.gold || 0,
        rarity: details?.rarity || "common",
        contentType: details?.contentType || "unknown",
      };
      return item;
    });

    // Odoslanie odpovede
    const responseData = {
      npc,
      interactions: interactions.map((i) => i.interaction_type),
      itemsForSale,
    };

    return NextResponse.json(responseData);
  } catch (error: any) {
    console.error("[API] Error fetching NPC:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
