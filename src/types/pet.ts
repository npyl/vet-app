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
    notes: string;
    therapy_notes: string;
    owner: IUser;
    // ---------------------
    examinationHistory: ExaminationHistory[];
}

export interface IPetPOST
    extends Omit<IPet, "id" | "owner" | "examinationHistory"> {
    id?: number;
    ownerId: number;
    examinationHistory: ExaminationHistoryPOST[];
}

export interface ExaminationHistory {
    id: number;

    date: string;

    findings: string;
    diagnosis: string;
    procedure: string;
    therapy: string;
    notes: string;

    weight: number;
    apot_swmatos: string;
    temperature: number;
    heartrate: number;
    CRT: string; // χρώμα βλεννογόνου / C.R.T.
    tummy: string; // ψιλάφηση κοιλιάς
    thorax: string;
    ears_eyes_mouth: string;
    lymphNodes: string;
    penis_vulva_breast: string;
}

export interface ExaminationHistoryPOST extends Omit<ExaminationHistory, "id"> {
    id?: number;
}
