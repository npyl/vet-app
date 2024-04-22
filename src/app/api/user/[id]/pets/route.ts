import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../_util/db";

export const dynamic = "force-dynamic";

export async function GET(
    req: Request | NextRequest,
    { params }: { params: { id: number } },
) {
    const { id } = params || {};

    try {
        if (!id) throw "Did not pass a user id!";

        const petsForUserId = await prisma.pets.findMany({
            where: {
                ownerId: {
                    equals: +id,
                },
            },
            include: {
                owner: true,
            },
        });

        if (!Array.isArray(petsForUserId)) throw "Failure searching for pets.";

        return new NextResponse(JSON.stringify(petsForUserId), {
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
