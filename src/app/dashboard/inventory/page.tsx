"use client";


import InventoryList from "@/components/player/inventory/InventoryList";
import { useAuth } from "@/context/AuthContext";

export default function InventoryPage() {
  const { user, loading } = useAuth();

  if (loading) {
    return <p className="text-center mt-10 text-gray-400">Loading user data...</p>;
  }

  if (!user) {
    return <p className="text-center mt-10 text-red-500">You must be logged in to view your inventory.</p>;
  }

  return (
    <div className="w-4/5 mx-auto glassmorphism p-10 rounded-xl shadow-lg">
      <h1 className="text-4xl font-bold neon-glow mb-8 text-center">🎒 Inventory</h1>

      <InventoryList playerId={user.id} />
    </div>
  );
}
