// File: /pages/api/send-popup-email.js
import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const {
    fullName,
    email,
    phoneNumber,
    service,
    message,
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

    // Admin Email Template for Popup Form
    const adminHtmlContent = `
      <div style="font-family: Arial, sans-serif; background-color:#f8f9fa; padding: 20px;">
        <div style="max-width:600px; margin:0 auto; background:#ffffff; border-radius:8px; box-shadow:0 2px 6px rgba(0,0,0,0.1);">
          <div style="background:#0d0f38; color:#ffffff; padding:16px 24px; border-radius:8px 8px 0 0;">
            <h2 style="margin:0;">🎉 New Popup Form Submission - ${fullName || "User"}</h2>
            <p style="margin:8px 0 0 0; font-size:14px; opacity:0.9;">50% Discount Offer Inquiry</p>
          </div>
          <div style="padding:24px; color:#333333;">
            <p style="margin-bottom:16px; font-size:15px;">You have received a new inquiry from the popup discount form. Details are below:</p>
            <table style="width:100%; border-collapse:collapse;">
              <tr style="background:#f8f9fa;">
                <td style="padding:12px 8px; font-weight:600; border-bottom:1px solid #e9ecef;">Name:</td>
                <td style="padding:12px 8px; border-bottom:1px solid #e9ecef;">${fullName}</td>
              </tr>
              <tr>
                <td style="padding:12px 8px; font-weight:600; border-bottom:1px solid #e9ecef;">Email:</td>
                <td style="padding:12px 8px; border-bottom:1px solid #e9ecef;"><a href="mailto:${email}" style="color:#0d6efd; text-decoration:none;">${email}</a></td>
              </tr>
              <tr style="background:#f8f9fa;">
                <td style="padding:12px 8px; font-weight:600; border-bottom:1px solid #e9ecef;">Phone:</td>
                <td style="padding:12px 8px; border-bottom:1px solid #e9ecef;">${phoneNumber}</td>
              </tr>
              <tr>
                <td style="padding:12px 8px; font-weight:600; border-bottom:1px solid #e9ecef;">Service Interested:</td>
                <td style="padding:12px 8px; border-bottom:1px solid #e9ecef;"><strong style="color:#0d0f38; font-size:16px;">${service || "N/A"}</strong></td>
              </tr>
              <tr style="background:#f8f9fa;">
                <td style="padding:12px 8px; font-weight:600; border-bottom:1px solid #e9ecef; vertical-align:top;">Message:</td>
                <td style="padding:12px 8px; border-bottom:1px solid #e9ecef;">${message || "N/A"}</td>
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
                <td style="padding:12px 8px; border-bottom:1px solid #e9ecef;"><a href="${referringPage}" style="color:#0d6efd; text-decoration:none; font-size:12px;">${referringPage}</a></td>
              </tr>
              ` : ''}
              ${currentPage ? `
              <tr style="background:#f8f9fa;">
                <td style="padding:12px 8px; font-weight:600; border-bottom:1px solid #e9ecef;">Current Page:</td>
                <td style="padding:12px 8px; border-bottom:1px solid #e9ecef;"><a href="${currentPage}" style="color:#0d6efd; text-decoration:none; font-size:12px;">${currentPage}</a></td>
              </tr>
              ` : ''}
            </table>
            
            <div style="margin-top:20px; padding:16px; background:#fff3cd; border-left:4px solid #ffc107; border-radius:4px;">
              <p style="margin:0; color:#856404; font-size:14px;">
                <strong>⚡ Discount Offer Lead:</strong> This customer showed interest in the 50% discount offer.
              </p>
            </div>
          </div>
          <div style="background:#f1f3f5; color:#555; padding:12px 24px; border-top:1px solid #e9ecef; border-radius:0 0 8px 8px; font-size:13px;">
            <p style="margin:0;">📬 This email was automatically generated from Pine Book Publishing popup discount form.</p>
          </div>
        </div>
      </div>
    `;

    // User Thank You Email Template for Popup Form
    const userHtmlContent = `
      <div style="font-family: Arial, sans-serif; background-color:#f8f9fa; padding: 20px;">
        <div style="max-width:600px; margin:0 auto; background:#ffffff; border-radius:8px; box-shadow:0 2px 6px rgba(0,0,0,0.1);">
          <div style="background:linear-gradient(135deg, #0d0f38 0%, #1a1d5e 100%); color:#ffffff; padding:32px 24px; border-radius:8px 8px 0 0; text-align:center;">
            <h1 style="margin:0 0 8px 0; font-size:32px;">🎉 Thank You, ${fullName}!</h1>
          </div>
          <div style="padding:32px 24px; color:#333333;">
            <p style="font-size:16px; line-height:1.6; margin-bottom:16px;">
                <strong>Dear Author,</strong>
              </p>
              <p style="font-size:16px; line-height:1.6; margin-bottom:16px;">
                Thank you for signing up with Pine Book Publishing.
              </p>
              <p style="font-size:16px; line-height:1.6; margin-bottom:24px;">
                 We’d love to schedule a call to discuss your book publishing in more detail.
                Please let us know a time that works best for you so we can connect and talk further.
                I’d really appreciate hearing back from you.
                </p>
            
            <div style="background:#f8f9fa; padding:24px; border-radius:8px; border-left:4px solid #0d0f38; margin:24px 0;">
              <p style="margin:0 0 16px 0; font-weight:600; color:#0d0f38; font-size:16px;">📋 Your Inquiry Details:</p>
              <table style="width:100%; font-size:14px; line-height:1.6;">
                <tr>
                  <td style="padding:8px 0; color:#666; width:140px;">Name:</td>
                  <td style="padding:8px 0; font-weight:600;">${fullName}</td>
                </tr>
                <tr>
                  <td style="padding:8px 0; color:#666;">Email:</td>
                  <td style="padding:8px 0;">${email}</td>
                </tr>
                <tr>
                  <td style="padding:8px 0; color:#666;">Phone:</td>
                  <td style="padding:8px 0;">${phoneNumber}</td>
                </tr>
                <tr>
                  <td style="padding:8px 0; color:#666;">Service:</td>
                  <td style="padding:8px 0; font-weight:600; color:#0d0f38;">${service || "N/A"}</td>
                </tr>
              </table>
            </div>

            <div style="background:#fff3cd; padding:20px; border-radius:8px; margin:24px 0; border-left:4px solid #ffc107;">
              <p style="margin:0; color:#856404; font-size:15px; line-height:1.6;">
                <strong>🎁 Special Offer:</strong> Your 50% discount is waiting! Our publishing experts will contact you soon to help you take advantage of this limited-time offer.
              </p>
            </div>

            <p style="font-size:16px; line-height:1.6; margin-bottom:16px;">
                <strong>Thank you and best regards,</strong>
              </p>
              <p style="font-size:16px; line-height:1.6; margin-bottom:16px;">
                 <strong>Pine Book Publishing Team</strong>
              </p>
              <p style="font-size:16px; line-height:1.6; margin-bottom:16px;">
                   Email: support@pinebookpublishing.com
              </p>
              <p style="font-size:16px; line-height:1.6; margin-bottom:16px;">
                   Call: +1 (866) 841-7463
              </p>
              <p style="font-size:16px; line-height:1.6; margin-bottom:16px;">
                   WhatsApp: +1 (866) 841-7463
              </p>
            
            <div style="text-align:center; margin-top:32px;">
              <a href="https://pinebookpublishing.com" style="display:inline-block; background:#0d0f38; color:#ffffff; padding:16px 40px; text-decoration:none; border-radius:6px; font-weight:600; font-size:16px; box-shadow:0 4px 6px rgba(0,0,0,0.1);">
                Visit Our Website
              </a>
            </div>
          </div>
          <div style="background:#f1f3f5; color:#666; padding:24px; border-top:1px solid #e9ecef; border-radius:0 0 8px 8px; text-align:center;">
            <p style="margin:0 0 8px 0; font-weight:600;">📧 Pine Book Publishing</p>
            <p style="margin:0; font-size:14px;">Questions? Reply to this email or contact us at <a href="mailto:sales@pinebookpublishing.com" style="color:#0d0f38; text-decoration:none;">sales@pinebookpublishing.com</a></p>
          </div>
        </div>
      </div>
    `;

    // Send admin notification email
    const adminInfo = await transporter.sendMail({
      from: `"Pine Book Publishing" <sales@pinebookpublishing.com>`,
      to: "sales@pinebookpublishing.com",
      subject: `🎉 Popup Form Lead - ${fullName || "User"} - ${service || "Service"}`,
      html: adminHtmlContent,
    });

    console.log("✅ Admin popup form email sent:", adminInfo.messageId);

    // Send user thank you email
    const userInfo = await transporter.sendMail({
      from: `"Pine Book Publishing" <sales@pinebookpublishing.com>`,
      to: email,
      subject: `🎉 Your 50% Discount is Reserved - Pine Book Publishing`,
      html: userHtmlContent,
    });

    console.log("✅ User thank you email sent:", userInfo.messageId);

    return res.status(200).json({
      success: true,
      message: "Popup form emails sent successfully",
      adminMessageId: adminInfo.messageId,
      userMessageId: userInfo.messageId,
    });

  } catch (error) {
    console.error("❌ Error sending popup form email:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to send email",
      error: error.message,
    });
  }
}