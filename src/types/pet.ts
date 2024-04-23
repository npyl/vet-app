import IUser from "./user";

export type IPetGender = "MALE" | "FEMALE";

export interface IPet {
    id: number;
    name: string;
    photo: string;
    age: number;
    weight: number;
    gender: IPetGender;
    type: string;
    race: string;
    birthday: string;
    color: string;
    secondary_color: string;
    // ---------------------
    microchip_date: string;
    microchip_code: string;
    // ---------------------
    neutered: boolean;
    dead: boolean;
    blood_type: string;
    passport: boolean;
    // ---------------------
    owner: IUser;
}

export interface IPetPOST extends Omit<IPet, "id" | "owner"> {
    id?: number;
    ownerId: number;
}
