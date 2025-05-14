// lib/market/getMarketItems.ts
import { db } from "@lib/db/db"; // Import the Drizzle instance

export const getMarketItemsByType = async (type: string) => {
  const items = await db.select().from("market_items").where("market_type", "=", type); // Adjust table and column names as needed
  return items;
};
