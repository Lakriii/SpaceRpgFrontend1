export const mockShips = [
    {
      id: 1,
      image: "/ship1.jpg",
      name: "SS Valkyrie",
      ship_type: "Interceptor",
      hp: 1200,
      max_hp: 1500,
      shield: 600,
      max_shield: 800,
      speed: 300,
      cargo_capacity: 500,
      fuel_capacity: 200,
      weapon_slots: 3,
      armor_slots: 2,
      crew_capacity: 5,
      weapons: [
        { name: "Laser Cannon", damage: 200, critical_chance: 10, energy_consumption: 5 },
        { name: "Plasma Blaster", damage: 350, critical_chance: 15, energy_consumption: 8 },
      ],
      armor: { name: "Titanium Shield", defense_bonus: 50, special_effect: "Reflects 5% damage" },
      upgrades: [
        { name: "Advanced Sensors", effect: "Increases accuracy", energy_cost: 10 },
      ],
      crew: [
        { name: "Commander Rex", role: "Captain", skill_level: 5 },
        { name: "Lt. Nova", role: "Engineer", skill_level: 4 },
      ],
    },
    {
      id: 2,
      name: "USS Titan",
      ship_type: "Battlecruiser",
      hp: 3500,
      max_hp: 4000,
      shield: 1500,
      max_shield: 2000,
      speed: 180,
      cargo_capacity: 1000,
      fuel_capacity: 400,
      weapon_slots: 5,
      armor_slots: 4,
      crew_capacity: 12,
      weapons: [
        { name: "Gauss Railgun", damage: 600, critical_chance: 20, energy_consumption: 12 },
      ],
      armor: { name: "Nano-Reactive Armor", defense_bonus: 100, special_effect: "Regenerates 10 HP/sec" },
      upgrades: [
        { name: "Warp Core Stabilizer", effect: "Boosts speed", energy_cost: 20 },
      ],
      crew: [
        { name: "Captain Orion", role: "Commander", skill_level: 6 },
        { name: "Dr. Vega", role: "Medical Officer", skill_level: 5 },
      ],
    }
  ];