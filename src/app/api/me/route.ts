import { cookies } from "next/headers";
import { db } from "@lib/db/db";
import { users } from "@lib/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
  const cookieStore = cookies();
  const userId = cookieStore.get("userId")?.value;

  if (!userId) {
    return NextResponse.json(null, { status: 401 });
  }

  const found = await db
    .select()
    .from(users)
    .where(eq(users.id, Number(userId)))
    .limit(1);

  const user = found[0];

  if (!user) {
    return NextResponse.json(null, { status: 404 });
  }

  return NextResponse.json({
    id: user.id,
    username: user.username ?? "anonymous",
    email: user.email,
    role: "user", // alebo user.role ak máš
  });
}