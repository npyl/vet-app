import { ILoginReq } from "@/types/auth";
import { randomUUID } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import prisma from "../_util/db";

export async function POST(req: Request | NextRequest) {
    try {
        const body = (await req.json()) as ILoginReq;

        const { email, password } = body;

        const user = await prisma.user.findMany({
            where: {
                email: {
                    equals: email,
                },
                AND: {
                    password: {
                        equals: password,
                    },
                },
            },
        });

        if (!user || user.length === 0) {
            throw {
                errorMessage: "Could not find user with these credentials!",
            };
        }

        // Generate token
        const token = randomUUID();

        // Update user token
        await prisma.user.update({
            where: {
                id: user[0].id,
            },
            data: {
                token,
            },
        });

        return new NextResponse(JSON.stringify({ token }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        return new NextResponse(JSON.stringify(error), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}
