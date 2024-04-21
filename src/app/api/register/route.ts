import { IRegisterReq, IAuthRes } from "@/types/auth";
import { randomUUID } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import prisma from "../_util/db";

export async function POST(req: Request | NextRequest) {
    try {
        const {
            workingHours: workingHoursWithVetId,
            region,
            city,
            complex,
            telephone,
            ...body
        } = (await req.json()) as IRegisterReq;

        const {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            vetId,
            ...workingHours
        } = workingHoursWithVetId || {};

        const user = await prisma.user.create({
            data: {
                ...body,

                // --- VET SPECIFIC ---
                ...(body.type === "VET" && workingHours
                    ? {
                          // create-assign workingHours
                          workingHours: {
                              create: workingHours,
                          },
                          // create-assign Workplace
                          workplace: {
                              create: {
                                  region: region || "",
                                  city: city || "",
                                  complex: complex || "",
                                  telephone: telephone || "",
                              },
                          },
                      }
                    : {}),
            },
        });

        if (!user) {
            throw {
                errorMessage: `Could not create ${body.type === "VET" ? "vet" : "user"}!`,
            };
        }

        // Randomly generated token
        const token = randomUUID();

        // Update user token
        const res0 = await prisma.user.update({
            where: {
                id: user.id,
            },
            data: {
                token,
            },
        });

        if (!res0) {
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
