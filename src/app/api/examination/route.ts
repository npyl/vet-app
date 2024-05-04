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
        const { medication, ...body } =
            (await req.json()) as IExaminationHistoryPOST;
        if (!body) throw { errorMessage: "Bad body!" };

        // Create
        const res = await prisma.appointment.update({
            where: {
                id: +appointmentId,
            },
            data: {
                examination: {
                    create: body,
                },
            },
        });

        if (!res)
            throw {
                errorMessage: "Could not create-assign doctorExamination",
            };
        if (!res.examinationId)
            throw {
                errorMessage: "Bad examinationId",
            };

        // Create medication and bind to product & examination
        const res2 = await prisma.medication.createMany({
            data: medication.map((m) => ({
                ...m,
                doctorExaminationId: res.examinationId!,
            })),
            skipDuplicates: true, // INFO: there shouldn't be any though
        });

        if (!res2)
            throw {
                errorMessage: "Could not create-assign medications",
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

export async function PUT(req: Request | NextRequest) {
    try {
        // Get Body
        const { id, ...body } = (await req.json()) as IExaminationHistoryPOST;
        if (!id) throw { errorMessage: "Bad id!" };
        if (!body) throw { errorMessage: "Bad body!" };

        // Create
        const res = await prisma.doctorExamination.update({
            where: {
                id,
            },
            data: body,
        });
        if (!res)
            throw {
                errorMessage: "Could not update doctorExamination",
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
