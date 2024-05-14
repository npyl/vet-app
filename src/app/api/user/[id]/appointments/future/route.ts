import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../_util/db";
import dayjs from "dayjs";

export const dynamic = "force-dynamic";

const todayStart = dayjs().startOf("day").toISOString();

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

        const user = await prisma.user.findUnique({
            where: {
                id: +id,
            },
            include: {
                pets: true,
            },
        });
        if (!user)
            throw {
                errorMessage: "Could not find this user!",
            };

        // This user's pets
        const pets = await prisma.pets.findMany({
            where: {
                ownerId: {
                    equals: +id,
                },
            },
            include: {
                appointments: {
                    where: {
                        // Today and future
                        date: {
                            gte: todayStart,
                        },
                    },
                    include: {
                        pet: true,
                        vet: true,
                    },
                },
            },
        });
        if (!Array.isArray(pets))
            throw {
                errorMessage: "Pets is not an array",
            };

        // Get appointments
        const appointments = pets
            .map(({ appointments }) => appointments)
            .flat();
        if (!Array.isArray(appointments)) throw "Could not find appointments!";

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
