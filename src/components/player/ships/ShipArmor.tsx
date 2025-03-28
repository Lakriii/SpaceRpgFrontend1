import InfoSection from "@/components/ui/InfoSection";
import InfoCard from "@/components/ui/InfoCard";

export default function ShipArmor({ armor }: { armor: any }) {
  return (
    <InfoSection
      title="Armor"
      icon="🛡️"
      colorClass="text-blue-400"
      shadowColor="rgba(0, 132, 255, 1)"
      isEmpty={!armor}
      emptyMessage="No armor equipped."
    >
      {armor && (
        <InfoCard
          title={armor.name}
          details={[
            { label: "Defense Bonus", value: armor.defense_bonus },
            { label: "Effect", value: armor.special_effect },
          ]}
          borderColor="border-blue-500/50"
          glowColor="text-blue-400"
        />
      )}
    </InfoSection>
  );
}