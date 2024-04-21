import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../_util/db";

export const dynamic = "force-dynamic";

interface Props {
    params: { id: number };
}

//
//  Receive a vet's appointments
//
export async function GET(req: Request | NextRequest, { params }: Props) {
    try {
        // INFO: get user id
        const { id } = params || {};
        if (!id) throw "Did not pass an id!";

        // Find user
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

        // Get appointments w/ Pet & DoctorExamination
        const res = await prisma.appointment.findMany({
            where: {
                vetId: {
                    equals: +id,
                },
            },
            include: {
                vet: true,
                pet: true,
                examination: true,
            },
        });

        if (!Array.isArray(res))
            throw "Could not find this appointments record!";

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
