import getProfile from "@/util/getProfile";
import prisma from "@/util/db";
import { IMedication } from "@/types/medication";

const getCurrentMedication = async () => {
    const user = await getProfile();

    const medication = await prisma.medication.findMany({
        where: {
            doctorExamination: {
                appointment: {
                    pet: {
                        ownerId: user?.id,
                    },
                },
            },
        },
    });

    return medication as unknown as IMedication[];
};

export default getCurrentMedication;
