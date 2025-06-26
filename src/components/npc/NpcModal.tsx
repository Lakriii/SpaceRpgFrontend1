import React, { useState, useEffect } from "react";
import TradeWrapper from "./TradeWrapper";
import Combat from "./Combat";
import Conversation from "./Conversation";
import Reward from "./Reward";

type Props = {
  npcId: number;
  onClose: () => void;
  initialTab?: string;
};

type FetchedNpc = {
  npc: {
    id: number;
    name: string;
    avatar: string;
    role: string;
    location: string;
    bio: string;
  };
  interactions: string[];
  itemsForSale: {
    id: string;
    name: string;
    description: string;
    quantity: number;
    price: number;
    iron: number;
    credits: number;
    gold: number;
    rarity: string;
    contentType: string;
  }[];
};

const NpcModal: React.FC<Props> = ({ npcId, onClose, initialTab }) => {
  const [npcData, setNpcData] = useState<FetchedNpc | null>(null);
  const [activeTab, setActiveTab] = useState<string | null>(initialTab ?? null);
  const [rewardClaimed, setRewardClaimed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log("▶️ useEffect called with npcId:", npcId);

    if (typeof npcId !== "number" || isNaN(npcId)) {
      console.warn("❌ Invalid npcId:", npcId);
      setLoading(false); // fix: prevent infinite loading
      return;
    }

    const fetchNpc = async () => {
      setLoading(true);
      setError(null);

      try {
        console.log(`[API] Fetching NPC with ID: ${npcId}`);
        const res = await fetch(`/api/npc/${npcId}`);
        console.log("Response received", res);

        if (!res.ok) throw new Error(`Failed to load NPC: ${res.statusText}`);
        const data: FetchedNpc = await res.json();

        console.log("✅ NPC data fetched:", data);
        setNpcData(data);

        // Set default tab
        if (initialTab && !data.interactions.includes(initialTab)) {
          setActiveTab(data.interactions[0] ?? null);
        } else if (!activeTab) {
          setActiveTab(data.interactions[0] ?? null);
        }
      } catch (e: any) {
        console.error("❌ Fetch error:", e);
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNpc();
  }, [npcId, initialTab]);

  const claimReward = () => {
    setRewardClaimed(true);
    alert("You have claimed your reward!");
  };

  const handleTabChange = (tab: string) => setActiveTab(tab);
  const handleClose = () => {
    setActiveTab(null);
    onClose();
  };

  // 🌀 Loading overlay
  if (loading) {
    return (
      <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-60 z-50 text-white text-lg">
        <span className="animate-pulse">Loading NPC data...</span>
      </div>
    );
  }

  // ❌ Error overlay
  if (error) {
    return (
      <div className="fixed inset-0 flex flex-col justify-center items-center bg-black bg-opacity-60 z-50 text-red-500">
        <p>Error: {error}</p>
        <button
          onClick={handleClose}
          className="mt-4 px-4 py-2 bg-red-700 rounded"
        >
          Close
        </button>
      </div>
    );
  }

  // ⛔️ No data fallback
  if (!npcData) return null;

  const { npc, interactions, itemsForSale } = npcData;
  console.log("npcData:", npcData);
  console.log("npc:", npc, "interactions:", interactions, "itemsForSale:", itemsForSale);
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
      <div className="bg-[#1a1a3d] p-6 rounded-lg w-full max-w-3xl relative overflow-auto max-h-[90vh]">
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 text-gray-400 text-3xl hover:text-white hover:bg-red-600 w-10 h-10 flex items-center justify-center rounded-full border-2 border-transparent hover:border-red-600 transition-all"
          title="Close"
        >
          ✖
        </button>

        <div className="flex items-center gap-4 mb-4">
          <div className="text-5xl">{npc.avatar}</div>
          <div>
            <h2 className="text-2xl font-bold text-white">{npc.name}</h2>
            <p className="text-blue-400 text-sm">
              {npc.role} @ {npc.location}
            </p>
          </div>
        </div>

        <p className="text-gray-300 mb-4">{npc.bio}</p>

        {/* Tabs */}
        <div className="mb-4 flex space-x-4 border-b-2">
          {interactions.includes("🛒") && (
            <button
              onClick={() => handleTabChange("🛒")}
              className={`py-2 px-4 ${
                activeTab === "🛒"
                  ? "border-b-2 border-blue-500 text-white"
                  : "text-gray-400"
              }`}
            >
              🛒 Trade
            </button>
          )}
          {interactions.includes("⚔️") && (
            <button
              onClick={() => handleTabChange("⚔️")}
              className={`py-2 px-4 ${
                activeTab === "⚔️"
                  ? "border-b-2 border-blue-500 text-white"
                  : "text-gray-400"
              }`}
            >
              ⚔️ Combat
            </button>
          )}
          {interactions.includes("🧠") && (
            <button
              onClick={() => handleTabChange("🧠")}
              className={`py-2 px-4 ${
                activeTab === "🧠"
                  ? "border-b-2 border-blue-500 text-white"
                  : "text-gray-400"
              }`}
            >
              🧠 Conversation
            </button>
          )}
          {interactions.includes("🎁") && (
            <button
              onClick={() => handleTabChange("🎁")}
              className={`py-2 px-4 ${
                activeTab === "🎁"
                  ? "border-b-2 border-blue-500 text-white"
                  : "text-gray-400"
              }`}
            >
              🎁 Reward
            </button>
          )}
        </div>

        {/* Tab Content */}
        <div className="space-y-4">
          {activeTab === "🛒" && <TradeWrapper itemsForSale={itemsForSale} />}
          {activeTab === "⚔️" && <Combat npcName={npc.name} />}
          {activeTab === "🧠" && <Conversation npcName={npc.name} />}
          {activeTab === "🎁" && !rewardClaimed && (
            <Reward reward="200 Gold" onClaimReward={claimReward} />
          )}
          {activeTab === "🎁" && rewardClaimed && (
            <div className="text-green-500">You have already claimed your reward!</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NpcModal;
