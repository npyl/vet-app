import IUser from "@/types/user";
import { IVetWorkingHours, IVetWorkingHoursPOST } from "@/types/workingHours";

const mapper = (from: IVetWorkingHoursPOST, vet: IUser): IVetWorkingHours => ({
    id: from.id!,
    monday: from.monday as [number, number],
    tuesday: from.tuesday as [number, number],
    wednesday: from.wednesday as [number, number],
    thursday: from.thursday as [number, number],
    friday: from.friday as [number, number],
    vet,
});

export default mapper;
