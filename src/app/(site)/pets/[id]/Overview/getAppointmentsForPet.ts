import { IAppointment } from "@/types/appointment";
import prisma from "@/util/db";

const getAppointmentsForPet = async (petId: number) => {
    return (await prisma.appointment.findMany({
        where: {
            petId: {
                equals: petId,
            },
        },
        include: {
            vet: true,
            pet: true,
        },
    })) as unknown as IAppointment[];
};

export default getAppointmentsForPet;
