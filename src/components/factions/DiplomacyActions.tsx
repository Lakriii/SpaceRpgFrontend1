import { useState } from "react";
import DiplomacyButton from "./DiplomacyButton"; // uprav cestu podľa projektu

export default function DiplomacyActions({ faction }: { faction: any }) {
  const [status, setStatus] = useState("");

  const handleDiplomaticAction = (action: string) => {
    setStatus(`Diplomatic action: ${action} with ${faction.name} is in progress.`);
    setTimeout(() => setStatus(""), 3000);
  };

  return (
    <div className="mt-6 p-4 glassmorphism rounded-lg text-center">
      <h3 className="text-lg font-semibold neon-glow">🔹 Diplomacy Options</h3>

      <div className="mt-4 flex flex-wrap justify-center gap-4">
        <DiplomacyButton
          label="Offer Alliance"
          color="green"
          icon="🤝"
          onClick={() => handleDiplomaticAction("Alliance Proposal")}
        />
        <DiplomacyButton
          label="Trade Talks"
          color="blue"
          icon="💰"
          onClick={() => handleDiplomaticAction("Trade Negotiation")}
        />
        <DiplomacyButton
          label="Declare War"
          color="red"
          icon="⚔️"
          onClick={() => handleDiplomaticAction("Declare War")}
        />
      </div>

      {status && <p className="text-yellow-300 mt-3">{status}</p>}
    </div>
  );
}
