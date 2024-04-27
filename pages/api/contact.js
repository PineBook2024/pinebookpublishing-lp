import { NextResponse, NextRequest } from 'next/server'
import nodemailer from 'nodemailer';



export default async function handler(req, res) {
    if (req.method !== 'POST') {
      res.setHeader('Allow', ['POST']);
      res.status(405).send(`Method ${req.method} Not Allowed`);
      return;
    }
  
    const { name, phone, email, message } = req.body;
    console.log('Received request:', req.body);
  
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      host: "imap.titan.email",
      port: 993,
      auth: {
        user: 'support@pinebookpublishing.com', 
        pass: '123' 
      }
    });
  
    try {
      let info = await transporter.sendMail({
        from: `"Query Form" <testing@gmail.com>`, 
        to: 'testing@gmail.com', 
        subject: 'New Contact Form Submission',
        text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`,
        html: `<b>Name:</b> ${name}<br><b>Phone:</b> ${phone}<br><b>Email:</b> ${email}<br><b>Message:</b> ${message}`
      });
  
      console.log('Message sent: %s', info.messageId);
      res.status(200).json({ success: true });
    } catch (error) {
      console.error('Failed to send email:', error);
      res.status(500).json({ success: false, error: error.message });
    }
  }


// export default async function handler(req, res) {
//     if (req.method === 'POST') {
//       const { name, email, message } = req.body;
//       console.log('Received request:', req.body); 
  
//       try {
//         // Your email sending logic
//         res.status(200).json({ success: true, message: "Email sent" });
//       } catch (error) {
//         console.error('Error sending email:', error);
//         res.status(500).json({ success: false, error: error.message });
//       }
//     } else {
//       res.setHeader('Allow', ['POST']);
//       res.status(405).json({ error: 'Method Not Allowed' });
//     }
//   }