import IUser from "./user";

export type IPetGender = "MALE" | "FEMALE";
export type IPetType = "CAT" | "DOG";

export type IDogRace =
    | "Pitbull"
    | "Poodle"
    | "Pug"
    | "Maltese"
    | "Rottweiler"
    | "Schnauzer"
    | "Shih tzu"
    | "Siberian husky"
    | "Whippet"
    | "Yorkshire terrier"
    | "Pomeranian"
    | "Kangal";

export type ICatRace =
    | "persian"
    | "british longhair"
    | "balinese"
    | "Cymric"
    | "Japanese Bobtail Longhair"
    | "american curl longhair"
    | "mastiff"
    | "mastino napoletano"
    | "miniature Pinscher"
    | "Mudi";

export type IDogBloodType = "DEA 1.1 +" | "DEA 1.1 -" | "DEA 1.2";
export type ICatBloodType = "A" | "B" | "AB";

export interface IPet {
    id: number;
    name: string;
    photo: string;
    age: number;
    weight: number;
    gender: IPetGender;
    type: IPetType;
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
