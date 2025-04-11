import React from "react";
import { InteractionType } from "./InteractionIcon";

// Typ pre každý možný typ interakcie.
type ModalProps = {
  type: InteractionType;
  isOpen: boolean;
  onClose: () => void;
};

const InteractionModal: React.FC<ModalProps> = ({ type, isOpen, onClose }) => {
  if (!isOpen) return null;

  const renderContent = () => {
    switch (type) {
      case "🛒":
        return (
          <>
            <h2 className="text-2xl font-bold">Obchod</h2>
            <p className="text-gray-300">Zobrazujem tvoje zásoby a obchodnú ponuku...</p>
            <button className="bg-blue-500 text-white p-2 rounded mt-4">Pokračovať v obchode</button>
          </>
        );
      case "🧠":
        return (
          <>
            <h2 className="text-2xl font-bold">Rozhovor / Lore / Quest</h2>
            <p className="text-gray-300">Začína sa rozhovor s NPC...</p>
            <button className="bg-green-500 text-white p-2 rounded mt-4">Začať rozhovor</button>
          </>
        );
      case "⚔️":
        return (
          <>
            <h2 className="text-2xl font-bold">Bojová výzva</h2>
            <p className="text-gray-300">Vyzývam ťa na súboj!</p>
            <button className="bg-red-500 text-white p-2 rounded mt-4">Začať boj</button>
          </>
        );
      case "🔁":
        return (
          <>
            <h2 className="text-2xl font-bold">Opakovateľná úloha</h2>
            <p className="text-gray-300">Zobrazujem úlohu, ktorú môžeš opakovať.</p>
            <button className="bg-yellow-500 text-white p-2 rounded mt-4">Začať úlohu</button>
          </>
        );
      case "🎁":
        return (
          <>
            <h2 className="text-2xl font-bold">Odmena</h2>
            <p className="text-gray-300">Získavaš svoju odmenu!</p>
            <button className="bg-purple-500 text-white p-2 rounded mt-4">Vyzdvihnúť odmenu</button>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-gray-900 p-6 rounded-lg shadow-lg w-96">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl text-white">Interakcia</h1>
          <button onClick={onClose} className="text-white">X</button>
        </div>
        <div className="mt-4">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default InteractionModal;
