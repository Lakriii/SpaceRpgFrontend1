import React, { useState } from "react";

// Item type for the inventory
type Item = {
  id: string;
  name: string;
  price: number;
  description: string;
};

type TradeProps = {
  playerGold: number;
  setPlayerGold: (gold: number) => void;
  playerInventory: Item[];
  setPlayerInventory: (inventory: Item[]) => void;
  itemsForSale: Item[];
};

const Trade: React.FC<TradeProps> = ({
  playerGold,
  setPlayerGold,
  playerInventory,
  setPlayerInventory,
  itemsForSale,
}) => {
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  // Handle selling an item
  const handleSellItem = () => {
    if (!selectedItem) return; // If no item is selected, do nothing

    // Remove the item from the inventory
    const updatedInventory = playerInventory.filter(item => item.id !== selectedItem.id);
    setPlayerInventory(updatedInventory);

    // Add gold to the player
    setPlayerGold(playerGold + selectedItem.price);
    
    // Optionally, you can alert the player
    alert(`You sold ${selectedItem.name} for ${selectedItem.price} gold!`);
    
    // Reset the selected item after selling
    setSelectedItem(null);
  };

  // Handle buying an item
  const handleBuyItem = (item: Item) => {
    if (playerGold < item.price) {
      alert("You don't have enough gold to buy this item!");
      return;
    }

    // Add the item to the player's inventory
    setPlayerInventory([...playerInventory, item]);

    // Deduct gold from the player
    setPlayerGold(playerGold - item.price);

    alert(`You bought ${item.name} for ${item.price} gold!`);
  };

  return (
    <div className="text-white">
      <h3 className="text-lg font-semibold text-purple-400 mb-2">Trade with NPC</h3>

      {/* Display available items for sale */}
      <div className="mb-4">
        <h4 className="font-bold text-blue-400 mb-2">Items for Sale:</h4>
        <ul>
          {itemsForSale.map((item) => (
            <li key={item.id} className="mb-2">
              <div className="flex justify-between items-center bg-gray-700 p-2 rounded-lg">
                <div>
                  <span className="text-white">{item.name}</span>
                  <p className="text-sm text-gray-400">{item.description}</p>
                  <p className="text-yellow-500">{item.price} Gold</p>
                </div>
                <button
                  onClick={() => handleBuyItem(item)} // Add item to inventory on buy
                  className={`bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded-lg mt-2`}
                >
                  Buy
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Display the player's inventory */}
      <div className="mb-4">
        <h4 className="font-bold text-blue-400 mb-2">Your Inventory:</h4>
        <ul>
          {playerInventory.map((item) => (
            <li key={item.id} className="mb-2">
              <div className="flex justify-between items-center bg-gray-700 p-2 rounded-lg">
                <span className="text-white">{item.name}</span>
                <button
                  onClick={() => setSelectedItem(item)} // Set the selected item to sell
                  className={`bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded-lg mt-2`}
                >
                  Sell
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Display the selected item and price (for selling) */}
      {selectedItem && (
        <div className="mb-4">
          <h5 className="text-yellow-300">Selected Item: {selectedItem.name}</h5>
          <p className="text-sm text-gray-400">Price: {selectedItem.price} Gold</p>
        </div>
      )}

      {/* Button to sell the selected item */}
      <button
        onClick={handleSellItem}
        disabled={!selectedItem}
        className={`w-full p-2 ${!selectedItem ? "bg-gray-500" : "bg-red-600 hover:bg-red-700"} rounded-lg`}
      >
        Sell Item
      </button>
    </div>
  );
};

export default Trade;
