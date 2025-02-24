import { NextResponse } from "next/server";

export async function middleware(req) {
  // Get IP address
  const ip = req.headers.get("x-forwarded-for") || req.ip || "8.8.8.8"; // Default IP for local testing

  // Fetch geolocation data
  const geoResponse = await fetch(`https://ipapi.co/${ip}/json/`);
  const geoData = await geoResponse.json();
  const country = geoData.country || "Unknown";

  // Define blocked countries
  const blockedCountries = ["IN", "CN", "PH"];

  if (blockedCountries.includes(country)) {
    return new NextResponse("Access Denied: Your country is restricted.", { status: 403 });
  }

  return NextResponse.next();
}

// Apply middleware to all routes
export const config = {
  matcher: "/:path*",
};
