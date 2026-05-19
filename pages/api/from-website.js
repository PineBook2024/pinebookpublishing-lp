export default async function handler(req, res) {
  console.log(" Next.js API route hit");

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
   
    console.log(" LARAVEL_API_URL:", process.env.LARAVEL_API_URL);

    if (!process.env.LARAVEL_API_URL) {
      throw new Error("LARAVEL_API_URL is not defined");
    }

    const payload = req.body;
    console.log(" Payload received in Next API:", payload);
    const response = await fetch(
      `${process.env.LARAVEL_API_URL}/api/leads/from-website`,
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
