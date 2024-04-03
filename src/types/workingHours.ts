import IUser from "./user";

interface IVetWorkingHours {
    monday: [number, number];
    tuesday: [number, number];
    wednesday: [number, number];
    thursday: [number, number];
    friday: [number, number];

    vet: IUser;
}

export default IVetWorkingHours;
