// app/api/market/items/route.ts
import { NextResponse } from "next/server";
import { getMarketItemsByType } from "@lib/market/getMarketItems";


export async function GET() {
  try {
    const items = await getMarketItemsByType("local");
    if (!items) {
      console.error("No items returned from database");
      return NextResponse.json({ error: "No items found" }, { status: 404 });
    }
    return NextResponse.json(items);
  } catch (error) {
    console.error("Failed to fetch market items:", error);
    return NextResponse.json({ error: "Failed to fetch items" }, { status: 500 });
  }
}
