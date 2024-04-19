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

        if (!user) {
            throw {
                errorMessage: `Could not create ${body.type === "VET" ? "vet" : "user"}!`,
            };
        }

        // --- VET SPECIFIC ---
        if (body.type === "VET" && workingHours) {
            // Create & Assign working hours for this newly created vet
            const res0 = await prisma.workingHours.create({
                data: { ...workingHours, vetId: user.id },
            });

            if (!res0) {
                throw {
                    errorMessage: `Could not assign working hours for this user!`,
                };
            }

            // Create & Assign Workplace
            const res1 = await prisma.userWorkplace.create({
                data: {
                    region: region || "",
                    city: city || "",
                    complex: complex || "",
                    telephone: telephone || "",
                    userId: user.id,
                },
            });

            if (!res1) {
                throw {
                    errorMessage: `Could not assign workplace information to this user!`,
                };
            }
        }

        // Randomly generated token
        const token = randomUUID();

        // Update user token
        const res2 = await prisma.user.update({
            where: {
                id: user.id,
            },
            data: {
                token,
            },
        });

        if (!res2) {
            throw { errorMessage: `Could not set jwt token for this user.` };
        }

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
