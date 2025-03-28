export const mockSpace = {
    starSystems: [
      {
        id: 1,
        name: "Alpha Centauri",
        coordinates_x: 100,
        coordinates_y: 200,
        coordinates_z: -50,
        faction: "Federation",
      },
      {
        id: 2,
        name: "Orion Nebula",
        coordinates_x: -300,
        coordinates_y: 450,
        coordinates_z: 75,
        faction: "Independent",
      },
    ],
  
    stars: [
      {
        id: 1,
        name: "Sol",
        star_system: 1,
        star_type: "G-type",
        temperature: 5778,
        size: "Medium",
        luminosity: 1.0,
        composition: "Hydrogen-Helium",
        resource_richness: "Low",
      },
      {
        id: 2,
        name: "Betelgeuse",
        star_system: 2,
        star_type: "Red Supergiant",
        temperature: 3500,
        size: "Massive",
        luminosity: 126000,
        composition: "Hydrogen-Carbon",
        resource_richness: "High",
      },
    ],
  
    planets: [
      {
        id: 1,
        name: "Terra Prime",
        star_system: 1,
        size: "Earth-like",
        composition: "Rocky",
        resource_richness: "Moderate",
        atmosphere_type: "Oxygen-Nitrogen",
        population: 8_000_000_000,
        economy_type: "Industrial",
      },
      {
        id: 2,
        name: "Xenon V",
        star_system: 2,
        size: "Gas Giant",
        composition: "Gas",
        resource_richness: "High",
        atmosphere_type: "Hydrogen-Helium",
        population: 0,
        economy_type: "Mining",
      },
    ],
  
    moons: [
      {
        id: 1,
        name: "Luna",
        planet: 1,
        size: "Small",
        composition: "Rocky",
        resource_richness: "Low",
        atmosphere_type: "None",
        has_mining_colony: true,
        has_military_base: false,
        population: 100_000,
      },
    ],
  
    asteroids: [
      {
        id: 1,
        name: "Asteroid X-42",
        star_system: 1,
        size: "Medium",
        composition: "Nickel-Iron",
        resource_richness: "High",
        is_mining_site: true,
        has_pirate_activity: false,
      },
    ],
  
    spaceStations: [
      {
        id: 1,
        name: "Nova Outpost",
        star_system: 1,
        station_type: "Trading Hub",
        orbiting_object_id: 1,
        owner_faction: "Federation",
        orbiting_content_type: "Planet",
      },
    ],
  
    nebulas: [
      {
        id: 1,
        name: "Epsilon Nebula",
        coordinates_x: 500,
        coordinates_y: -200,
        coordinates_z: 300,
        gas_composition: "Hydrogen-Sulfur",
        visibility: "Low",
        has_storms: true,
      },
    ],
  
    unknownObjects: [
      {
        id: 1,
        name: "Artifact X",
        size: "Small",
        composition: "Unidentified",
        resource_richness: "Unknown",
        object_type: "Ancient Relic",
        coordinates_x: -250,
        coordinates_y: 175,
        coordinates_z: 50,
        danger_level: "Low",
        scientific_value: "High",
        can_interact: true,
        star_system: 1,
      },
    ],
  };