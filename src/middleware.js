import { jwtVerify } from "jose";
import { NextResponse } from "next/server";

export async function middleware(req, res, next) {

    if (req.nextUrl.pathname === "/api/profile") {
        try {
            const reqHeader = new Headers(req.headers)
            const token = reqHeader.get('token')
            const key = new TextEncoder().encode(process.env.JWT_KEY);

            const decodedStarings = await jwtVerify(token, key);
            return NextResponse.next();
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
}