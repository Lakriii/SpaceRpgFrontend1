export function getBarColor(color: string) {
    switch (color) {
      case "red": return "bg-gradient-to-r from-red-600 via-red-400 to-red-300";
      case "blue": return "bg-gradient-to-r from-blue-600 via-blue-400 to-blue-300";
      case "green": return "bg-gradient-to-r from-green-600 via-green-400 to-green-300";
      case "purple": return "bg-gradient-to-r from-purple-600 via-purple-400 to-purple-300";
      case "orange": return "bg-gradient-to-r from-orange-600 via-orange-400 to-orange-300";
      default: return "bg-gray-600";
    }
  }
  
  export function getGlowEffect(color: string) {
    switch (color) {
      case "red": return "text-red-400 drop-shadow-[0_0_12px_rgba(255,0,0,0.8)]";
      case "blue": return "text-blue-400 drop-shadow-[0_0_12px_rgba(0,132,255,0.8)]";
      case "green": return "text-green-400 drop-shadow-[0_0_12px_rgba(0,255,0,0.8)]";
      case "purple": return "text-purple-400 drop-shadow-[0_0_12px_rgba(160,32,240,0.8)]";
      case "orange": return "text-orange-400 drop-shadow-[0_0_12px_rgba(255,165,0,0.8)]";
      default: return "text-gray-400 drop-shadow-[0_0_12px_rgba(255,255,255,0.5)]";
    }
  }