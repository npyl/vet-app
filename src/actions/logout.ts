"use server";

import { signOut } from "@/Auth";

const logout = async () => {
    await signOut({ redirect: true, redirectTo: "/login" });
};

export default logout;
