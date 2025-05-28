import BaseLayout from "@/components/layout/BaseLayout";
import ProtectedPage from "@/components/auth/ProtectedPage";


export default function FactionsLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedPage>
      <BaseLayout header="🏛 Galactic Factions">
        {children}
      </BaseLayout>
    </ProtectedPage>
  );
}
