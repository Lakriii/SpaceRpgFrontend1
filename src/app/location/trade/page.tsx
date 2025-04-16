'use client';

import React, { useState } from "react";

type PlayerOffer = {
  id: string;
  playerName: string;
  gold: number;
  inventorySpace: number;
  health: number;
  offerItem: string;
  offerDescription: string;
  wants: string;
};

const initialOffers: PlayerOffer[] = [
  {
    id: "1",
    playerName: "ShadowSlayer",
    gold: 300,
    inventorySpace: 2,
    health: 80,
    offerItem: "Enchanted Dagger",
    offerDescription: "Fast, poisoned, +5 stealth",
    wants: "150 gold",
  },
  {
    id: "2",
    playerName: "Elara the Mage",
    gold: 1200,
    inventorySpace: 1,
    health: 100,
    offerItem: "Mana Potion x3",
    offerDescription: "Restores 50 MP each",
    wants: "Crafting assistance",
  },
];

const TradeHub: React.FC = () => {
  const [offers] = useState<PlayerOffer[]>(initialOffers);
  const [log, setLog] = useState<string[]>([]);
  const [activeTrade, setActiveTrade] = useState<PlayerOffer | null>(null);
  const [myGoldOffer, setMyGoldOffer] = useState<number>(0);
  const [confirmed, setConfirmed] = useState(false);

  const openTrade = (offer: PlayerOffer) => {
    setActiveTrade(offer);
    setMyGoldOffer(0);
    setConfirmed(false);
  };

  const confirmTrade = () => {
    if (!activeTrade) return;
    setLog((prev) => [
      ...prev,
      `You traded ${myGoldOffer} gold for ${activeTrade.offerItem} from ${activeTrade.playerName}.`,
    ]);
    setActiveTrade(null);
    setMyGoldOffer(0);
    setConfirmed(true);
  };

  const cancelTrade = () => {
    setActiveTrade(null);
    setMyGoldOffer(0);
  };

  return (
    <div className="bg-[#1e1e3f] text-white p-6 rounded-lg shadow-md max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-blue-300 mb-4">🛒 Trade Hub</h2>

      <div className="space-y-4">
        {offers.map((offer) => (
          <div
            key={offer.id}
            className="bg-[#2a2a4d] p-4 rounded-lg flex justify-between items-center hover:bg-[#33335a] transition"
          >
            <div>
              <p className="font-bold text-lg text-yellow-300">{offer.playerName}</p>
              <p className="text-sm">💰 {offer.gold}g | ❤️ {offer.health} HP | 📦 {offer.inventorySpace} slots</p>
              <p className="mt-1"><span className="font-semibold">{offer.offerItem}:</span> {offer.offerDescription}</p>
              <p className="mt-1 text-blue-400">Wants: {offer.wants}</p>
            </div>
            <button
              onClick={() => openTrade(offer)}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
            >
              Trade
            </button>
          </div>
        ))}
      </div>

      {/* Trade Modal */}
      {activeTrade && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-[#282850] p-6 rounded-lg shadow-lg w-full max-w-md relative text-white">
            <button
              onClick={cancelTrade}
              className="absolute top-2 right-2 text-red-400 hover:bg-red-700 hover:text-white rounded px-2 py-1"
            >
              x
            </button>

            <h3 className="text-xl font-semibold mb-3">Trade with {activeTrade.playerName}</h3>
            <p className="mb-2">🎁 They offer: <span className="text-green-400">{activeTrade.offerItem}</span></p>
            <p className="mb-2">💬 They want: <span className="text-blue-400">{activeTrade.wants}</span></p>

            <div className="mt-4">
              <p className="mb-1">💰 Your offer:</p>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setMyGoldOffer((prev) => Math.max(0, prev - 50))}
                  className="bg-gray-500 px-2 py-1 rounded hover:bg-gray-600"
                >
                  -
                </button>
                <span className="text-lg">{myGoldOffer} gold</span>
                <button
                  onClick={() => setMyGoldOffer((prev) => prev + 50)}
                  className="bg-gray-500 px-2 py-1 rounded hover:bg-gray-600"
                >
                  +
                </button>
              </div>

              <button
                onClick={confirmTrade}
                className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Log výpis */}
      {log.length > 0 && (
        <div className="mt-6 p-4 bg-[#151532] rounded-lg">
          <h3 className="text-lg font-semibold text-purple-300 mb-2">📜 Trade Log</h3>
          <ul className="list-disc pl-5 space-y-1 text-sm text-gray-300">
            {log.map((entry, index) => (
              <li key={index}>{entry}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TradeHub;
