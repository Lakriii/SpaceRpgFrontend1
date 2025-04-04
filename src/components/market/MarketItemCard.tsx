"use client";

interface MarketItemCardProps {
  name: string;
  description: string;
  price: number;
}

export default function MarketItemCard({
  name,
  description,
  price,
}: MarketItemCardProps) {
  return (
    <div className="glassmorphism p-6 rounded-lg flex justify-between items-center">
      <div>
        <h3 className="text-lg font-semibold text-blue-400">{name}</h3>
        <p className="text-gray-300">{description}</p>
        <p className="text-yellow-300 text-lg font-bold">💰 {price} Credits</p>
      </div>
      <button className="px-6 py-3 rounded-full neon-button transition-all hover:scale-105">
        Purchase
      </button>
    </div>
  );
}
