import BaseLayout from "@/components/layout/BaseLayout";

export default function FactionsLayout({ children }: { children: React.ReactNode }) {
  return (
    <BaseLayout header="🏛 Galactic Factions">
      {children}
    </BaseLayout>
  );
}
