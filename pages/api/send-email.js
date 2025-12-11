import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const {
    name,
    email,
    phone,
    msg,
    services = [],
    manuscript,
    genre,
    formType,
    referringPage,
    currentPage,
    userIP,
    userCity,
    userRegion,
    userCountry,
  } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "pinebookwriting@gmail.com",
        pass: "owwwkmrznsnddjtm",
      },
    });

    // Format services for display
    const servicesText = services.length > 0
      ? services.join(", ")
      : "Not specified";

    // Admin Email Template
    const adminHtmlContent = `
      <div style="font-family: Arial, sans-serif; background-color:#f8f9fa; padding: 20px;">
        <div style="max-width:600px; margin:0 auto; background:#ffffff; border-radius:8px; box-shadow:0 2px 6px rgba(0,0,0,0.1);">
          <div style="background:#117d6b; color:#ffffff; padding:16px 24px; border-radius:8px 8px 0 0;">
            <h2 style="margin:0;">📧 New Form Submission - ${name || "User"}</h2>
            <p style="margin:8px 0 0 0; font-size:14px; opacity:0.9;">Form Type: ${formType || "General Contact"}</p>
          </div>
          <div style="padding:24px; color:#333333;">
            <p style="margin-bottom:16px; font-size:15px;">You have received a new inquiry. Details are below:</p>
            <table style="width:100%; border-collapse:collapse;">
              <tr style="background:#f8f9fa;">
                <td style="padding:12px 8px; font-weight:600; border-bottom:1px solid #e9ecef;">Name:</td>
                <td style="padding:12px 8px; border-bottom:1px solid #e9ecef;">${name}</td>
              </tr>
              <tr>
                <td style="padding:12px 8px; font-weight:600; border-bottom:1px solid #e9ecef;">Email:</td>
                <td style="padding:12px 8px; border-bottom:1px solid #e9ecef;"><a href="mailto:${email}" style="color:#0d6efd; text-decoration:none;">${email}</a></td>
              </tr>
              <tr style="background:#f8f9fa;">
                <td style="padding:12px 8px; font-weight:600; border-bottom:1px solid #e9ecef;">Phone:</td>
                <td style="padding:12px 8px; border-bottom:1px solid #e9ecef;">${phone}</td>
              </tr>
              ${services.length > 0 ? `
              <tr>
                <td style="padding:12px 8px; font-weight:600; border-bottom:1px solid #e9ecef; vertical-align:top;">Services Interested:</td>
                <td style="padding:12px 8px; border-bottom:1px solid #e9ecef;">
                  <ul style="margin:0; padding-left:20px;">
                    ${services.map(service => `<li>${service}</li>`).join('')}
                  </ul>
                </td>
              </tr>
              ` : ''}
              ${manuscript ? `
              <tr style="background:#f8f9fa;">
                <td style="padding:12px 8px; font-weight:600; border-bottom:1px solid #e9ecef;">Manuscript Status:</td>
                <td style="padding:12px 8px; border-bottom:1px solid #e9ecef;"><strong>${manuscript}</strong></td>
              </tr>
              ` : ''}
              ${genre ? `
              <tr>
                <td style="padding:12px 8px; font-weight:600; border-bottom:1px solid #e9ecef;">Book Genre:</td>
                <td style="padding:12px 8px; border-bottom:1px solid #e9ecef;"><strong style="color:#117d6b;">${genre}</strong></td>
              </tr>
              ` : ''}
              <tr style="background:#f8f9fa;">
                <td style="padding:12px 8px; font-weight:600; border-bottom:1px solid #e9ecef; vertical-align:top;">Message:</td>
                <td style="padding:12px 8px; border-bottom:1px solid #e9ecef;">${msg || "N/A"}</td>
              </tr>
              ${userIP ? `
              <tr>
                <td style="padding:12px 8px; font-weight:600; border-bottom:1px solid #e9ecef;">IP Address:</td>
                <td style="padding:12px 8px; border-bottom:1px solid #e9ecef;">${userIP}</td>
              </tr>
              ` : ''}
              ${userCity ? `
              <tr style="background:#f8f9fa;">
                <td style="padding:12px 8px; font-weight:600; border-bottom:1px solid #e9ecef;">Location:</td>
                <td style="padding:12px 8px; border-bottom:1px solid #e9ecef;">${userCity}, ${userRegion}, ${userCountry}</td>
              </tr>
              ` : ''}
              ${referringPage ? `
              <tr>
                <td style="padding:12px 8px; font-weight:600; border-bottom:1px solid #e9ecef;">Referrer:</td>
                <td style="padding:12px 8px; border-bottom:1px solid #e9ecef;"><a href="${referringPage}" style="color:#0d6efd; text-decoration:none; font-size:12px; word-break:break-all;">${referringPage}</a></td>
              </tr>
              ` : ''}
              ${currentPage ? `
              <tr style="background:#f8f9fa;">
                <td style="padding:12px 8px; font-weight:600; border-bottom:1px solid #e9ecef;">Current Page:</td>
                <td style="padding:12px 8px; border-bottom:1px solid #e9ecef;"><a href="${currentPage}" style="color:#0d6efd; text-decoration:none; font-size:12px; word-break:break-all;">${currentPage}</a></td>
              </tr>
              ` : ''}
            </table>
            
            ${formType === 'Project Needs' ? `
            <div style="margin-top:20px; padding:16px; background:#d1ecf1; border-left:4px solid #0c5460; border-radius:4px;">
              <p style="margin:0; color:#0c5460; font-size:14px;">
                <strong>📚 Project Inquiry:</strong> This customer is looking for book publishing services.
              </p>
            </div>
            ` : ''}
          </div>
          <div style="background:#f1f3f5; color:#555; padding:12px 24px; border-top:1px solid #e9ecef; border-radius:0 0 8px 8px; font-size:13px;">
            <p style="margin:0;">📬 This email was automatically generated from Pine Book Publishing website.</p>
          </div>
        </div>
      </div>
    `;

    // User Thank You Email Template
    const userHtmlContent = `
      <div style="font-family: Arial, sans-serif; background-color:#f8f9fa; padding: 20px;">
        <div style="max-width:600px; margin:0 auto; background:#ffffff; border-radius:8px; box-shadow:0 2px 6px rgba(0,0,0,0.1);">
          <div style="background:linear-gradient(135deg, #117d6b 0%, #15184c 100%); color:#ffffff; padding:32px 24px; border-radius:8px 8px 0 0; text-align:center;">
            <h1 style="margin:0 0 8px 0; font-size:32px;">Thank You, ${name}!</h1>
          </div>
          <div style="padding:32px 24px; color:#333333;">
            <p style="font-size:16px; line-height:1.6; margin-bottom:16px;">
              <strong>Dear Author,</strong>
            </p>
            <p style="font-size:16px; line-height:1.6; margin-bottom:16px;">
              Thank you for reaching out to Pine Book Publishing.
            </p>
            <p style="font-size:16px; line-height:1.6; margin-bottom:24px;">
              We'd love to schedule a call to discuss your book publishing in more detail.
              Please let us know a time that works best for you so we can connect and talk further.
            </p>
            
            <div style="background:#f8f9fa; padding:24px; border-radius:8px; border-left:4px solid #117d6b; margin:24px 0;">
              <p style="margin:0 0 16px 0; font-weight:600; color:#117d6b; font-size:16px;">📋 Your Inquiry Details:</p>
              <table style="width:100%; font-size:14px; line-height:1.6;">
                <tr>
                  <td style="padding:8px 0; color:#666; width:140px;">Name:</td>
                  <td style="padding:8px 0; font-weight:600;">${name}</td>
                </tr>
                <tr>
                  <td style="padding:8px 0; color:#666;">Email:</td>
                  <td style="padding:8px 0;">${email}</td>
                </tr>
                <tr>
                  <td style="padding:8px 0; color:#666;">Phone:</td>
                  <td style="padding:8px 0;">${phone}</td>
                </tr>
                ${services.length > 0 ? `
                <tr>
                  <td style="padding:8px 0; color:#666; vertical-align:top;">Services:</td>
                  <td style="padding:8px 0;">${servicesText}</td>
                </tr>
                ` : ''}
                ${manuscript ? `
                <tr>
                  <td style="padding:8px 0; color:#666;">Manuscript:</td>
                  <td style="padding:8px 0;">${manuscript}</td>
                </tr>
                ` : ''}
                ${genre ? `
                <tr>
                  <td style="padding:8px 0; color:#666;">Genre:</td>
                  <td style="padding:8px 0; font-weight:600; color:#117d6b;">${genre}</td>
                </tr>
                ` : ''}
              </table>
            </div>

            <p style="font-size:16px; line-height:1.6; margin-bottom:16px;">
              <strong>Thank you and best regards,</strong>
            </p>
            <p style="font-size:16px; line-height:1.6; margin-bottom:16px;">
              <strong>Pine Book Publishing Team</strong>
            </p>
            <p style="font-size:16px; line-height:1.6; margin-bottom:8px;">
              Email: support@pinebookpublishing.com
            </p>
            <p style="font-size:16px; line-height:1.6; margin-bottom:8px;">
              Call: +1 (866) 841-7463
            </p>
            <p style="font-size:16px; line-height:1.6; margin-bottom:16px;">
              WhatsApp: +1 (866) 841-7463
            </p>
            
            <div style="text-align:center; margin-top:32px;">
              <a href="https://pinebookpublishing.com" style="display:inline-block; background:#117d6b; color:#ffffff; padding:16px 40px; text-decoration:none; border-radius:6px; font-weight:600; font-size:16px;">
                Visit Our Website
              </a>
            </div>
          </div>
          <div style="background:#f1f3f5; color:#666; padding:24px; border-top:1px solid #e9ecef; border-radius:0 0 8px 8px; text-align:center;">
            <p style="margin:0 0 8px 0; font-weight:600;">📧 Pine Book Publishing</p>
            <p style="margin:0; font-size:14px;">Questions? Reply to this email or contact us at <a href="mailto:sales@pinebookpublishing.com" style="color:#117d6b; text-decoration:none;">sales@pinebookpublishing.com</a></p>
          </div>
        </div>
      </div>
    `;

    // Send admin notification email
    const adminInfo = await transporter.sendMail({
      from: `"Pine Book Publishing" <sales@pinebookpublishing.com>`,
      to: "sales@pinebookpublishing.com",
      subject: `📧 New ${formType || "Contact"} Form - ${name}`,
      html: adminHtmlContent,
    });

    console.log("✅ Admin email sent:", adminInfo.messageId);

    // Send user thank you email
    const userInfo = await transporter.sendMail({
      from: `"Pine Book Publishing" <sales@pinebookpublishing.com>`,
      to: email,
      subject: `Thank You for Contacting Pine Book Publishing`,
      html: userHtmlContent,
    });

    console.log("✅ User thank you email sent:", userInfo.messageId);

    return res.status(200).json({
      success: true,
      message: "Emails sent successfully",
      adminMessageId: adminInfo.messageId,
      userMessageId: userInfo.messageId,
    });

  } catch (error) {
    console.error("❌ Error sending email:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to send email",
      error: error.message,
    });
  }
}