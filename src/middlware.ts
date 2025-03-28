import { NextRequest, NextResponse } from "next/server";
 
 const protectedRoutes = [
   "/dashboard",
   "/dashboard/inventory",
   "/dashboard/ships",
   "/dashboard/reputation",
   "/location",
   "/market",
   "/space",
   "/factions",
 ];
 
 export function middleware(request: NextRequest) {
   const { pathname } = request.nextUrl;
 
  
   const isLoggedIn = request.cookies.get("isAuthenticated")?.value === "true";
 
   const isProtected = protectedRoutes.some((route) =>
     pathname.startsWith(route)
   );
 
   if (isProtected && !isLoggedIn) {
     return NextResponse.redirect(new URL("/login", request.url));
   }
 
   return NextResponse.next();
 }