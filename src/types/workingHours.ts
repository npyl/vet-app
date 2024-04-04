import IUser from "./user";

export interface IVetWorkingHoursPOST {
    id?: number;

    monday: [number, number];
    tuesday: [number, number];
    wednesday: [number, number];
    thursday: [number, number];
    friday: [number, number];

    vetId: number;
}

export interface IVetWorkingHours {
    id: number;

    monday: [number, number];
    tuesday: [number, number];
    wednesday: [number, number];
    thursday: [number, number];
    friday: [number, number];

    vet: IUser;
}
