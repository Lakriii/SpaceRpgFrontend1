import { db } from "@lib/db/db";
import { marketItems, items } from "@lib/db/schema";
import { eq } from "drizzle-orm"; // Dôležité!

export const getMarketItemsByType = async (type: string) => {
  const result = await db
    .select({
      marketItemId: marketItems.id,
      price: marketItems.price,
      deliveryTime: marketItems.delivery_time,
      location: marketItems.location,
      itemId: items.id,
      name: items.name,
      description: items.description,
      value: items.value,
      rarity: items.rarity,
      contentType: items.content_type,
    })
    .from(marketItems)
    .innerJoin(items, eq(marketItems.item_id, items.id)) // Opravené
    .where(eq(marketItems.market_type, type)); // Opravené

  return result;
};
