import { NextResponse } from "next/server";
import buyItem from "@lib/market/buyItem";

export async function POST(request: Request) {
  try {
    const { playerId, itemId, price } = await request.json();

    if (!playerId || !itemId || !price) {
      return NextResponse.json(
        { success: false, message: "Missing playerId, itemId, or price" },
        { status: 400 }
      );
    }

    // price by mal byť objekt, napr. { "Iron Ore": 500, "Copper Ore": 10 }
    // buyItem by mala byť funkcia, ktorá spracuje platbu zdrojmi podľa price

    const result = await buyItem(playerId, itemId, price);

    // result by mal obsahovať success: boolean a prípadne aktualizované dáta

    if (!result.success) {
      return NextResponse.json({ success: false, message: result.message || "Purchase failed" }, { status: 400 });
    }

    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Purchase failed" },
      { status: 400 }
    );
  }
}
