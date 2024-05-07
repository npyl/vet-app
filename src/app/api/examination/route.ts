import { NextRequest, NextResponse } from "next/server";
import prisma from "../_util/db";
import { IExaminationHistoryPOST } from "@/types/examination";
import { IMedicationPOST } from "@/types/medication";

interface IExtendedMedicationPOST extends IMedicationPOST {
    doctorExaminationId: number;
}

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

const createMedication = (m: IExtendedMedicationPOST) =>
    prisma.medication.create({
        data: m,
    });
const updateMedication = (m: IMedicationPOST) =>
    prisma.medication.update({
        where: {
            id: m.id,
        },
        data: m,
    });
const deleteMedication = (id: number) =>
    prisma.medication.delete({
        where: {
            id,
        },
    });

export async function PUT(req: Request | NextRequest) {
    try {
        // Get Body
        const { id, medication, ...body } =
            (await req.json()) as IExaminationHistoryPOST;
        if (!id) throw { errorMessage: "Bad id!" };
        if (!body) throw { errorMessage: "Bad body!" };

        // Update Examination
        const res = await prisma.doctorExamination.update({
            where: {
                id,
            },
            data: body,
            include: {
                medication: true,
            },
        });
        if (!res)
            throw {
                errorMessage: "Could not update doctorExamination",
            };

        const medicationToUpdate = medication.filter(({ id }) => !!id);
        const medicationToCreate = medication
            .filter(({ id }) => !id)
            .map((m) => ({
                ...m,
                doctorExaminationId: res.id,
            })) as IExtendedMedicationPOST[];

        // Every medication that exists in old (res.medication) but does not in new (medication)
        const medicationToDelete = res.medication
            ?.filter(
                ({ medicineId: oldId }) =>
                    !medication?.find(
                        ({ medicineId: newId }) => oldId === newId,
                    ),
            )
            .map(({ id }) => id);

        // Create-assign new medication
        const createRes = await Promise.all(
            medicationToCreate.map(createMedication),
        );
        if (!createRes)
            throw {
                errorMessage: "Failed to create-assign new medications",
            };

        // Update assigned Medication
        // TODO: test this!
        const updateRes = await Promise.all(
            medicationToUpdate.map(updateMedication),
        );
        if (!updateRes)
            throw {
                errorMessage: "Could not update assigned medication",
            };

        // TODO: delete
        const deleteRes = await Promise.all(
            medicationToDelete.map(deleteMedication),
        );
        if (!deleteRes)
            throw {
                errorMessage: "Failed to delete removed",
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
