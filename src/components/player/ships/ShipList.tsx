"use client";

import { useState } from "react";
import { mockShips } from "@/data/mockShips";
import ShipCard from "./ShipCard";

export default function ShipList() {
  const [ships, setShips] = useState(mockShips);

  return (
    <div className="grid grid-cols-2 gap-6">
      {ships.map((ship) => (
        <ShipCard key={ship.name} ship={ship} />
      ))}
    </div>
  );
}