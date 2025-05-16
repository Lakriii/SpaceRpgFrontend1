import { NextResponse } from "next/server";
import buyItem from "@lib/market/buyItem";

export async function POST(request: Request) {
  try {
    const { playerId, itemId, price } = await request.json();

    const result = await buyItem(playerId, itemId, price);

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message || "Purchase failed" },
      { status: 400 }
    );
  }
}
