import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../_util/db";
import { IAppointmentPOST } from "@/types/appointment";
import mapper from "./mapper";
import { IPet } from "@/types/pet";
import IUser from "@/types/user";
import { IExaminationHistory } from "@/types/examination";

export const dynamic = "force-dynamic";

interface Props {
    params: { id: number };
}

const getPetById = async (petId: number): Promise<IPet> => {
    const res = await prisma.pets.findMany({
        where: {
            id: {
                equals: petId,
            },
        },
    });
    if (!Array.isArray(res) || !(res.length > 0))
        throw "Could not find pet with this id";

    const owner = (await prisma.user.findUnique({
        where: {
            id: res[0].ownerId,
        },
    })) as IUser;
    if (!owner) throw "Did not find owner of this pet.";

    return { ...res[0], owner } as IPet;
};

const getDoctorExamination = async (
    id: number,
): Promise<IExaminationHistory> => {
    const res = await prisma.doctorExamination.findMany({
        where: {
            id: {
                equals: id,
            },
        },
    });

    if (!Array.isArray(res) || res.length !== 1)
        throw {
            errorMessage: "Could not find this doctor examination",
        };

    return res[0];
};

//
//  Receive a vet's appointments
//
export async function GET(req: Request | NextRequest, { params }: Props) {
    try {
        // INFO: get user id
        const { id } = params || {};
        if (!id) throw "Did not pass an id!";

        // Find user
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

        const res = await prisma.appointment.findMany({
            where: {
                vetId: {
                    equals: +id,
                },
            },
        });
        if (!Array.isArray(res) || res.length === 0)
            throw "Could not find this appointments record!";

        // Get all relevant pets (in same order as needed below in mapping)
        const pets = await Promise.all(
            res.map(({ petId }) => getPetById(petId)),
        );
        const examinations = await Promise.all(
            res.map(({ examinationId }) =>
                examinationId ? getDoctorExamination(examinationId) : undefined,
            ),
        );

        // Map Database object
        const result = res.map(
            (
                {
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    examinationId,
                    ...r
                },
                i,
            ) =>
                mapper(
                    r as IAppointmentPOST,
                    users[0] as IUser,
                    pets[i],
                    examinations[i],
                ),
        );

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
