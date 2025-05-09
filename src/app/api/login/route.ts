import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@lib/db/db";
import { users } from "@lib/db/schema";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Validácia vstupov
    if (
      typeof email !== "string" ||
      typeof password !== "string" ||
      !email.trim() ||
      !password.trim()
    ) {
      return NextResponse.json(
        { success: false, message: "Email and password are required" },
        { status: 400 }
      );
    }

    // Vyhľadanie používateľa podľa emailu
    const foundUser = await db
      .select()
      .from(users)
      .where(eq(users.email, email.trim()))
      .limit(1);

    if (foundUser.length === 0) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 401 }
      );
    }

    const user = foundUser[0];

    // Porovnanie hesla (aktuálne v plain texte)
    if (user.password !== password.trim()) {
      return NextResponse.json(
        { success: false, message: "Incorrect password" },
        { status: 401 }
      );
    }

    // Odpoveď s údajmi o používateľovi
    const response = NextResponse.json({
      success: true,
      message: "Logged in successfully",
      user: {
        id: user.id,
        email: user.email,
      },
    });

    // Nastavenie cookie pre klienta
    response.cookies.set("isAuthenticated", "true", {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24, // 1 deň
    });

    return response;
  } catch (error) {
    console.error("Error during login:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}