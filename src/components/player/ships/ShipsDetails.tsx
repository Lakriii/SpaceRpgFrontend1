"use client"; 

import { mockShips } from "@/data/mockShips";
import ShipStats from "@/components/player/ships/ShipStats";
import { useRouter } from "next/navigation"; 

export default function ShipDetail({ params }: { params: { id: string } }) {
  const router = useRouter(); 

  const ship = mockShips.find((s) => s.id === Number(params.id)); 

  if (!ship) {
    return (
      <div className="text-center mt-20 text-2xl font-bold text-red-500">
        🚀 Ship Not Found
      </div>
    );
  }

  return (
    <div className="p-8 max-w-3xl mx-auto glassmorphism sci-fi-border text-center">
      <h1 className="text-3xl font-extrabold neon-glow">{ship.name}</h1>
      <p className="text-blue-300 text-lg">{ship.ship_type}</p>

      <ShipStats ship={ship} />

      <button
        className="mt-6 px-6 py-2 rounded-full text-white font-bold tracking-wider neon-button transition-all hover:scale-105"
        onClick={() => router.back()}
      >
        ← Back to Fleet
      </button>
    </div>
  );
}