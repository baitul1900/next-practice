import { SignJWT, jwtVerify } from "jose";
import { NextResponse } from "next/server";


export async function GET(req) {
    const key = new TextEncoder().encode(process.env.JWT_KEY);

    const payload = {
        name: "John Doe",
        email: "5M8YF@example.com",
    }

    let token = await new SignJWT(payload).setProtectedHeader({ alg: "HS256" }).setIssuedAt().setIssuer("http://localhost:3001").setExpirationTime("2h").sign(key);

    return NextResponse.json({
        message: "Hello from the API",
        status: 200,
        data: {
            token: token,
        },
    });
} 


// decode the token 

export const POST = async (req) => {
    const body = await req.json();
    const token = body["token"];

    const key = new TextEncoder().encode(process.env.JWT_KEY);
    try {
        const { payload, protectedHeader } = await jwtVerify(token, key);
        return NextResponse.json({
            message: "Token is valid",
            status: 200,
            data: {
                payload: payload,
            },
        });
    } catch (e) {
        return NextResponse.json({
            message: "Token is invalid",
            status: 401,
            data: {
                error: e.message,
            },
        });
    }
}