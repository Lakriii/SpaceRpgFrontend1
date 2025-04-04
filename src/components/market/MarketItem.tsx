import { MarketItemProps } from "@/types/marketTypes"; // Predpokladáme, že máme tieto typy
import RarityLabel from "@/components/ui/RarityLabel"; // Import nového komponentu RarityLabel

const MarketItem = ({ name, description, price, rarity }: MarketItemProps) => {
  return (
    <div className="glassmorphism p-6 rounded-lg flex justify-between items-center">
      <div>
        <h3 className="text-lg font-semibold text-green-400">{name}</h3>
        <p className="text-gray-300">{description}</p>
        <p className="text-yellow-300 text-lg font-bold">💰 {price} Credits</p>

        {/* Použitie nového RarityLabel komponentu */}
        <RarityLabel rarity={rarity} />
      </div>

      <button className="px-6 py-3 rounded-full neon-button transition-all hover:scale-105">
        Buy
      </button>
    </div>
  );
};

export default MarketItem;
