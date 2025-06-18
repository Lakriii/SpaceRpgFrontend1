import React, { useState } from "react";

type Item = {
  id: string;
  name: string;
  price: number;
  description: string;
  costType: string;
};

type InventoryItem = Item & {
  quantity: number;
};

type PlayerResources = Record<string, number>;

type TradeProps = {
  playerResources: PlayerResources;
  setPlayerResources: (res: PlayerResources) => void;
  playerInventory: InventoryItem[];
  setPlayerInventory: (inventory: InventoryItem[]) => void;
  itemsForSale: Item[];
};

const Trade: React.FC<TradeProps> = ({
  playerResources,
  setPlayerResources,
  playerInventory,
  setPlayerInventory,
  itemsForSale,
}) => {
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
  const [sellQuantity, setSellQuantity] = useState<number>(1);

  const handleSellItem = () => {
    if (!selectedItem) return;
    if (sellQuantity < 1) {
      alert("Quantity must be at least 1");
      return;
    }
    if (sellQuantity > selectedItem.quantity) {
      alert(`You don't have that many ${selectedItem.name} to sell`);
      return;
    }

    const resourceType =
      selectedItem.costType && selectedItem.costType.trim() !== ""
        ? selectedItem.costType
        : "Iron Ore";

    // Aktualizujeme zdroje podľa počtu predaných kusov
    const updatedResources = { ...playerResources };
    updatedResources[resourceType] =
      (updatedResources[resourceType] || 0) + selectedItem.price * sellQuantity;
    setPlayerResources(updatedResources);

    // Aktualizujeme inventár - znížime quantity alebo odstránime položku
    let updatedInventory;
    if (selectedItem.quantity === sellQuantity) {
      updatedInventory = playerInventory.filter(
        (item) => item.id !== selectedItem.id
      );
    } else {
      updatedInventory = playerInventory.map((item) =>
        item.id === selectedItem.id
          ? { ...item, quantity: item.quantity - sellQuantity }
          : item
      );
    }
    setPlayerInventory(updatedInventory);

    alert(
      `You sold ${sellQuantity} x ${selectedItem.name} for ${
        selectedItem.price * sellQuantity
      } ${resourceType}!`
    );
    setSelectedItem(null);
    setSellQuantity(1);
  };

  const handleBuyItem = (item: Item) => {
    const resourceType =
      item.costType && item.costType.trim() !== "" ? item.costType : "Iron Ore";
    const availableAmount = playerResources?.[resourceType] ?? 0;

    if (availableAmount < item.price) {
      alert(`You don't have enough ${resourceType} to buy this item!`);
      return;
    }

    const updatedResources = { ...playerResources };
    updatedResources[resourceType] -= item.price;
    setPlayerResources(updatedResources);

    const existingItem = playerInventory.find((i) => i.id === item.id);
    if (existingItem) {
      const updatedInventory = playerInventory.map((i) =>
        i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
      );
      setPlayerInventory(updatedInventory);
    } else {
      setPlayerInventory([...playerInventory, { ...item, quantity: 1 }]);
    }

    alert(`You bought ${item.name} for ${item.price} ${resourceType}!`);
  };

  return (
    <div className="text-white">
      <h3 className="text-lg font-semibold text-purple-400 mb-2">Trade with NPC</h3>

      {/* Zdroje hráča */}
      <div className="mb-4">
  <h4 className="font-bold text-blue-400 mb-2">Your Resources:</h4>
  {Object.entries(playerResources ?? {}).length > 0 ? (
    <ul>
      {Object.entries(playerResources ?? {}).map(([resource, amount]) => (
        <li key={resource}>
          {resource}: <span className="text-yellow-400">{amount}</span>
        </li>
      ))}
    </ul>
  ) : (
    <p className="text-gray-400 italic">No resources available.</p>
  )}
</div>


      {/* Items for sale */}
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
                    {item.price}{" "}
                    {item.costType && item.costType.trim() !== ""
                      ? item.costType
                      : "Iron Ore"}
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

      {/* Sell summary with quantity selector */}
      {selectedItem && (
        <div className="mb-4">
          <h5 className="text-yellow-300">Selected Item: {selectedItem.name}</h5>
          <p className="text-sm text-gray-400">
            Price per unit: {selectedItem.price}{" "}
            {selectedItem.costType && selectedItem.costType.trim() !== ""
              ? selectedItem.costType
              : "Iron Ore"}
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
                Math.min(Math.max(1, Number(e.target.value)), selectedItem.quantity)
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
          !selectedItem ? "bg-gray-500 cursor-not-allowed" : "bg-red-600 hover:bg-red-700"
        } rounded-lg`}
      >
        Sell Item
      </button>
    </div>
  );
};

export default Trade;
