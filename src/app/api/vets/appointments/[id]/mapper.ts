import IUser from "@/types/user";
import { IAppointment, IAppointmentPOST } from "@/types/appointment";
import { IPet } from "@/types/pet";

const mapper = (
    from: IAppointmentPOST,
    vet: IUser,
    pet: IPet,
): IAppointment => ({
    id: from.id!,
    date: from.date,
    vet,
    pet,
});

export default mapper;
