//
//  Receive only the products that are medicine
//

import { NextRequest, NextResponse } from "next/server";
import prisma from "@/util/db";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
    try {
        const authorization = req.headers.get("Authorization");
        if (!authorization) throw "Did not receive authorization token";
        const token = authorization.split(" ")[1];
        if (!token) throw "Did not receive token";

        // First, get the user or userWorkplace ID from the User table
        const user = await prisma.user.findUnique({
            where: { token },
            include: {
                workplace: true,
            },
        });
        if (!user) throw "User not found with provided token";
        if (!user.workplace) throw "Workplace not found";

        const data = await prisma.product.findMany({
            where: {
                workplaceId: {
                    equals: user.workplace.id,
                },
                // Bring only medicine
                type: "MEDICINE",
            },
        });

        return new NextResponse(JSON.stringify(data), {
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
