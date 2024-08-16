import { getProfile } from "@/Auth";
import prisma from "@/util/db";
import { IAppointment } from "@/types/appointment";
import dayjs from "dayjs";

const todayStart = dayjs().startOf("day").toISOString();

const getUpcomingAppointments = async () => {
    const user = await getProfile({});
    if (!user) throw "Error getting user!";

    // This user's pets
    const pets = await prisma.pets.findMany({
        where: {
            ownerId: {
                equals: user.id,
            },
        },
        include: {
            appointments: {
                where: {
                    // Today and future
                    date: {
                        gte: todayStart,
                    },
                },
                include: {
                    pet: true,
                    vet: true,
                },
            },
        },
    });
    if (!Array.isArray(pets))
        throw {
            errorMessage: "Pets is not an array",
        };

    // Get appointments
    const appointments = pets.map(({ appointments }) => appointments).flat();
    if (!Array.isArray(appointments)) throw "Could not find appointments!";

    return appointments as unknown as IAppointment[];
};

export default getUpcomingAppointments;
