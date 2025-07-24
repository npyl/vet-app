"use server";

import { signIn } from "@/Auth";

export default async function userLogin() {
    await signIn("credentials", {
        email: "tester@example.com",
        password: "tester",
        redirect: true,
        redirectTo: "/",
    });
}
