"use server";

import { signIn } from "@/Auth";

export default async function vetLogin() {
    await signIn("credentials", {
        email: "vet@example.com",
        password: "vet",
        redirect: true,
        redirectTo: "/",
    });
}
