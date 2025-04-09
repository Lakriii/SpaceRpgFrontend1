import React from "react";

export default function FactionInfoCard({ title, color, data, fallback = "None" }) {
  const displayData = Array.isArray(data)
    ? data.length > 0
      ? data.join(", ")
      : fallback
    : data || fallback;

  return (
    <div className="glassmorphism p-4 rounded-lg">
      <h3 className={`text-lg font-semibold ${color}`}>{title}</h3>
      <p className="text-gray-300">{displayData}</p>
    </div>
  );
}
