"use client";

import { useState } from "react";
import { InventoryItem } from "@/types/inventoryTypes";
import { mockInventory, mockItems } from "@/data/mockInventory";
import InventoryCard from "./InventoryCard";

export default function InventoryList() {
  const [inventory, setInventory] = useState<InventoryItem[]>(mockInventory);

  return inventory.length === 0 ? (
    <p className="text-center text-gray-400 mt-4">Your inventory is empty.</p>
  ) : (
    <div className="grid grid-cols-2 gap-6">
      {inventory.map((item) => {
        const itemData = mockItems[item.object_id ?? 0];
        if (!itemData) return null;

        return <InventoryCard key={item.object_id} item={item} itemData={itemData} />;
      })}
    </div>
  );
}