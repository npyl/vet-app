import { NextResponse } from "next/server";
import prisma from "../_util/db";

export async function GET() {
    try {
        const data = await prisma.user.findMany({
            where: {
                type: {
                    equals: "VET",
                },
            },
        });

        console.log("all vets: ", data);

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
