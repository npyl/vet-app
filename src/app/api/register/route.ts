import { IRegisterReq, IAuthRes } from "@/types/auth";
import { randomUUID } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import prisma from "../_util/db";

export async function POST(req: Request | NextRequest) {
    try {
        const { workingHours, region, city, complex, telephone, ...body } =
            (await req.json()) as IRegisterReq;

        const user = await prisma.user.create({
            data: body,
        });

        // --- VET SPECIFIC ---
        if (body.type === "VET" && workingHours) {
            // Create & Assign working hours for this newly created vet
            await prisma.workingHours.create({
                data: { ...workingHours, vetId: user.id },
            });

            // Create & Assign Workplace
            await prisma.userWorkplace.create({
                data: {
                    region: region || "",
                    city: city || "",
                    complex: complex || "",
                    telephone: telephone || "",
                    userId: user.id,
                },
            });
        }

        // Randomly generated token
        const token = randomUUID();

        // Update user token
        await prisma.user.update({
            where: {
                id: user.id,
            },
            data: {
                token,
            },
        });

        return new NextResponse<IAuthRes>(JSON.stringify({ token }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        return new NextResponse(JSON.stringify(error), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}
