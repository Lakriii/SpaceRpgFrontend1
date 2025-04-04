import { InventoryItem } from "@/types/inventoryTypes";
import { getRarityStyle } from "./RarityStyles";
import handleEquipToggle from "./handleEquipToggle";
import CustomButton2 from "./CustomButton2"; // Import CustomButton2 komponenty
import RarityLabel from "@/components/ui/RarityLabel"; // Import nového komponentu RarityLabel

export default function InventoryCard({ item, itemData }: { item: InventoryItem; itemData: any }) {
  return (
    <div
      className={`p-6 rounded-lg flex flex-col items-center text-center sci-fi-border transition-all duration-300
                  ${item.is_equipped ? "border-2 border-green-400" : "border border-gray-600"}
                  ${getRarityStyle(itemData.rarity)}`}
    >
      <h3 className="text-xl font-semibold">{itemData.name}</h3>
      <p className="text-sm text-gray-400">{itemData.description}</p>

      {/* Použitie nového RarityLabel komponentu */}
      <RarityLabel rarity={itemData.rarity} />

      <div className="relative flex items-center justify-center mt-4">
        <p className="credit-holo-text">💰 {itemData.value ?? 0}</p>
      </div>

      {/* Použitie CustomButton2 komponenty */}
      <CustomButton2
        isEquipped={item.is_equipped}
        onToggle={() => handleEquipToggle(item.object_id)} // Voláme funkciu na toggle vybavenia
      />
    </div>
  );
}
