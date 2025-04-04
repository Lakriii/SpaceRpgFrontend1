import React from "react";

interface MarketItemProps {
  name: string;
  description: string;
  price: number;
  delivery_time: number;
}

const MarketItem = ({ name, description, price, delivery_time }: MarketItemProps) => {
  return (
    <div className="glassmorphism p-6 rounded-lg flex justify-between items-center">
      <div>
        <h3 className="text-lg font-semibold text-green-400">{name}</h3>
        <p className="text-gray-300">{description}</p>
        <p className="text-yellow-300 text-lg font-bold">💰 {price} Credits</p>
        <p className="text-gray-400 text-sm">⏳ Delivery Time: {delivery_time} cycles</p>
      </div>
      <button className="px-6 py-3 rounded-full neon-button transition-all hover:scale-105">
        Order
      </button>
    </div>
  );
};

export default MarketItem;
