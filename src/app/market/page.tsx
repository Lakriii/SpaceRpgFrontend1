"use client";

import MarketCard from "@/components/market/MarketCard";
import ProtectedPage from "@/components/auth/ProtectedPage";


const markets = [
  {
    href: "/market/local",
    icon: "🏙",
    title: "Local Market",
    description: "Trade goods at your current location.",
    textColor: "text-blue-400",
  },
  {
    href: "/market/galactic",
    icon: "🌌",
    title: "Galactic Market",
    description: "Buy & sell goods across the universe.",
    textColor: "text-green-400",
  },
  {
    href: "/market/black",
    icon: "🚨",
    title: "Black Market",
    description: "Trade illegal items and rare artifacts.",
    textColor: "text-red-400",
  },
];

export default function MarketPage() {
  return (
    <ProtectedPage>
    <div className="p-8 max-w-5xl mx-auto text-white">
      <h1 className="text-4xl font-extrabold neon-glow text-center">🛒 Intergalactic Market</h1>
      <p className="text-gray-400 text-center mt-2">
        Trade goods, equipment, and rare resources across the galaxy.
      </p>

      <div className="mt-6 grid grid-cols-3 gap-6">
        {markets.map((market) => (
          <MarketCard key={market.href} {...market} />
        ))}
      </div>
    </div>
    </ProtectedPage>
  );
}
