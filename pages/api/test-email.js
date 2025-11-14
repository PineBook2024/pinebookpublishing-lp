// ✅ test-email.js
import nodemailer from "nodemailer";

(async () => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "saad.siddiqui1002@gmail.com",
        pass: "wvdoqcvokporrplp", // Gmail app password
      },
    });

    await transporter.verify();
    console.log("✅ SMTP server is ready to send emails");

    await transporter.sendMail({
      from: '"Pine Book Publishing" <saad.siddiqui1002@gmail.com>',
      to: "muhammad.saad@tritechdigital.org",
      subject: "SMTP Test Email",
      text: "This is a test email from your Node.js setup.",
    });

    console.log("📨 Test email sent successfully!");
  } catch (error) {
    console.error("❌ SMTP Test Error:", error);
  }
})();
