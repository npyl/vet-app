import IUser from "./user";

export interface IVetWorkingHours {
    id: number;

    monday: [number, number];
    tuesday: [number, number];
    wednesday: [number, number];
    thursday: [number, number];
    friday: [number, number];

    vet: IUser;
}

export interface IVetWorkingHoursPOST
    extends Omit<IVetWorkingHours, "id" | "vet"> {
    id?: number;
    vetId: number;
}
