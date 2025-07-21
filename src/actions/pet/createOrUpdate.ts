"use server";

import { IPetPOST } from "@/types/pet";
import prisma from "@/util/db";
import getProfile from "@/util/getProfile";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const createOrUpdate = async ({ id, ownerId, ...d }: IPetPOST) => {
    const user = await getProfile();
    if (!user) throw "Could not get user!";

    if (!id) {
        await prisma.pets.create({
            data: { ownerId: user.id, ...d },
        });
    } else {
        await prisma.pets.update({
            where: {
                id,
            },
            data: { ownerId: ownerId ? ownerId : user.id, ...d },
        });
    }

    revalidatePath("/pets");
    redirect("/pets");
};

export default createOrUpdate;
