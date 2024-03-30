import { IRegisterReq, IAuthRes } from "@/types/auth";
import { PrismaClient } from "@prisma/client";
import { randomUUID } from "crypto";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: Request | NextRequest) {
    try {
        const body = (await req.json()) as IRegisterReq;

        console.log("creating a : ", body.type);

        await prisma.user.create({
            data: body,
        });

        // Randomly generated token
        const token = randomUUID();

        return new NextResponse<IAuthRes>(JSON.stringify({ token }), {
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
