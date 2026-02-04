export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  try {
    const { fullName, email, phoneNumber, message } = req.body || {};

    const resp = await fetch(process.env.LEAD_CAPTURE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Lead-Token": process.env.LEAD_CAPTURE_TOKEN,
      },
      body: JSON.stringify({
        name: fullName,
        email,
        phone: phoneNumber,
        message,
      }),
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
