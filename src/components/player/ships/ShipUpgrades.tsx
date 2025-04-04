// components/ship/ShipUpgrades.tsx
import InfoCard from "@/components/ui/InfoCard"; // Import InfoCard komponenty

export default function ShipUpgrades({ upgrades }: { upgrades: any[] }) {
  return (
    <div className="mt-6">
      <h3 className="text-xl font-bold text-green-400">⚙️ Upgrades</h3>
      {upgrades.length === 0 ? (
        <p className="text-gray-400">No upgrades installed.</p>
      ) : (
        <ul className="mt-2 space-y-2">
          {upgrades.map((upgrade, index) => (
            <li key={index}>
              <InfoCard
                title={upgrade.name}
                details={[
                  { label: "Effect", value: upgrade.effect },
                  { label: "Energy Cost", value: upgrade.energy_cost },
                ]}
                borderColor="border-green-400"
                glowColor="text-green-400"
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
