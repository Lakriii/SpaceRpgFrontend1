import { mockLocalMarket } from "@/data/mockLocalMarket";
import MarketItem from "@/components/market/MarketItem"; // Import MarketItem komponentu

export default function LocalMarket() {
  if (!mockLocalMarket || !mockLocalMarket.items) {
    return (
      <div className="text-center text-red-500 text-xl font-bold mt-10">
        ⚠️ No market data available.
      </div>
    );
  }

  return (
    <div className="p-8 max-w-4xl mx-auto text-white">
      <h1 className="text-3xl font-extrabold neon-glow text-center">🏪 Local Market</h1>
      <p className="text-gray-400 text-center mt-2">
        Buy and sell goods in the local system.
      </p>

      <div className="mt-6 grid gap-6">
        {mockLocalMarket.items.map((item) => (
          <MarketItem
            key={item.id}
            name={item.name}
            description={item.description}
            price={item.price}
            rarity={item.rarity}  // Pridanie raritného prop-u
          />
        ))}
      </div>
    </div>
  );
}
