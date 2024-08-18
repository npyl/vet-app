import { IPet } from "@/types/pet";
import prisma from "@/util/db";

const getPetById = async (id: number) => {
    return (await prisma.pets.findUnique({
        where: {
            id,
        },
    })) as unknown as IPet;
};

export default getPetById;
