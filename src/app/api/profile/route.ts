import { NextResponse } from "next/server";

export async function GET() {
    try {
        // Respond with a dummy user
        return new NextResponse(
            JSON.stringify({
                id: 1,
                firstName: "Tester",
                lastName: "Wtvr",
                email: "tester@example.com",
            }),
            {
                status: 200,
                headers: { "Content-Type": "application/json" },
            },
        );
    } catch (error) {
        console.error(error);
        return new NextResponse(
            JSON.stringify({ message: "Internal Server Error" }),
            { status: 500, headers: { "Content-Type": "application/json" } },
        );
    }
}
