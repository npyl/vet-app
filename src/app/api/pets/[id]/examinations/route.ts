import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../_util/db";

export const dynamic = "force-dynamic";

export async function GET(
    req: Request | NextRequest,
    { params }: { params: { id: number } },
) {
    const { id } = params || {};

    try {
        if (!id) throw { errorMessage: "Did not pass an id!" };

        const res = await prisma.appointment.findMany({
            where: {
                petId: {
                    equals: +id,
                },
            },
            include: {
                examination: true,
            },
        });

        if (!Array.isArray(res))
            throw { errorMessage: "Could not find any appointments!" };

        const examinations = res.map(({ examination }) => examination);

        return new NextResponse(JSON.stringify(examinations), {
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
