import { NextRequest, NextResponse } from "next/server";
import prisma from "../_util/db";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
    try {
        const url = new URL(req.url);

        // const search = url.searchParams.get("search") ?? "";

        const workplaceId = url.searchParams.get("workplaceId") ?? -1;
        if (workplaceId === -1)
            throw {
                errorMessage: "Bad workplace id",
            };

        const data = await prisma.product.findMany({
            where: {
                workplaceId: {
                    equals: +workplaceId,
                },
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
