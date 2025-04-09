import React from "react";

type Props = {
  label: string;
  color: "green" | "blue" | "red";
  icon: string;
  onClick: () => void;
};

const colorMap = {
  green: "bg-green-500 hover:bg-green-600",
  blue: "bg-blue-500 hover:bg-blue-600",
  red: "bg-red-500 hover:bg-red-600",
};

export default function DiplomacyButton({ label, color, icon, onClick }: Props) {
  return (
    <button
      className={`px-4 py-2 rounded-full font-bold tracking-wide transition-all ${colorMap[color]}`}
      onClick={onClick}
    >
      {icon} {label}
    </button>
  );
}
