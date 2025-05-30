export const mockFactions = [
    {
      name: "Galactic Federation",
      description: "A powerful union of planets focused on peace, trade, and technological advancement.",
      capital_system: "Sol",
      allies: ["Orion Alliance"],
      enemies: ["Zar'Kun Empire"],
      controlled_systems: ["Sol", "Alpha Centauri", "Epsilon Eridani"],
    },
    {
      name: "Orion Alliance",
      description: "A coalition of free systems defending against the growing influence of empires.",
      capital_system: "Orion Prime",
      allies: ["Galactic Federation"],
      enemies: ["Zar'Kun Empire", "Red Fang Cartel"],
      controlled_systems: ["Orion Prime", "Vega", "Altair"],
    },
    {
      name: "Zar'Kun Empire",
      description: "A militaristic empire seeking to dominate the galaxy through war and expansion.",
      capital_system: "Zar'Tul",
      allies: [],
      enemies: ["Galactic Federation", "Orion Alliance"],
      controlled_systems: ["Zar'Tul", "Kragis", "Thal'Dur"],
    },
    {
      name: "Red Fang Cartel",
      description: "A ruthless criminal syndicate controlling smuggling routes and black markets.",
      capital_system: "Shad'Var",
      allies: ["Zar'Kun Empire"],
      enemies: ["Orion Alliance"],
      controlled_systems: ["Shad'Var", "Nar'Shak", "Xan'Thros"],
    },
    {
      name: "The Silent Order",
      description: "A secretive faction of psionic beings who influence galactic events from the shadows.",
      capital_system: "Unknown",
      allies: [],
      enemies: [],
      controlled_systems: ["Classified"],
    },
  ];