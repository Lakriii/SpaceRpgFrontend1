export function getRarityStyle(rarity: string | null) {
    switch (rarity) {
      case "Legendary":
        return "border-2 border-yellow-400 shadow-lg shadow-yellow-500/30";
      case "Epic":
        return "border-2 border-purple-500 shadow-lg shadow-purple-500/30";
      case "Rare":
        return "border-2 border-blue-400 shadow-lg shadow-blue-500/30";
      default:
        return "border-gray-600";
    }
  }
  
  /* 🌀 Neon Glow pre rarity */
  export function getRarityGlow(rarity: string | null) {
    switch (rarity) {
      case "Legendary":
        return "bg-yellow-400/20 text-yellow-300 shadow-yellow-400 shadow-md";
      case "Epic":
        return "bg-purple-500/20 text-purple-300 shadow-purple-500 shadow-md";
      case "Rare":
        return "bg-blue-400/20 text-blue-300 shadow-blue-500 shadow-md";
      default:
        return "bg-gray-700/20 text-gray-400 shadow-gray-500 shadow-md";
    }
  }
  
  /* 🌀 Rarity Label */
  export function getRarityLabel(rarity: string | null) {
    switch (rarity) {
      case "Legendary":
        return "🔥 LEGENDARY";
      case "Epic":
        return "🟣 EPIC";
      case "Rare":
        return "🔵 RARE";
      default:
        return "⚪ COMMON";
    }
  }