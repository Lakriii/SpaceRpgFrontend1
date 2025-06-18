import React, { useState } from "react";
import { Npc } from "@/data/npcs";
import TradeWrapper from "./TradeWrapper";
import Combat from "./Combat";
import Conversation from "./Conversation";
import Reward from "./Reward";

type Props = {
  npc: Npc;
  onClose: () => void;
};

const NpcModal: React.FC<Props> = ({ npc, onClose }) => {
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [rewardClaimed, setRewardClaimed] = useState<boolean>(false);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const handleClose = () => {
    setActiveTab(null);
    onClose();
  };

  const claimReward = () => {
    setRewardClaimed(true);
    alert("You have claimed your reward!");
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
      <div className="bg-[#1a1a3d] p-6 rounded-lg w-full h-full max-w-none relative overflow-auto">

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
            <p className="text-blue-400 text-sm">{npc.role} @ {npc.location}</p>
          </div>
        </div>

        <p className="text-gray-300 mb-4">{npc.bio}</p>

        {/* Interaction Tabs */}
        <div className="mb-4 flex space-x-4 border-b-2">
          {npc.interactions?.includes("🛒") && (
            <button
              onClick={() => handleTabChange("trade")}
              className={`py-2 px-4 ${activeTab === "trade" ? "border-b-2 border-blue-500 text-white" : "text-gray-400"}`}
            >
              🛒 Trade
            </button>
          )}
          {npc.interactions?.includes("⚔️") && (
            <button
              onClick={() => handleTabChange("combat")}
              className={`py-2 px-4 ${activeTab === "combat" ? "border-b-2 border-blue-500 text-white" : "text-gray-400"}`}
            >
              ⚔️ Combat
            </button>
          )}
          {npc.interactions?.includes("🧠") && (
            <button
              onClick={() => handleTabChange("conversation")}
              className={`py-2 px-4 ${activeTab === "conversation" ? "border-b-2 border-blue-500 text-white" : "text-gray-400"}`}
            >
              🧠 Conversation
            </button>
          )}
          {npc.interactions?.includes("🎁") && (
            <button
              onClick={() => handleTabChange("reward")}
              className={`py-2 px-4 ${activeTab === "reward" ? "border-b-2 border-blue-500 text-white" : "text-gray-400"}`}
            >
              🎁 Reward
            </button>
          )}
        </div>

        {/* Interaction Content */}
        <div className="space-y-4">
          {activeTab === "trade" && npc.interactions?.includes("🛒") && (
            <TradeWrapper
              itemsForSale={npc.tradeItems || [
                { id: "1", name: "Sword", price: 500, description: "A sharp sword" },
                { id: "2", name: "Potion", price: 100, description: "Restores health" }
              ]}
            />
          )}

          {activeTab === "combat" && npc.interactions?.includes("⚔️") && (
            <Combat npcName={npc.name} />
          )}

          {activeTab === "conversation" && npc.interactions?.includes("🧠") && (
            <Conversation npcName={npc.name} />
          )}

          {activeTab === "reward" && npc.interactions?.includes("🎁") && !rewardClaimed && (
            <Reward reward="200 Gold" onClaimReward={claimReward} />
          )}

          {activeTab === "reward" && rewardClaimed && (
            <div className="text-green-500">You have already claimed your reward!</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NpcModal;
