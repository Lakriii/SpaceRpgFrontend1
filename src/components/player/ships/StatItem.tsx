import { getGlowEffect } from "./ShipStatStyles";

export default function StatItem({ label, value, icon, color }: { label: string; value: number; icon: string; color: string }) {
  return (
    <p className="mt-3 text-lg text-gray-300 flex items-center hover:text-white transition-all duration-300">
      {/* 🛸 Icon */}
      <span className="mr-4 text-2xl">{icon}</span>

      {/* 🏷️ Label */}
      <span className="w-28 font-semibold tracking-wide">{label}:</span>

      {/* 🔢 Value with subtle glow */}
      <span className={`ml-3 text-2xl font-extrabold ${getGlowEffect(color)}`}>
        {value}
      </span>
    </p>
  );
}