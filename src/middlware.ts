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

// ✅ MUSÍŠ pridať toto – inak sa middleware nespustí vôbec
export const config = {
  matcher: [
    /*
      Tento matcher zaručí, že middleware sa spustí pre všetky tvoje protected route.
      Pokiaľ chceš pokryť všetko okrem verejných vecí (_next, api), môžeš ho upraviť.
    */
    "/dashboard/:path*",
    "/location",
    "/market",
    "/space",
    "/factions",
  ],
};