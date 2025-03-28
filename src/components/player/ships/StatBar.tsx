import { getBarColor, getGlowEffect } from "./ShipStatStyles";

export default function StatBar({ label, value, max, color }: { label: string; value: number; max: number; color: string }) {
  return (
    <div className="mt-4">
      {/* 🏷️ Stat Label */}
      <p className="text-gray-400 flex items-center stat-label">
        <span className="w-28 font-semibold tracking-wide">{label}:</span>

        {/* 🔢 Number has separate glow effect */}
        <span className={`ml-2 text-xl font-extrabold ${getGlowEffect(color)}`}>
          {value} / {max}
        </span>
      </p>

      {/* 🔷 Sci-Fi Progress Bar */}
      <div className="relative w-full bg-gray-900 rounded-full h-5 mt-2 overflow-hidden stat-container">
        {/* 🚀 Animated Glow Effect */}
        <div className="absolute inset-0 animate-bar-glow"></div>

        {/* 🌌 Left-Aligned Progress Fill */}
        <div
          className={`h-full ${getBarColor(color)} rounded-full stat-bar-glow`}
          style={{
            width: `${(value / max) * 100}%`,
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start", // Aligns left
            paddingLeft: "8px", // Adds space from the left edge
          }}
        >
          {/* 🔢 Centered Number Overlay */}
          <span className="absolute w-full text-center text-sm font-bold text-white opacity-90">
            {value} / {max}
          </span>
        </div>
      </div>
    </div>
  );
}