import { NextRequest, NextResponse } from "next/server";
import prisma from "../../_util/db";
import { IVetWorkingHoursPOST } from "@/types/workingHours";

export async function POST(req: Request | NextRequest) {
    try {
        const body = (await req.json()) as IVetWorkingHoursPOST;
        if (!body) throw "Bad body!";

        const vetId = body.vetId;
        if (!vetId) throw "Bad vetId in body!";

        const users = await prisma.user.findMany({
            where: {
                id: {
                    equals: vetId,
                },
            },
        });

        if (!Array.isArray(users) || users.length === 0)
            throw "Could not find this user!";
        if (users[0].type !== "VET") throw "Not a vet!";

        // Create workingHours record for a user
        const res = await prisma.workingHours.create({
            data: body,
        });
        if (!res) throw "Could not find create workingHours record!";

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

export async function PUT(req: Request | NextRequest) {
    try {
        const { id, ...body } = (await req.json()) as IVetWorkingHoursPOST;
        if (!body) throw "Bad body!";
        if (!id) throw "Cannot update workingHours record without record id";

        const vetId = body.vetId;
        if (!vetId) throw "Bad vetId in body!";

        const users = await prisma.user.findMany({
            where: {
                id: {
                    equals: vetId,
                },
            },
        });

        if (!Array.isArray(users) || users.length === 0)
            throw "Could not find this user!";
        if (users[0].type !== "VET") throw "Not a vet!";

        // Create workingHours record for a user
        const res = await prisma.workingHours.update({
            where: {
                id,
            },
            data: body,
        });
        if (!res) throw "Could not find create workingHours record!";

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
