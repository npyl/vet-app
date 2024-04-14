import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../_util/db";
import { IVetWorkingHoursPOST } from "@/types/workingHours";
import mapper from "./mapper";

export const dynamic = "force-dynamic";

interface Props {
    params: { id: number };
}

//
//  Receive a vet's working hours
//
export async function GET(req: Request | NextRequest, { params }: Props) {
    req;

    try {
        // INFO: get user id
        const { id } = params || {};
        if (!id) throw "Did not pass an id!";

        const users = await prisma.user.findMany({
            where: {
                id: {
                    equals: +id,
                },
            },
        });

        if (!Array.isArray(users) || users.length === 0)
            throw "Could not find this user!";
        if (users[0].type !== "VET") throw "Not a vet!";

        const res = await prisma.workingHours.findMany({
            where: {
                vetId: {
                    equals: +id,
                },
            },
        });
        if (!Array.isArray(res) || res.length === 0)
            throw "Could not find this workingHours record!";

        // Map Database object (IVetWorkingHoursPOST) to IVetWorkingHours
        const result = mapper(res[0] as IVetWorkingHoursPOST, users[0]);

        return new NextResponse(JSON.stringify(result), {
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
