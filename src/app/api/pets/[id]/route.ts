import { NextRequest, NextResponse } from "next/server";
import prisma from "@/util/db";

export const dynamic = "force-dynamic";

export async function GET(
    req: Request | NextRequest,
    { params }: { params: { id: number } },
) {
    const { id } = params || {};

    try {
        if (!id) throw "Did not pass an id!";

        const res = await prisma.pets.findMany({
            where: {
                id: {
                    equals: +id,
                },
            },
        });

        if (!Array.isArray(res) || res.length === 0)
            throw "Could not find this pet!";

        return new NextResponse(JSON.stringify(res[0]), {
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
