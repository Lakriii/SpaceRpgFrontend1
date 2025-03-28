import InfoCard from "@/components/ui/InfoCard";
import InfoSection from "@/components/ui/InfoSection";

export default function ShipCrew({ crew }: { crew: any[] }) {
  return (
    <InfoSection
      title="Ship Crew"
      icon="👨‍🚀"
      colorClass="text-purple-400"
      shadowColor="rgba(160, 32, 240, 1)"
      isEmpty={crew.length === 0}
      emptyMessage="No crew assigned."
    >
      {crew.map((member, index) => (
        <InfoCard
          key={index}
          title={member.name}
          details={[
            { label: "Role", value: member.role },
            { label: "Skill Level", value: member.skill_level },
          ]}
          borderColor="border-purple-500/50"
          glowColor="text-purple-400"
        />
      ))}
    </InfoSection>
  );
}