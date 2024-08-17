import { IPet } from "@/types/pet";
import prisma from "@/util/db";
import getProfile from "@/util/getProfile";

const getPets = async () => {
    const user = await getProfile();

    const petsForUserId = await prisma.pets.findMany({
        where: {
            ownerId: {
                equals: user?.id,
            },
        },
        include: {
            owner: true,
        },
    });

    return petsForUserId as unknown as IPet[];
};

export default getPets;
