import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "../../../../lib/db/db";
import { users, players } from "../../../../lib/db/schema";

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

    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (existingUser.length > 0) {
      return NextResponse.json(
        { success: false, message: "User with this email already exists" },
        { status: 409 }
      );
    }

    // Vlož používateľa a získaj ID
    const insertedUsers = await db.insert(users).values({
      email,
      password,
      username: name,
    }).returning({ id: users.id });

    const userId = insertedUsers[0]?.id;
    if (!userId) {
      return NextResponse.json(
        { success: false, message: "Failed to create user" },
        { status: 500 }
      );
    }

    // Vytvor default player profil
    await db.insert(players).values({
      user_id: userId,
      level: 1,
      class_type: "Rookie",
      hp: 100,
      max_hp: 100,
      energy: 50,
      max_energy: 50,
      stamina: 30,
      strength: 10,
      defense: 10,
      agility: 10,
      intelligence: 10,
      luck: 5,
      credits: 0,
      experience: 0,
      next_level_exp: 1000,
      fights_won: 0,
      fights_lost: 0,
      missions_completed: 0,
      missions_failed: 0,
      equipped_weapon: "Basic Blaster",
      equipped_armor: "Cloth Armor",
    });

    const response = NextResponse.json({
      success: true,
      message: "User registered and player profile created successfully",
    });

    response.cookies.set("isAuthenticated", "true", {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24,
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
