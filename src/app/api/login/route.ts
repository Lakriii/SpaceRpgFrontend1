// src/app/api/login/route.ts
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "../../../../lib/db/db"; // Import správneho db klienta
import { users } from "../../../../lib/db/schema";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body; // Očakávame aj heslo

    if (!email || !password) {
      return NextResponse.json({ success: false, message: "Email and password are required" }, { status: 400 });
    }

    // Vyhľadanie používateľa podľa emailu
    const user = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (user.length === 0) {
      return NextResponse.json({ success: false, message: "User not found" }, { status: 401 });
    }

    // Porovnanie hesla - pre plaintext heslo porovnávame priamo
    if (user[0].password !== password) {
      return NextResponse.json({ success: false, message: "Incorrect password" }, { status: 401 });
    }

    const response = NextResponse.json({ success: true, message: "Logged in" });

    // Nastavenie cookie pre prihlásenie
    response.cookies.set("isAuthenticated", "true", {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24, // 1 deň
    });

    return response;
  } catch (error) {
    console.error("Error during login:", error);
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
  }
}