import { NextResponse } from "next/server";
 
 export async function POST() {
   const response = NextResponse.json({ success: true, message: "Logged in" });
 
   response.cookies.set("isAuthenticated", "true", {
     httpOnly: true,
     sameSite: "lax",
     path: "/",
     maxAge: 60 * 60 * 24, // 1 day
   });
 
   return response;
 }