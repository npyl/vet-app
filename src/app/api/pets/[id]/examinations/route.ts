import { NextRequest, NextResponse } from "next/server";
import prisma from "@/util/db";

export const dynamic = "force-dynamic";

export async function GET(
    req: Request | NextRequest,
    { params }: { params: { id: string } },
) {
    const { id } = params || {};

    try {
        if (!id) throw { errorMessage: "Did not pass an id!" };

        const res = await prisma.doctorExamination.findMany({
            where: {
                appointment: {
                    petId: {
                        equals: +id,
                    },
                },
            },
            include: {
                appointment: true,
                medication: {
                    include: {
                        medicine: true,
                    },
                },
            },
            orderBy: {
                date: "desc",
            },
        });

        if (!Array.isArray(res))
            throw { errorMessage: "Could not find any examinations!" };

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
