import { randomUUID } from "crypto";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: Request | NextRequest) {
    try {
        const body = await req.json();

        const username = body.username;
        const password = body.password;

        // Check credentials
        if (username !== "tester@example.com" || password !== "123456")
            throw "Credentials are wrong.";

        // Respond with dummy randomly generated token
        return new NextResponse(JSON.stringify({ token: randomUUID() }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error(error);
        return new NextResponse(
            JSON.stringify({ message: "Internal Server Error" }),
            { status: 500, headers: { "Content-Type": "application/json" } },
        );
    }
}
