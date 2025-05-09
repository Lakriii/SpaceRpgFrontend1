import { NextResponse } from "next/server";
import { db } from "@lib/db/db";
import { users } from "@lib/db/schema";

export async function GET() {
  const data = await db.select().from(users);
  return NextResponse.json(data);
}