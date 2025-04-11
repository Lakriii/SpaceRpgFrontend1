import { Npc } from "@/data/npcs";
import InteractionIcon, { InteractionType } from "./InteractionIcon";
import { useState } from "react";
import InteractionModal from "./InteractionModal"; // importujeme modal

type Props = {
  npc: Npc;
  onClick: (npc: Npc) => void;
};

export default function NpcCard({ npc, onClick }: Props) {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentInteraction, setCurrentInteraction] = useState<InteractionType | null>(null);

  const handleInteraction = (type: InteractionType) => {
    setCurrentInteraction(type); // Uložíme typ interakcie
    setModalOpen(true); // Otvoríme modal
  };

  const closeModal = () => {
    setModalOpen(false); // Zavrieme modal
    setCurrentInteraction(null); // Resetujeme interakciu
  };

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
        {npc.interactions.map((interaction) => (
          <InteractionIcon key={interaction} type={interaction} onInteract={handleInteraction} />
        ))}
      </div>

      {/* Modal */}
      <InteractionModal
        type={currentInteraction || "🧠"} // prednastavený typ, ak je null
        isOpen={modalOpen}
        onClose={closeModal}
      />
    </div>
  );
}
