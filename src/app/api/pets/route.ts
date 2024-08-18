import { NextRequest, NextResponse } from "next/server";
import prisma from "@/util/db";

export const dynamic = "force-dynamic";

export async function GET() {
    try {
        const data = await prisma.pets.findMany({
            include: {
                owner: true,
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

export async function DELETE(req: Request | NextRequest) {
    try {
        console.log("client: DELETE");

        // Parse the URL from the request
        const url = new URL(req.url);

        // Extract the `id` parameter from the URL
        const id = parseInt(url.searchParams.get("id") ?? "");

        if (!id) throw "Bad id!";

        const res = await prisma.pets.delete({
            where: {
                id,
            },
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
