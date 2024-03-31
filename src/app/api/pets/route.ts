import { NextRequest, NextResponse } from "next/server";
import prisma from "../_util/db";

export async function GET(req: Request | NextRequest) {
    try {
        console.log("clients: GET!");

        // Parse the URL from the request
        const url = new URL(req.url);

        const search = url.searchParams.get("search") ?? "";
        // const pageSize = parseInt(url.searchParams.get("pageSize") ?? "") || 5;
        // const page = parseInt(url.searchParams.get("page") ?? "") || 0;
        // const pageOrder = url.searchParams.get("pageOrder") ?? "desc";

        const data = await prisma.pets.findMany({
            where: {
                name: {
                    contains: search,
                },
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

export async function POST(req: Request | NextRequest) {
    try {
        console.log("clients: POST");

        const body = await req.json();

        await prisma.pets.create({
            data: body,
        });

        return new NextResponse(JSON.stringify({ message: "success" }), {
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

        await prisma.pets.delete({
            where: {
                id,
            },
        });

        return new NextResponse(JSON.stringify({ message: "success" }), {
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
        console.log("clients: PUT");

        const { id, ...body } = await req.json();

        await prisma.pets.update({
            where: {
                id,
            },
            data: body,
        });

        return new NextResponse(JSON.stringify({ message: "success" }), {
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
