import { InventoryItem } from "@/types/inventoryTypes";
import { getRarityStyle, getRarityLabel, getRarityGlow } from "./RarityStyles";
import handleEquipToggle from "./handleEquipToggle";

export default function InventoryCard({ item, itemData }: { item: InventoryItem; itemData: any }) {
  return (
    <div
      className={`p-6 rounded-lg flex flex-col items-center text-center sci-fi-border transition-all duration-300
                  ${item.is_equipped ? "border-2 border-green-400" : "border border-gray-600"}
                  ${getRarityStyle(itemData.rarity)}`}
    >
      <h3 className="text-xl font-semibold">{itemData.name}</h3>
      <p className="text-sm text-gray-400">{itemData.description}</p>

      {/* 🔷 Rarity Label with Neon Glow */}
      <p className={`text-sm font-bold mt-2 px-4 py-1 rounded-full ${getRarityGlow(itemData.rarity)}`}>
        {getRarityLabel(itemData.rarity)}
      </p>

      <div className="relative flex items-center justify-center mt-4">
  <p className="credit-holo-text">
    💰 {itemData.value ?? 0}
  </p>
</div>

      {/* 🚀 Sci-Fi Equip/Unequip Button */}
      <button
        className={`mt-4 px-6 py-2 rounded-full text-white font-bold tracking-wider
                    transition-all duration-300 neon-button ${
                      item.is_equipped ? "unequip-btn" : "equip-btn"
                    }`}
        onClick={() => handleEquipToggle(item.object_id)}
      >
        {item.is_equipped ? "UNEQUIP" : "EQUIP"}
      </button>
    </div>
  );
}