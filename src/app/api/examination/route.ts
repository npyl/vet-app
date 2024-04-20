import { NextRequest, NextResponse } from "next/server";
import prisma from "../_util/db";
import { IExaminationHistoryPOST } from "@/types/examination";

export async function POST(req: Request | NextRequest) {
    try {
        // Get appointmentId
        const url = new URL(req.url);
        const appointmentId = url.searchParams.get("appointmentId") ?? "";
        if (!appointmentId)
            throw {
                errorMessage: "Bad appointmentId",
            };

        // Get Body
        const body = (await req.json()) as IExaminationHistoryPOST;
        if (!body) throw "Bad body!";

        // Create
        const res = await prisma.doctorExamination.create({
            data: body,
        });

        if (!res)
            throw {
                errorMessage: "Could not create-assign doctorExamination",
            };

        const res2 = await prisma.appointment.update({
            where: {
                id: +appointmentId,
            },
            data: res,
        });

        if (!res2)
            throw {
                errorMessage:
                    "Could not assign newly created doctorExamination",
            };

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
