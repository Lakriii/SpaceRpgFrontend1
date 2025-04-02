"use client";

interface CustomButtonProps {
  onClick: () => void;
  text: string;
  color?: string;
  hoverColor?: string;
  size?: "small" | "medium" | "large"; // Pridané veľkosti
}

export default function CustomButton({
  onClick,
  text,
  color = "bg-red-500",
  hoverColor = "hover:bg-red-600",
  size = "medium",
}: CustomButtonProps) {
  const sizeClasses = {
    small: "px-2 py-1 text-xs",
    medium: "px-4 py-2 text-sm",
    large: "px-6 py-3 text-lg",
  };

  return (
    <div className="flex justify-center mt-6">
      <button
        onClick={onClick}
        className={`rounded-md font-bold transition-all ${color} ${hoverColor} ${sizeClasses[size]}`}
      >
        {text}
      </button>
    </div>
  );
}
