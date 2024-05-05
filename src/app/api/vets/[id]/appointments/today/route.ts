import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../_util/db";
import dayjs from "dayjs";

export const dynamic = "force-dynamic";

interface Props {
    params: { id: string };
}

//
//  Receive a vet's appointments for tomorrow
//
export async function GET(req: Request | NextRequest, { params }: Props) {
    try {
        const { id } = params || {};
        if (!id) throw "Did not pass an id!";

        const users = await prisma.user.findMany({
            where: {
                id: {
                    equals: +id,
                },
            },
        });

        if (!Array.isArray(users) || users.length === 0)
            throw {
                errorMessage: "Could not find this user!",
            };
        if (users[0].type !== "VET")
            throw {
                errorMessage: "Not a vet!",
            };

        const tomorrowStart = dayjs()
            .add(1, "day")
            .startOf("day")
            .toISOString(); // Start of tomorrow
        const tomorrowEnd = dayjs().add(1, "day").endOf("day").toISOString(); // End of tomorrow

        const appointments = await prisma.appointment.findMany({
            where: {
                vetId: {
                    equals: +id,
                },
                date: {
                    gte: tomorrowStart,
                    lte: tomorrowEnd,
                },
            },
            include: {
                vet: true,
                pet: true,
                examination: {
                    include: {
                        medication: {
                            include: {
                                medicine: true,
                            },
                        },
                    },
                },
            },
        });

        if (!Array.isArray(appointments))
            throw "Could not find this appointments record!";

        return new NextResponse(JSON.stringify(appointments), {
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
