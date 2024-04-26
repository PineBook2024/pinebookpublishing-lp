import { NextResponse, NextRequest } from 'next/server'
import nodemailer from 'nodemailer';

// Handles POST requests to /api
export const config = {
    api: {
        bodyParser: true,
    },
};

// export default async function POST(request) {

//     const username = "2c77e506d95662";
//     const password = "68a05c2df2663a";
//     const myEmail = "c758e00517-40f151@inbox.mailtrap.io";

//     const formData = await request.formData
//     const name = formData.get('name')
//     const email = formData.get('email')
//     const message = formData.get('message')


//     const transporter = nodemailer.createTransport({
//         host: "sandbox.smtp.mailtrap.io",
//         port: 2525,
//         auth: {
//           user: "2c77e506d95662",
//           pass: "68a05c2df2663a"
//         }
//     });

//     try {

//         const mail = await transporter.sendMail({
//             from: username,
//             to: myEmail,
//             replyTo: email,
//             subject: `Website activity from ${email}`,
//             html: `
//             <p>Name: ${name} </p>
//             <p>Email: ${email} </p>
//             <p>Message: ${message} </p>
//             `,
//         })

//         return NextResponse.json({ message: "Success: email was sent" })

//     } catch (error) {
//         console.log(error)
//         NextResponse.status(501).json({ message: "COULD NOT SEND MESSAGE" })
//     }
// }
// pages/api/contact.js

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name,phone, email, message } = req.body;

    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 's4632553@gmail.com', 
        pass: 'overseas' 
      }
    });

    try {
      let info = await transporter.sendMail({
        from: `"My Site Contact Form" <s4632553@gmail.com>`, // sender address
        to: 's4632553@gmail.com', // list of receivers (could be any email)
        subject: 'New Contact Form Submission', // Subject line
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`, // plain text body
        html: `<b>Name:</b> ${name}<br><b>Phone:</b> ${phone}<br><b>Email:</b> ${email}<br><b>Message:</b> ${message}` // html body
      });

      console.log('Message sent: %s', info.messageId);
      res.status(200).json({ success: true });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
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