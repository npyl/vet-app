// TODO: ...

import { NextResponse } from "next/server";

export async function POST() {
    try {
        console.log("book: POST");

        return new NextResponse(
            JSON.stringify({ message: "Not implemented!" }),
            {
                status: 400,
                headers: { "Content-Type": "application/json" },
            },
        );
    } catch (error) {
        console.error(error);
        return new NextResponse(JSON.stringify(error), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}
