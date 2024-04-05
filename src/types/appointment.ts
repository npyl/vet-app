import { IPet } from "./pet";
import IUser from "./user";

export interface IAppointmentPOST {
    id?: number;

    vetId: number;
    petId: number;

    date: string;
}

export interface IAppointment {
    id: number;

    vet: IUser;
    pet: IPet;

    date: string;
}
