// src/components/ui/RarityLabel.tsx

import { getRarityGlow, getRarityLabel } from   "@/components/player/inventory/RarityStyles";

interface RarityLabelProps {
  rarity: string | null;
}

const RarityLabel = ({ rarity }: RarityLabelProps) => {
  return (
    <p className={`text-sm font-bold mt-2 px-4 py-1 rounded-full ${getRarityGlow(rarity)}`}>
      {getRarityLabel(rarity)}
    </p>
  );
};

export default RarityLabel;
