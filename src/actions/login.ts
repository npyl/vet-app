"use server";

import { signIn } from "@/Auth";

const login = async (email: string, password: string) => {
    await signIn("credentials", {
        email,
        password,
        redirect: true,
        redirectTo: "/",
    });
};

export default login;
