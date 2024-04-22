import { NextRequest, NextResponse } from "next/server";
import prisma from "../../_util/db";

export const dynamic = "force-dynamic";

export async function GET(
    req: Request | NextRequest,
    { params }: { params: { id: number } },
) {
    const { id } = params || {};

    try {
        if (!id) throw { errorMessage: "Did not pass a user id!" };

        const users = await prisma.user.findMany({
            where: {
                id: {
                    equals: +id,
                },
            },
            include: {
                workplace: true,
                workingHours: true,
            },
        });

        if (!Array.isArray(users) || users.length !== 1)
            throw {
                errorMessage: "Could not find user with this id",
            };

        return new NextResponse(JSON.stringify(users[0]), {
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
