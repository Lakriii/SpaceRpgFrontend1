import { NextResponse } from "next/server";
 
 export async function GET() {
   const mockUser = {
     id: 1,
     username: "zdenko",
     email: "zdenko@example.com",
     role: "pilot",
   };
 
   return NextResponse.json(mockUser);
 }