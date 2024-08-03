import IUser from "./user";

declare module "next-auth" {
    interface Session {
        user: IUser & {
            id: string;
            image: string;
        };
    }
}
