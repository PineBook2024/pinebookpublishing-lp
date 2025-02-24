import { NextResponse } from "next/server";

export async function middleware(req) {
  const ip = req.headers.get("x-forwarded-for") || req.ip || "8.8.8.8"; // Default IP for testing
  const accessToken = "037dc08c6f7b22"; // Aapka IPinfo Access Token

  try {
    const geoResponse = await fetch(`https://ipinfo.io/${ip}/json?token=${accessToken}`);
    const geoData = await geoResponse.json();

    if (!geoData || geoData.error) {
      console.log("Geo API Error:", geoData);
      return NextResponse.next(); // Agar error aaye toh request allow karein
    }

    const country = geoData.country || "Unknown";
    const blockedCountries = ["PK", "IN", "CN", "PH"];

    if (blockedCountries.includes(country)) {
      return new NextResponse("Access Denied: Your country is restricted.", { status: 403 });
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Middleware Error:", error);
    return NextResponse.next(); // Agar koi aur error aaye toh block mat karein
  }
}

// Apply middleware to all routes
export const config = {
  matcher: "/:path*",
};
