import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import Modal from "./Modal";  // cesta podľa tvojho projektu
type ItemForSale = {
  id: number;
  name: string;
  description: string;
  iron: number;
  credits: number;
  gold: number;
  rarity: string;
  contentType: string;
  quantity: number;
  price: number;
};

type InventoryItem = ItemForSale & {
  quantity: number;
};

type PlayerResources = Record<string, number>;

type TradeProps = {
  playerResources: PlayerResources;
  setPlayerResources: (res: PlayerResources) => void;
  playerInventory: InventoryItem[];
  setPlayerInventory: (inventory: InventoryItem[]) => void;
  itemsForSale: ItemForSale[];
};

const Trade: React.FC<TradeProps> = ({
  playerResources = {},
  setPlayerResources,
  playerInventory = [],
  setPlayerInventory,
  itemsForSale = [],
}) => {
  const { user } = useAuth();
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
  const [sellQuantity, setSellQuantity] = useState<number>(1);

const [modalOpen, setModalOpen] = useState(false);
const [modalTitle, setModalTitle] = useState<string | undefined>();
const [modalMessage, setModalMessage] = useState("");

const showModal = (message: string, title?: string) => {
  setModalTitle(title);
  setModalMessage(message);
  setModalOpen(true);
};


  const handleSellItem = async () => {
    if (!selectedItem || !user?.id) return;

    if (sellQuantity < 1) {
      showModal("Quantity must be at least 1", "Invalid Quantity");
      return;
    }

    if (sellQuantity > selectedItem.quantity) {
      showModal(`You don't have that many ${selectedItem.name} to sell`, "Insufficient Items");
      return;
    }

    try {
      const res = await fetch("/api/market/sell", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          playerId: user.id,
          itemId: selectedItem.id,
          quantity: sellQuantity,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        showModal(data.message || "Sale failed.", "Error");
        return;
      }

   const transformedResources: PlayerResources = {};
data.updatedResources.forEach((res: { mining_node_id: number; quantity: number }) => {
  if (res.mining_node_id === 1) transformedResources.iron = res.quantity;
  else if (res.mining_node_id === 4) transformedResources.gold = res.quantity;
  else transformedResources[`node_${res.mining_node_id}`] = res.quantity;
});


      setPlayerResources(transformedResources);
      setPlayerInventory(data.updatedInventory);

      showModal(data.message || `You sold ${sellQuantity} x ${selectedItem.name}!`, "Success");
      setSelectedItem(null);
      setSellQuantity(1);
    } catch (error) {
      console.error("Sell error:", error);
      showModal("An error occurred while selling the item.", "Error");
    }
  };

  const handleBuyItem = async (item: ItemForSale) => {
  if (!user?.id) {
    showModal("User not logged in", "Error");
    return;
  }

  try {
    const res = await fetch("/api/market/buy", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ itemId: item.id, playerId: user.id }),
    });

    const data = await res.json();

    if (!res.ok || !data.success) {
      showModal(data.message || "Purchase failed.", "Error");
      return;
    }

    if (Array.isArray(data.updatedResources)) {
      const transformedResources: PlayerResources = {};
      data.updatedResources.forEach((res: { mining_node_id: number; quantity: number }) => {
        if (res.mining_node_id === 1) transformedResources.iron = res.quantity;
        else if (res.mining_node_id === 4) transformedResources.gold = res.quantity;
        else transformedResources[`node_${res.mining_node_id}`] = res.quantity;
      });
      setPlayerResources(transformedResources);
    } else {
      console.warn("No updatedResources found in response");
    }

    // Tu je manuálna aktualizácia inventára:
    setPlayerInventory((prevInventory) => {
      // Skontroluj, či už položka existuje v inventári
      const existingItem = prevInventory.find((invItem) => invItem.id === item.id);

      if (existingItem) {
        // Ak áno, zvýš jej quantity (napr. o 1)
        return prevInventory.map((invItem) =>
          invItem.id === item.id
            ? { ...invItem, quantity: invItem.quantity + 1 }
            : invItem
        );
      } else {
        // Ak nie, pridaj novú položku s quantity 1
        return [...prevInventory, { ...item, quantity: 1 }];
      }
    });

    showModal(data.message || `You successfully bought ${item.name}!`, "Success");
  } catch (error) {
    console.error("Buy error:", error);
    showModal("An error occurred while buying the item.", "Error");
  }
};



  return (
    <div className="text-white">
      <h3 className="text-lg font-semibold text-purple-400 mb-2">Trade with NPC</h3>

      {/* Player resources */}
      <div className="mb-4">
        <h4 className="font-bold text-blue-400 mb-2">Your Resources:</h4>
        {Object.entries(playerResources).length > 0 ? (
          <ul>
            {Object.entries(playerResources).map(([resource, amount]) => (
              <li key={resource}>
                {resource}: <span className="text-yellow-400">{amount}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-400 italic">No resources available.</p>
        )}
      </div>

      {/* Items for Sale */}
      <div className="mb-4">
        <h4 className="font-bold text-blue-400 mb-2">Items for Sale:</h4>
        <ul>
          {itemsForSale.map((item) => (
            <li key={item.id} className="mb-2">
              <div className="flex justify-between items-center bg-gray-700 p-2 rounded-lg">
                <div>
                  <span className="text-white">{item.name}</span>
                  <p className="text-sm text-gray-400">{item.description}</p>
                  <p className="text-yellow-500">
                    {["iron", "credits", "gold"].map((currency) => {
                      const amount = (item as any)[currency];
                      return amount > 0 ? (
                        <span key={currency} className="mr-2">
                          {amount} {currency}
                        </span>
                      ) : null;
                    })}
                  </p>
                </div>
                <button
                  onClick={() => handleBuyItem(item)}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded-lg mt-2"
                >
                  Buy
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Inventory */}
      <div className="mb-4">
        <h4 className="font-bold text-blue-400 mb-2">Your Inventory:</h4>
        <ul>
          {playerInventory.map((item) => (
            <li key={item.id} className="mb-2">
              <div className="flex justify-between items-center bg-gray-700 p-2 rounded-lg">
                <div>
                  <span className="text-white">{item.name}</span>
                  <span className="ml-2 text-yellow-400">x{item.quantity}</span>
                </div>
                <button
                  onClick={() => {
                    setSelectedItem(item);
                    setSellQuantity(1);
                  }}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded-lg mt-2"
                >
                  Sell
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Sell Form */}
      {selectedItem && (
        <div className="mb-4">
          <h5 className="text-yellow-300">Selected Item: {selectedItem.name}</h5>
          <p className="text-sm text-gray-400">
            Price per unit: {selectedItem.price} {selectedItem.contentType}
          </p>
          <label className="block mt-2 mb-1" htmlFor="sellQuantity">
            Quantity to sell (max {selectedItem.quantity}):
          </label>
          <input
            id="sellQuantity"
            type="number"
            min={1}
            max={selectedItem.quantity}
            value={sellQuantity}
            onChange={(e) =>
              setSellQuantity(
                Math.min(
                  Math.max(1, Number(e.target.value)),
                  selectedItem.quantity
                )
              )
            }
            className="w-20 p-1 rounded text-black"
          />
        </div>
      )}

      <button
        onClick={handleSellItem}
        disabled={!selectedItem}
        className={`w-full p-2 ${
          !selectedItem
            ? "bg-gray-500 cursor-not-allowed"
            : "bg-red-600 hover:bg-red-700"
        } rounded-lg`}
      >
        Sell Item
      </button>
      {/* Modal */}
      <Modal
  isOpen={modalOpen}
  onClose={() => setModalOpen(false)}
  title={modalTitle}
  message={modalMessage}
/>

    </div>
  );
};

export default Trade;
