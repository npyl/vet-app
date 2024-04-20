import { IExaminationHistory } from "./examination";
import { IPet } from "./pet";
import IUser from "./user";

export interface IAppointment {
    id: number;

    vet: IUser;
    pet: IPet;

    date: string;

    examination?: IExaminationHistory;
}

export interface IAppointmentPOST
    extends Omit<IAppointment, "id" | "vet" | "pet" | "examination"> {
    id?: number;

    vetId: number;
    petId: number;

    examinationId: number;
}
