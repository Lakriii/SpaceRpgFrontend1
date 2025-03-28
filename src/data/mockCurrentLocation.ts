export const mockCurrentLocation = {
    id: 1,
    name: "Nova Prime",
    type: "Planet", // Typ miesta: Planet, Space Station, Asteroid Field...
    description: "A bustling hub of trade, diplomacy, and exploration.",
    faction: "Federation",
    population: 3_200_000_000,
    economy: "Industrial & Trade",
    resource_richness: "High",
    coordinates: { x: 120, y: -45, z: 30 },
  
    // 🌌 Orbitálne objekty v blízkosti
    orbiting_objects: [
      {
        id: 2,
        name: "Nova Trade Station",
        type: "Space Station",
        description: "A massive trade hub connecting merchants across the galaxy.",
        faction: "Federation",
        economy: "Intergalactic Trade",
        population: 50_000,
      },
      {
        id: 3,
        name: "X-42 Mining Asteroid",
        type: "Asteroid Field",
        description: "A rich asteroid belt with various mining operations.",
        faction: "Independent",
        resource_richness: "Very High",
        is_mining_site: true,
        has_pirate_activity: false,
      },
    ],
  
    // 👤 NPCs na interakciu
    npcs: [
      {
        id: 101,
        name: "Captain Darius",
        role: "Fleet Commander",
        faction: "Federation",
        quests_available: true,
      },
      {
        id: 102,
        name: "Dr. Elara Voss",
        role: "Lead Researcher",
        faction: "Federation",
        research_projects: 3,
      },
      {
        id: 103,
        name: "Sgt. Kregor",
        role: "Security Officer",
        faction: "Federation",
        has_bounties: true,
      },
    ],
  
    // 🛒 Trh (Market)
    market: {
      available_goods: [
        { name: "Energy Cells", price: 200, stock: 500 },
        { name: "Titanium Ore", price: 450, stock: 120 },
        { name: "Medical Supplies", price: 300, stock: 300 },
        { name: "Alien Relics", price: 5000, stock: 5 },
      ],
    },
  
    // 🔬 Výskumné centrum (Research)
    research_center: {
      ongoing_projects: [
        { name: "AI-Assisted Navigation", progress: 75 },
        { name: "Quantum Shielding", progress: 40 },
        { name: "Enhanced Plasma Cannons", progress: 60 },
      ],
    },
  
    // ⛏️ Ťažba (Mining)
    mining_facility: {
      available_resources: [
        { name: "Rare Crystals", extraction_rate: "2 tons/hour" },
        { name: "Plasma Fuel", extraction_rate: "500 liters/hour" },
      ],
    },
  
    // 🛰️ Diplomacia a frakcie
    diplomacy: {
      standing_with_factions: [
        { faction: "Federation", status: "Allied", reputation: 85 },
        { faction: "Independent", status: "Neutral", reputation: 50 },
        { faction: "Pirates", status: "Hostile", reputation: 10 },
      ],
    },
  };