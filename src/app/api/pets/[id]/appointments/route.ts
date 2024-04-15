import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../_util/db";

export const dynamic = "force-dynamic";

export async function GET(
    req: Request | NextRequest,
    { params }: { params: { id: number } },
) {
    const { id } = params || {};

    try {
        if (!id) throw "Did not pass an id!";

        const res = await prisma.appointment.findMany({
            where: {
                petId: {
                    equals: +id,
                },
            },
        });

        if (!Array.isArray(res)) throw "Could not find any appointments!";

        return new NextResponse(JSON.stringify(res), {
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
