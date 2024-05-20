import { UserType } from "./user";
import { IVetWorkingHoursPOST } from "./workingHours";

export type ILoginReq = {
    email: string;
    password: string;
    type: UserType;
};

export type IRegisterReq = {
    avatar?: string;

    firstName: string;
    lastName: string;

    // --- VET SPECIFIC ---

    region?: string;
    city?: string;
    complex?: string;

    telephone?: string;
    afm?: string;

    workingHours?: IVetWorkingHoursPOST;
} & ILoginReq;

export type IAuthRes = {
    token: string;
};
