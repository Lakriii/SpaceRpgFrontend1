import InfoCard from "@/components/ui/InfoCard";
import InfoSection from "@/components/ui/InfoSection";

export default function ShipWeapons({ weapons }: { weapons: any[] }) {
  return (
    <InfoSection
      title="Weapons"
      icon="🔫"
      colorClass="text-red-400"
      shadowColor="rgba(255, 77, 77, 1)"
      isEmpty={weapons.length === 0}
      emptyMessage="No weapons equipped."
    >
      {weapons.map((weapon, index) => (
        <InfoCard
          key={index}
          title={weapon.name}
          details={[
            { label: "Damage", value: weapon.damage },
            { label: "Critical Chance", value: `${weapon.critical_chance}%` },
            { label: "Energy Use", value: weapon.energy_consumption },
          ]}
          borderColor="border-red-500/50"
          glowColor="text-red-400"
        />
      ))}
    </InfoSection>
  );
}