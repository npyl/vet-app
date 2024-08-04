"use client";

import { signIn } from "next-auth/react";
import { FormEvent, PropsWithChildren, useCallback } from "react";

const Form: React.FC<PropsWithChildren> = ({ children }) => {
    const handleSubmit = useCallback(async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await signIn("credentials", {
            email: (e.target as HTMLFormElement).email.value || "",
            password: (e.target as HTMLFormElement).password.value || "",
            redirect: false,
        });
    }, []);

    return (
        <form method="POST" onSubmit={handleSubmit}>
            {children}
        </form>
    );
};

export default Form;
