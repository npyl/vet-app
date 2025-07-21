"use server";

import { IAppointmentPOST } from "@/types/appointment";
import prisma from "@/util/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const createOrUpdate = async ({ id, ...d }: IAppointmentPOST) => {
    if (!id) {
        await prisma.appointment.create({
            data: d,
        });
    } else {
        await prisma.appointment.update({
            where: {
                id,
            },
            data: d,
        });
    }

    revalidatePath(`/pets/${d.petId}`);
    redirect(`/pets/${d.petId}`);
};

export default createOrUpdate;
