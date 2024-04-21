import { NextRequest, NextResponse } from "next/server";
import prisma from "../_util/db";

export const dynamic = "force-dynamic";

export async function GET(req: Request | NextRequest) {
    try {
        const authorization = req.headers.get("Authorization");
        if (!authorization) throw "Did not receive authorization token";

        const token = authorization.split(" ")[1];

        const users = await prisma.user.findMany({
            where: {
                token,
            },
        });

        if (!users || users.length === 0) {
            throw "Could not find user with these credentials!";
        }

        return new NextResponse(JSON.stringify(users[0]), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error(error);

        return new NextResponse(JSON.stringify(error), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}
