//
// Receive every medication for every pet, of this user (vet or normal)
//

import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../_util/db";

export const dynamic = "force-dynamic";

export async function GET(
    req: Request | NextRequest,
    { params }: { params: { id: number } },
) {
    const { id } = params || {};

    try {
        if (!id) throw "Did not pass a user id!";

        const medicationForUserId = await prisma.medication.findMany({
            where: {
                doctorExamination: {
                    appointment: {
                        pet: {
                            ownerId: id,
                        },
                    },
                },
            },
        });

        // TODO: Make it so we account for the date!

        if (!Array.isArray(medicationForUserId))
            throw "Failure searching for medication for this user.";

        return new NextResponse(JSON.stringify(medicationForUserId), {
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
