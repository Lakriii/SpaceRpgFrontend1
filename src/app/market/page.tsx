"use client";

import Link from "next/link";

export default function MarketPage() {
  return (
    <div className="p-8 max-w-5xl mx-auto text-white">
      <h1 className="text-4xl font-extrabold neon-glow text-center">🛒 Intergalactic Market</h1>
      <p className="text-gray-400 text-center mt-2">
        Trade goods, equipment, and rare resources across the galaxy.
      </p>

      <div className="mt-6 grid grid-cols-3 gap-6">
        {/* Lokálny trh */}
        <Link href="/market/local">
          <div className="glassmorphism p-6 rounded-lg hover:scale-105 transition-all text-center cursor-pointer">
            <h3 className="text-xl font-semibold text-blue-400">🏙 Local Market</h3>
            <p className="text-gray-300">Trade goods at your current location.</p>
          </div>
        </Link>

        {/* Galaktický trh */}
        <Link href="/market/galactic">
          <div className="glassmorphism p-6 rounded-lg hover:scale-105 transition-all text-center cursor-pointer">
            <h3 className="text-xl font-semibold text-green-400">🌌 Galactic Market</h3>
            <p className="text-gray-300">Buy & sell goods across the universe.</p>
          </div>
        </Link>

        {/* Čierny trh */}
        <Link href="/market/black">
          <div className="glassmorphism p-6 rounded-lg hover:scale-105 transition-all text-center cursor-pointer">
            <h3 className="text-xl font-semibold text-red-400">🚨 Black Market</h3>
            <p className="text-gray-300">Trade illegal items and rare artifacts.</p>
          </div>
        </Link>
      </div>
    </div>
  );
}