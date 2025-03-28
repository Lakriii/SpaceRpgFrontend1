import InventoryList from "@/components/player/inventory/InventoryList";

export default function InventoryPage() {
  return (
    <div className="w-4/5 mx-auto glassmorphism p-10 rounded-xl shadow-lg">
      <h1 className="text-4xl font-bold neon-glow mb-8 text-center">🎒 Inventory</h1>

      <InventoryList />
    </div>
  );
}