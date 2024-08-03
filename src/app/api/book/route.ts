import { NextRequest, NextResponse } from "next/server";
import prisma from "@/util/db";
import { IAppointmentPOST } from "@/types/appointment";

// TODO: maybe update this route.ts aswell to work with prisma's "connect" field (in order to be sure that all connections are correct.)

export async function POST(req: Request | NextRequest) {
    try {
        const body = (await req.json()) as IAppointmentPOST;
        if (!body) throw "Bad body!";

        const res = await prisma.appointment.create({
            data: body,
        });

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
        const { id, ...body } = (await req.json()) as IAppointmentPOST;
        if (!body) throw "Bad body!";
        if (!id) throw "Bad id!";

        const res = await prisma.appointment.update({
            where: {
                id,
            },
            data: body,
        });

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
