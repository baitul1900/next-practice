import { SignJWT } from "jose";
import { NextResponse } from "next/server";

export async function POST(req) {
    const body = await req.json();
    const { userName, password} = body;

if(userName === "admin" && password === "123456") {
        const payload = { userName: userName, password: password }; 
        
        const key = new TextEncoder().encode(process.env.JWT_KEY);
        let token = await new SignJWT(payload).setProtectedHeader({ alg: "HS256" }).setIssuedAt().setIssuer("http://localhost:3001").setExpirationTime("2h").sign(key);

       return NextResponse.json({
            message: "Login successful",
            status: 200,
            data: {
                token: token,
            },
        });
    } else {
        return NextResponse.json({
            message: "Invalid username or password",
            status: 401,
        });
    }
}