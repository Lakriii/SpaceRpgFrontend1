import React from "react";

export type InteractionType = "🛒" | "🧠" | "⚔️" | "🔁" | "🎁";

type Props = {
  type: InteractionType;
  onInteract?: (type: InteractionType) => void;
};

const interactionLabels: Record<InteractionType, string> = {
  "🛒": "Obchod",
  "🧠": "Rozhovor / Lore / Quest",
  "⚔️": "Bojová výzva",
  "🔁": "Opakovateľná úloha",
  "🎁": "Odmena na vyzdvihnutie",
};

const InteractionIcon: React.FC<Props> = ({ type, onInteract }) => {
  const label = interactionLabels[type];

  return (
    <button
      className="text-2xl mx-1 transition-transform hover:scale-125"
      title={label}
      onClick={() => onInteract?.(type)}
    >
      {type}
    </button>
  );
};

export default InteractionIcon;
