import { NextRequest, NextResponse } from "next/server";
import prisma from "@/util/db";

export const dynamic = "force-dynamic";

export async function GET(
    req: NextRequest,
    { params }: { params: { id: string } },
) {
    try {
        const { id } = params || {};
        if (!id) throw "Did not pass an id!";

        const data = await prisma.product.findUnique({
            where: {
                id: +id,
            },
        });

        return new NextResponse(JSON.stringify(data), {
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
