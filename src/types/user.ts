export type UserType = "VET" | "USER";

// INFO: can be a vet or a normal user
type IUser = {
    email: string;
    avatar: string;
    type: UserType;
};

export default IUser;
