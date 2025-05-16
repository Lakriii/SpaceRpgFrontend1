'use client';

// src/components/market/MarketItem.tsx
import React from "react";

interface MarketItemProps {
  id: number;
  name: string;
  description: string;
  price: number;
  rarity: string;
  onBuy: () => void;
}

const MarketItem: React.FC<MarketItemProps> = ({ name, description, price, rarity, onBuy }) => {
  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
      <h3 className="text-xl font-semibold">{name}</h3>
      <p className="text-sm text-gray-400">{description}</p>
      <p className="text-sm text-gray-500">Rarity: {rarity}</p>
      <p className="text-lg text-white">Price: {price} Credits</p>
      <button
        onClick={onBuy}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Buy Item
      </button>
    </div>
  );
};

export default MarketItem;
