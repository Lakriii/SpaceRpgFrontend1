export const techTreeNeuralSync = [
  {
    name: "Základná integrácia",
    level: 1,
    position: { x: 4, y: 0 },  // Hlavný výskum v strede hornej časti
    description: "Prvé kroky k prepojeniu rôznych neurónových sietí cez jednotné API a synchronizačný protokol.",
    subResearch: [
      {
        name: "API most medzi modelmi",
        effect: "Umožňuje komunikáciu medzi rôznymi typmi modelov.",
        timeRequired: "3d",
        status: "completed",
        position: { x: 3, y: 0 }, // Prvý podvýskum vľavo
      },
      {
        name: "Výber modelov pre kooperáciu",
        effect: "Odomkne kombinovanie GPT a Vision Transformer modelov.",
        timeRequired: "2d",
        status: "completed",
        position: { x: 5, y: 0 }, // Druhý podvýskum vpravo
      },
      {
        name: "Synchronizačný protokol",
        effect: "Zníženie latencie pri prenose dát medzi modelmi.",
        timeRequired: "4d",
        status: "in_progress",
        position: { x: 4, y: 1 }, // Tretí podvýskum pod hlavným výskumom
      }
    ]
  },
  {
    name: "Optimalizácia učenia",
    level: 2,
    position: { x: 4, y: 2 },
    description: "Zefektívnenie výpočtov medzi prepojenými modelmi vďaka zdieľaniu znalostí a váh.",
    subResearch: [
      {
        name: "Zdieľané embeddingy",
        effect: "Znižuje redundanciu a pamäťovú stopu.",
        timeRequired: "3d",
        status: "locked",
        position: { x: 3, y: 2 }, // Prvý podvýskum vľavo
      },
      {
        name: "Transfer Learning pipeline",
        effect: "Zrýchlenie učenia na malých datasadoch.",
        timeRequired: "5d",
        status: "locked",
        position: { x: 5, y: 2 }, // Druhý podvýskum vpravo
      },
      {
        name: "Distribuované učenie",
        effect: "Paralelizácia tréningu medzi viacerými modelmi.",
        timeRequired: "6d",
        status: "locked",
        position: { x: 4, y: 3 }, // Tretí podvýskum pod hlavným výskumom
      }
    ]
  },
  {
    name: "Experimentálny framework",
    level: 3,
    position: { x: 4, y: 4 },
    description: "Vytvorenie systému na testovanie a dynamickú úpravu správania modelov v reálnom čase.",
    subResearch: [
      {
        name: "Dataset orchestrácia",
        effect: "Odomkne pokročilé tréningové scenáre pre multi-modely.",
        timeRequired: "3d",
        status: "locked",
        position: { x: 3, y: 4 }, // Prvý podvýskum vľavo
      },
      {
        name: "Performance tracking",
        effect: "Zobrazí metriky pre každý model v reálnom čase.",
        timeRequired: "2d",
        status: "locked",
        position: { x: 5, y: 4 }, // Druhý podvýskum vpravo
      },
      {
        name: "Dynamický switch modelov",
        effect: "Zlepšuje reakčnosť systému podľa kontextu.",
        timeRequired: "4d",
        status: "locked",
        position: { x: 4, y: 5 }, // Tretí podvýskum pod hlavným výskumom
      }
    ]
  },
  {
    name: "Bezpečnosť & interpretácia",
    level: 4, 
    position: { x: 4, y: 6 },
    description: "Zabezpečenie dôveryhodnosti modelov a detekcia anomálií v komunikácii.",
    subResearch: [
      {
        name: "Audit komunikácie",
        effect: "Zvýši transparentnosť medzi modelmi.",
        timeRequired: "3d",
        status: "locked",
        position: { x: 3, y: 6 }, // Prvý podvýskum vľavo
      },
      {
        name: "Explainable AI moduly",
        effect: "Zvýši dôveru používateľov cez vysvetlenia rozhodnutí.",
        timeRequired: "4d",
        status: "locked",
        position: { x: 5, y: 6 }, // Druhý podvýskum vpravo
      },
      {
        name: "Anomálna detekcia",
        effect: "Zachytí podozrivé správanie medzi modelmi.",
        timeRequired: "5d",
        status: "locked",
        position: { x: 4, y: 7 }, // Tretí podvýskum pod hlavným výskumom
      }
    ]
  },
  {
    name: "Deployment",
    level: 5,
    position: { x: 4, y: 8 },
    description: "Prenos technológie z výskumu do produkcie s dôrazom na flexibilitu a monitoring.",
    subResearch: [
      {
        name: "Kontajnerizácia systému",
        effect: "Pripraví modely na nasadenie cez Docker/Kubernetes.",
        timeRequired: "2d",
        status: "locked",
        position: { x: 3, y: 8 }, // Prvý podvýskum vľavo
      },
      {
        name: "Cloud/Edge rozhodovanie",
        effect: "Dynamický výber platformy pre nasadenie.",
        timeRequired: "3d",
        status: "locked",
        position: { x: 5, y: 8 }, // Druhý podvýskum vpravo
      },
      {
        name: "Live monitoring",
        effect: "Zber spätnej väzby z reálneho nasadenia.",
        timeRequired: "4d",
        status: "locked",
        position: { x: 6, y: 8 }, // Tretí podvýskum pod hlavným výskumom
      }
    ]
  }
];
