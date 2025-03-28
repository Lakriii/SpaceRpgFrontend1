import { NextResponse } from "next/server";
 
 export async function POST() {
   const response = NextResponse.json({ success: true, message: "Logged out" });
 
   response.cookies.set("isAuthenticated", "false", {
     httpOnly: true,
     sameSite: "lax",
     path: "/",
     maxAge: 0,
   });
 
   return response;
 }