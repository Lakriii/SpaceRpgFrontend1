import { NextResponse } from 'next/server';
import { db } from '@lib/db/db'; // cesta k tvojmu drizzle klientovi
import { researchNodes } from '@lib/db/schema/research';

export async function GET() {
  // Načítame všetky hlavné research nodes + ich "subResearch" (napr. podľa parent_id)
  // Predpokladám, že subResearch majú parent_id nastavené na ID hlavného research node

  const allNodes = await db.select().from(researchNodes);

  // Rozdelíme na hlavné (parent_id = null) a podvýskumy
  const mainResearch = allNodes.filter((node) => node.parent_id === null);
  const subResearch = allNodes.filter((node) => node.parent_id !== null);

  // Pridáme subResearch ku každej hlavnej položke
  const researchWithSubs = mainResearch.map((main) => ({
    ...main,
    subResearch: subResearch.filter((sub) => sub.parent_id === main.id),
  }));

  return NextResponse.json(researchWithSubs);
}
