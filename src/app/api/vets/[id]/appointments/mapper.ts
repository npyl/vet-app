import IUser from "@/types/user";
import { IAppointment, IAppointmentPOST } from "@/types/appointment";
import { IPet } from "@/types/pet";
import { IExaminationHistory } from "@/types/examination";

const mapper = (
    from: IAppointmentPOST,
    vet: IUser,
    pet: IPet,
    examination?: IExaminationHistory,
): IAppointment => ({
    id: from.id!,
    date: from.date,
    vet,
    pet,
    examination,
});

export default mapper;
