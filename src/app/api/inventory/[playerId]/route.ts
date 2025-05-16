import { NextResponse } from "next/server";

interface InventoryItem {
  object_id: number;
  name: string;
  description: string;
  quantity: number;
}

const mockInventories: Record<string, InventoryItem[]> = {
  "1": [
    { object_id: 101, name: "Laser Sword", description: "A powerful melee weapon", quantity: 1 },
    { object_id: 102, name: "Plasma Shield", description: "Protects against plasma attacks", quantity: 1 },
  ],
  "2": [
    { object_id: 103, name: "Nano Medkit", description: "Heals quickly", quantity: 3 },
  ],
};

export async function GET(
  request: Request,
  { params }: { params: { playerId: string } }
) {
  const playerId = params.playerId;

  if (!playerId || typeof playerId !== "string") {
    return NextResponse.json({ error: "Invalid playerId" }, { status: 400 });
  }

  const inventory = mockInventories[playerId] || [];

  return NextResponse.json(inventory);
}
