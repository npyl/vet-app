import { NextRequest, NextResponse } from "next/server";
import prisma from "../_util/db";
import { IAppointmentPOST } from "@/types/appointment";

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
