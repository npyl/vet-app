import { IAppointment } from "@/types/appointment";
import prisma from "@/util/db";

const getAppointmentsForPetById = async (id: number) => {
    return (await prisma.appointment.findMany({
        where: {
            petId: {
                equals: +id,
            },
        },
        include: {
            vet: true,
            pet: true,
        },
    })) as unknown as IAppointment[];
};

export default getAppointmentsForPetById;
