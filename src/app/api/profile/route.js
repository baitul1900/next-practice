import { NextResponse } from "next/server";

export async function GET(req) {
    return NextResponse.json({
        message: 'Hello from the API',
        status: 200,
        data: {
            name: 'John Doe',
            age: 30,
        },
    });
}