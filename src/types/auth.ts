export type ILoginReq = {
    email: string;
    password: string;
};
export type IRegisterReq = {
    avatar: string;
} & ILoginReq;

export type IAuthRes = {
    token: string;
};
