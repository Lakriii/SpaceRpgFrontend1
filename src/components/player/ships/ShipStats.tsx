import StatBar from "./StatBar";
import StatItem from "./StatItem";

export default function ShipStats({ ship }: { ship: any }) {
  return (
    <div className="mt-6 p-6 rounded-xl glassmorphism sci-fi-border w-full max-w-2xl mx-auto">
      <h3 className="text-2xl font-extrabold text-center neon-glow mb-4">🚀 Ship Stats</h3>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
        {/* 🔴 HP & Shield */}
        <div className="stat-card">
          <StatBar label="HP" value={ship.hp} max={ship.max_hp} color="red" />
        </div>
        <div className="stat-card">
          <StatBar label="Shield" value={ship.shield} max={ship.max_shield} color="blue" />
        </div>

        {/* 🚀 Speed */}
        <div className="stat-card">
          <StatItem label="Speed" value={ship.speed} icon="🚀" color="green" />
        </div>

        {/* 📦 Cargo */}
        <div className="stat-card">
          <StatItem label="Cargo" value={ship.cargo_capacity} icon="📦" color="purple" />
        </div>

        {/* ⛽ Fuel */}
        <div className="stat-card col-span-2">
          <StatBar label="Fuel" value={ship.fuel_capacity} max={1000} color="orange" />
        </div>

        {/* 👨‍🚀 Crew */}
        <div className="stat-card">
          <StatItem label="Crew" value={ship.crew_capacity} icon="👨‍🚀" color="gray" />
        </div>
      </div>
    </div>
  );
}