export default function ShipUpgrades({ upgrades }: { upgrades: any[] }) {
    return (
      <div className="mt-6">
        <h3 className="text-xl font-bold text-green-400">⚙️ Upgrades</h3>
        {upgrades.length === 0 ? (
          <p className="text-gray-400">No upgrades installed.</p>
        ) : (
          <ul className="mt-2 space-y-2">
            {upgrades.map((upgrade, index) => (
              <li key={index} className="p-4 bg-gray-800 rounded-lg border border-green-400">
                <p className="text-lg font-semibold">{upgrade.name}</p>
                <p className="text-sm text-gray-400">Effect: {upgrade.effect}</p>
                <p className="text-sm text-gray-400">Energy Cost: {upgrade.energy_cost}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }