// app/market/local/page.tsx
import LocalMarketClient from "./LocalMarketClient";

export default function LocalMarketPage() {
  const playerId = 1; // Toto nahraď reálnym playerId (z auth/session napr.)

  return <LocalMarketClient playerId={playerId} />;
}
