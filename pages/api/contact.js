import { NextResponse, NextRequest } from 'next/server'
import nodemailer from 'nodemailer';

// Handles POST requests to /api
export const config = {
    api: {
        bodyParser: true,
    },
};

export default async function POST(request) {

    const username = "2c77e506d95662";
    const password = "68a05c2df2663a";
    const myEmail = "c758e00517-40f151@inbox.mailtrap.io";

    const formData = await request.formData
    const name = formData.get('name')
    const email = formData.get('email')
    const message = formData.get('message')


    // create transporter object
    const transporter = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "2c77e506d95662",
          pass: "68a05c2df2663a"
        }
    });

    try {

        const mail = await transporter.sendMail({
            from: username,
            to: myEmail,
            replyTo: email,
            subject: `Website activity from ${email}`,
            html: `
            <p>Name: ${name} </p>
            <p>Email: ${email} </p>
            <p>Message: ${message} </p>
            `,
        })

        return NextResponse.json({ message: "Success: email was sent" })

    } catch (error) {
        console.log(error)
        NextResponse.status(501).json({ message: "COULD NOT SEND MESSAGE" })
    }


}