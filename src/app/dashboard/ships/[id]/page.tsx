"use client";

import { useParams } from "next/navigation";
import { mockShips } from "@/data/mockShips";
import ShipStats from "@/components/player/ships/ShipStats";
import BackButton from "@/components/ui/BackButton";
import ShipCrew from "@/components/player/ships/ShipCrew";
import ShipWeapons from "@/components/player/ships/ShipWeapons";
import ShipArmor from "@/components/player/ships/ShipArmor";
import ShipUpgrades from "@/components/player/ships/ShipUpgrades";
import Image from "next/image";

export default function ShipDetail() {
  const params = useParams();
  const shipId = Number(params.id);
  const ship = mockShips.find((s) => s.id === shipId);

  if (!ship) {
    return (
      <div className="text-center mt-20 text-2xl font-bold text-red-500">
        🚀 Ship Not Found
      </div>
    );
  }

  return (
    <div className="p-8 max-w-5xl mx-auto glassmorphism sci-fi-border text-center">
      <h1 className="text-3xl font-extrabold neon-glow">{ship.name}</h1>
      <p className="text-blue-300 text-lg">{ship.ship_type}</p>

      <div className="flex justify-center my-6">
        <Image 
          src={`/images/ships/${ship.image}`} 
          alt={ship.name} 
          width={400} 
          height={200} 
          className="rounded-lg shadow-lg"
          priority
          unoptimized
        />
      </div>

      <ShipStats ship={ship} />
      <ShipCrew crew={ship.crew} />
      <ShipWeapons weapons={ship.weapons} />
      <ShipArmor armor={ship.armor} />
      <ShipUpgrades upgrades={ship.upgrades} />
      <BackButton />
    </div>
  );
}