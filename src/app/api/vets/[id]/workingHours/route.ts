import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../_util/db";

export const dynamic = "force-dynamic";

interface Props {
    params: { id: number };
}

//
//  Receive a vet's working hours
//
export async function GET(req: Request | NextRequest, { params }: Props) {
    req;

    try {
        // INFO: get user id
        const { id } = params || {};
        if (!id) throw "Did not pass an id!";

        const users = await prisma.user.findMany({
            where: {
                id: {
                    equals: +id,
                },
            },
        });

        // Check if user is VET
        if (!Array.isArray(users) || users.length === 0)
            throw {
                errorMessage: "Could not find this user!",
            };
        if (users[0].type !== "VET")
            throw {
                errorMessage: "Not a vet!",
            };

        const res = await prisma.workingHours.findMany({
            where: {
                vetId: {
                    equals: +id,
                },
            },
            include: {
                vet: true,
            },
        });

        if (!Array.isArray(res) || res.length === 0)
            throw {
                errorMessage: "Could not find this workingHours record!",
            };

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
