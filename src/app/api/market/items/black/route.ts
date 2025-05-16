import { NextResponse } from "next/server";
import { getMarketItemsByType } from "@lib/market/getMarketItems";

export async function GET() {
  try {
    const items = await getMarketItemsByType("black");
    return NextResponse.json(items);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch items" }, { status: 500 });
  }
}
