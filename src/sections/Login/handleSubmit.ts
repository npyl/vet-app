"use server";

import { signIn } from "@/Auth";

const handleSubmit = async (formData: FormData) => {
    await signIn("credentials", formData);
};

export default handleSubmit;
