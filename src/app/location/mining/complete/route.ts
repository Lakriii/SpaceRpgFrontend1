// src/app/api/mining/complete/route.ts
import { NextResponse } from 'next/server';
import { db } from '@/lib/db'; // alebo podľa toho, kde máš databázu
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth'; // ak máš auth

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json();
  const { missionId, creditsEarned, xpEarned, resourcesCollected } = body;

  try {
    // Ukážka zápisu do databázy
    await db.missionResult.create({
      data: {
        userId: session.user.id,
        missionId,
        credits: creditsEarned,
        xp: xpEarned,
        resources: resourcesCollected, // napr. JSON field
        completedAt: new Date()
      }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving mission result:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
