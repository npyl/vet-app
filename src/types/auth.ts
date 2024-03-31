import { UserType } from "./user";

export type ILoginReq = {
    email: string;
    password: string;
    type: UserType;
};

export type IRegisterReq = {
    avatar: string;
} & ILoginReq;

export type IAuthRes = {
    token: string;
};
