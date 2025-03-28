import ShipStats from "./ShipStats";
import Link from "next/link";

export default function ShipCard({ ship }: { ship: any }) {
  return (
    <div className="p-6 rounded-lg glassmorphism sci-fi-border text-center">
      <h2 className="text-2xl font-bold">{ship.name}</h2>
      <p className="text-blue-300">{ship.ship_type}</p>

      <ShipStats ship={ship} />

      <Link href={`/dashboard/ships/${ship.id}`}>
        <button className="mt-4 px-6 py-2 rounded-full text-white font-bold tracking-wider neon-button transition-all hover:scale-105">
          View Details
        </button>
      </Link>
    </div>
  );
}