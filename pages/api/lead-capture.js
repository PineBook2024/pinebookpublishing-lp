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

    const resp = await fetch(process.env.LEAD_CAPTURE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Lead-Token": process.env.LEAD_CAPTURE_TOKEN,
      },
      body: JSON.stringify(payload),
    });

    const data = await resp.json().catch(() => ({}));

    if (!resp.ok) {
      return res.status(resp.status).json({
        success: false,
        message: data.message || "Lead capture failed",
      });
    }

    return res.status(200).json({ success: true, data });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}
