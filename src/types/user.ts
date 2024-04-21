export type UserType = "VET" | "USER";

// INFO: can be a vet or a normal user
type IUser = {
    id: number;
    email: string;
    avatar: string;
    type: UserType;
};

export type IUserWorkplace = {
    id: number;

    region: string;
    city: string;
    complex: string;

    telephone: string;

    user: IUser;
};

export default IUser;
