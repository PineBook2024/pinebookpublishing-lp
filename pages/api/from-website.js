export default async function handler(req, res) {
  console.log(" Next.js API route hit");

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
   
    const backendBase =
      process.env.LARAVEL_API_URL ||
      (process.env.NEXT_PUBLIC_API_URL
        ? process.env.NEXT_PUBLIC_API_URL.replace(/\/api\/?$/, "")
        : "");

    if (!backendBase) {
      throw new Error(
        "Backend URL not configured (LARAVEL_API_URL or NEXT_PUBLIC_API_URL)"
      );
    }

    const payload = req.body;
    const response = await fetch(
      `${backendBase}/api/leads/from-website`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    
    const text = await response.text();
    console.log("Raw Laravel response:", text);

    let data;
    try {
      data = JSON.parse(text);
    } catch {
      data = { raw: text };
    }

    return res.status(response.status).json(data);

  } catch (error) {
    console.error(" Next API Error:", error.message);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
