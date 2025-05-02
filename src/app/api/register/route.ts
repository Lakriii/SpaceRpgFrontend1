// pages/api/register.ts

import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "../../../../lib/db/migrate";
import { users } from "../../../../lib/db/schema";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, password } = body;

    if (!email || !name || !password) {
      return NextResponse.json(
        { success: false, message: "Name, email, and password are required" },
        { status: 400 }
      );
    }

    // Skontroluj, či užívateľ s týmto e-mailom existuje
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (existingUser.length > 0) {
      return NextResponse.json(
        { success: false, message: "User with this email already exists" },
        { status: 409 } // Conflict
      );
    }

    // Vlož nového užívateľa do databázy
    await db.insert(users).values({
      name,
      email,
      password,  // Ulož aj password (zabezpeč, že je zahashovaný v reálnom svete)
      created_at: new Date().toISOString(),  // Explicitné nastavenie, ak to nie je automatické
      updated_at: new Date().toISOString(),
    });

    const response = NextResponse.json({
      success: true,
      message: "User registered successfully",
    });

    // Nastav cookie pre prihlásenie (voliteľné, ak chceš používateľa hneď prihlásiť)
    response.cookies.set("isAuthenticated", "true", {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24, // 1 deň
    });

    return response;
  } catch (error) {
    console.error("Error during registration:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
