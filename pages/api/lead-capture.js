export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  try {
    const {
      fullName,
      firstName,
      name,
      email,
      phoneNumber,
      phone,
      message,
      service,
      category,
    } = req.body || {};

    const payload = {
      name: fullName || firstName || name || "",
      email: email || "",
      phone: phoneNumber || phone || "",
      message: message || "",
    };

    const serviceValue = service || category;
    if (serviceValue) payload.service = serviceValue;

    const backendBase =
      process.env.LARAVEL_API_URL ||
      (process.env.NEXT_PUBLIC_API_URL
        ? process.env.NEXT_PUBLIC_API_URL.replace(/\/api\/?$/, "")
        : "");

    const targetUrl =
      process.env.LEAD_CAPTURE_URL ||
      (backendBase ? `${backendBase}/api/leads/from-website` : "");

    if (!targetUrl) {
      throw new Error(
        "Lead capture target not configured (set LEAD_CAPTURE_URL or NEXT_PUBLIC_API_URL)"
      );
    }

    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36",
    };
    if (process.env.LEAD_CAPTURE_TOKEN) {
      headers["X-Lead-Token"] = process.env.LEAD_CAPTURE_TOKEN;
    }

    const resp = await fetch(targetUrl, {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
    });

    const text = await resp.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch {
      data = null;
    }

    if (!resp.ok || data === null) {
      const looksLikeChallenge = /jschallenge|Checking your browser/i.test(text);
      console.error(
        "Lead capture failed:",
        resp.status,
        looksLikeChallenge ? "(bot-shield challenge page)" : text.slice(0, 300)
      );
      return res.status(resp.ok ? 502 : resp.status).json({
        success: false,
        message:
          (data && data.message) ||
          (looksLikeChallenge
            ? "Backend is behind a bot-protection challenge that blocks server-side requests."
            : "Lead capture failed"),
      });
    }

    return res.status(200).json({ success: true, data });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}
