import { IVetWorkingHours } from "./workingHours";

export type UserType = "VET" | "USER";

// INFO: can be a vet or a normal user
type IUser = {
    id: number;
    email: string;
    avatar: string;
    type: UserType;

    // misc information
    workplace?: IUserWorkplace;
    workingHours?: IVetWorkingHours;
};

export type IUserWorkplace = {
    id: number;

    region: string;
    city: string;
    complex: string;

    telephone: string;
    afm: string;

    user: IUser;
};

export default IUser;
