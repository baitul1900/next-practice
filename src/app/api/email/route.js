import { NextResponse } from "next/server";
import nodemailer from "nodemailer";


export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get('email');


    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: "baitulamin1900@gmail.com",
            pass: "Rohan1900@1900#",
        },
        tls: { rejectUnauthorized: false,}    
    })

    const mailOptions = {
        from: "<baitulamin1900@gmail.com>",
        to: email,
        subject: "Hello",
        text: "Hello world",
    }

    try {
        await transporter.sendMail(mailOptions);
        return NextResponse.json({
            message: "Email sent successfully",
            status: 200,
            data: {
                email: email,
            },
        });
    } catch (e) {
        return NextResponse.json({
            message: "Email not sent",
            status: 500,
            data: {
                email: email,
            },
        });
    }
}