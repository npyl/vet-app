import { IRegisterReq, IAuthRes } from "@/types/auth";
import { randomUUID } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import prisma from "../_util/db";

export async function POST(req: Request | NextRequest) {
    try {
        const body = (await req.json()) as IRegisterReq;

        const user = await prisma.user.create({
            data: body,
        });

        // Randomly generated token
        const token = randomUUID();

        // Update user token
        await prisma.user.update({
            where: {
                id: user.id,
            },
            data: {
                token,
            },
        });

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
