import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../_util/db";
import { IVetWorkingHoursPOST } from "@/types/workingHours";

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

//
//  Update a Vet's WorkingHours
//
export async function PUT(req: Request | NextRequest) {
    try {
        const { id, vetId, ...body } =
            (await req.json()) as IVetWorkingHoursPOST;
        if (!id) throw "Cannot update workingHours record without record id";
        if (!vetId) throw "Bad vetId in body!";
        if (!body) throw "Bad body!";

        const users = await prisma.user.findMany({
            where: {
                id: {
                    equals: vetId,
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

        // Create workingHours record for a user
        const res = await prisma.workingHours.update({
            where: {
                id,
            },
            data: body,
        });
        if (!res)
            throw { errorMessage: "Could not update workingHours record!" };

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
