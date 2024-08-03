import { NextRequest, NextResponse } from "next/server";
import prisma from "@/util/db";
import { IProductPOST } from "@/types/products";
import { ProductType } from "@prisma/client";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
    try {
        const authorization = req.headers.get("Authorization");
        if (!authorization) throw "Did not receive authorization token";
        const token = authorization.split(" ")[1];
        if (!token) throw "Did not receive token";

        const url = new URL(req.url);
        const search = url.searchParams.get("search") ?? "";
        const type = (url.searchParams.get("selectedType") ?? "ALL") as
            | ProductType
            | "ALL";

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
                name: {
                    contains: search,
                },
                // Filter by type (if different than ALL)
                ...(type === "ALL"
                    ? {}
                    : {
                          type: {
                              equals: type as ProductType,
                          },
                      }),
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

export async function POST(req: NextRequest) {
    try {
        const authorization = req.headers.get("Authorization");
        if (!authorization) throw "Did not receive authorization token";
        const token = authorization.split(" ")[1];
        if (!token) throw "Did not receive token";

        // Get Body
        const body = (await req.json()) as IProductPOST;
        if (!body) throw { errorMessage: "Bad body!" };

        // First, get the user or userWorkplace ID from the User table
        const user = await prisma.user.findUnique({
            where: { token: token },
        });
        if (!user) throw "User not found with provided token";

        // Then, update the userWorkplace using the retrieved ID
        const data = await prisma.userWorkplace.update({
            where: {
                userId: user.id,
            },
            data: {
                products: {
                    create: body,
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

export async function PUT(req: NextRequest) {
    try {
        // Get Body
        const { id, ...body } = (await req.json()) as IProductPOST;
        if (!body) throw { errorMessage: "Bad body!" };

        const data = await prisma.product.update({
            where: {
                id,
            },
            data: body,
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

export async function DELETE(req: NextRequest) {
    try {
        const url = new URL(req.url);
        const id = url.searchParams.get("id") ?? "";
        if (!id)
            throw {
                errorMessage: "Bad id",
            };

        const data = await prisma.product.delete({
            where: {
                id: +id,
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
