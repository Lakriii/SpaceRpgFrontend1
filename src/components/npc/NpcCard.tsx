import { Npc } from "@/types/Npc";
import InteractionIcon, { InteractionType } from "./InteractionIcon";
import { useState } from "react";
import NpcModal from "./NpcModal"; // Importuj nový modal

type Props = {
  npc: Npc;
  onClick: (npc: Npc) => void;
};

export default function NpcCard({ npc, onClick }: Props) {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentInteraction, setCurrentInteraction] = useState<InteractionType | null>(null);

  const handleInteraction = (type: InteractionType) => {
    setCurrentInteraction(type);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setCurrentInteraction(null);
  };
console.log(npc);
  return (
    <div
      className="glassmorphism p-4 rounded-xl hover:scale-105 transition-transform cursor-pointer"
      title={npc.tooltip}
      onClick={() => onClick(npc)}
    >
      <div className="flex items-center gap-4 mb-4">
        <div className="w-16 h-16 text-4xl flex items-center justify-center rounded-full border-2 border-blue-400 bg-gray-800">
          {npc.avatar}
        </div>
        <div>
          <h3 className="text-xl font-bold">{npc.name}</h3>
          <p className="text-sm text-gray-400">{npc.role}</p>
        </div>
      </div>

      <p className="text-gray-300 text-sm mb-2">📍 {npc.location}</p>

      <div className="flex gap-3 mt-2 text-2xl">
        {(npc.interactions ?? []).map((interaction) => (
          <InteractionIcon key={interaction} type={interaction as InteractionType} onInteract={handleInteraction} />
        ))}
      </div>

      {/* Nahradený InteractionModal za NpcModal */}
      {modalOpen && currentInteraction && (
        <NpcModal
          npcId={11}
          onClose={closeModal}
          initialTab={currentInteraction}
        />
      )}
    </div>
  );
}
