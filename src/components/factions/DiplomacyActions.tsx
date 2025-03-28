"use client";

import { useState } from "react";

export default function DiplomacyActions({ faction }: { faction: any }) {
  const [status, setStatus] = useState("");

  const handleDiplomaticAction = (action: string) => {
    setStatus(`Diplomatic action: ${action} with ${faction.name} is in progress.`);
    setTimeout(() => setStatus(""), 3000);
  };

  return (
    <div className="mt-6 p-4 glassmorphism rounded-lg text-center">
      <h3 className="text-lg font-semibold neon-glow">🔹 Diplomacy Options</h3>

      <div className="mt-4 flex justify-center gap-4">
        <button
          className="px-4 py-2 rounded-full bg-green-500 hover:bg-green-600 font-bold tracking-wide transition-all"
          onClick={() => handleDiplomaticAction("Alliance Proposal")}
        >
          🤝 Offer Alliance
        </button>
        <button
          className="px-4 py-2 rounded-full bg-blue-500 hover:bg-blue-600 font-bold tracking-wide transition-all"
          onClick={() => handleDiplomaticAction("Trade Negotiation")}
        >
          💰 Trade Talks
        </button>
        <button
          className="px-4 py-2 rounded-full bg-red-500 hover:bg-red-600 font-bold tracking-wide transition-all"
          onClick={() => handleDiplomaticAction("Declare War")}
        >
          ⚔️ Declare War
        </button>
      </div>

      {status && <p className="text-yellow-300 mt-3">{status}</p>}
    </div>
  );
}