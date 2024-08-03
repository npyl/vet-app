"use server";

import { signIn } from "@/util/auth";

const handleSubmit = async (formData: FormData) => {
    await signIn?.("credentials", formData);
};

export default handleSubmit;
