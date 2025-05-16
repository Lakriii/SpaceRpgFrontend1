import GalacticMarketClient from "./GalacticMarketClient";

export default function GalacticMarketPage() {
  const playerId = 1; // Alebo použiješ auth/session

  return <GalacticMarketClient playerId={playerId} />;
}
