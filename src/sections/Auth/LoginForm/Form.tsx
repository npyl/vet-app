"use client";

import { signIn } from "next-auth/react";

import { FormEvent, PropsWithChildren, useCallback } from "react";

const Form: React.FC<PropsWithChildren> = ({ children }) => {
    const handleSubmit = useCallback(async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = e.target as HTMLFormElement;

        await signIn("credentials", {
            redirect: false,
            email: form.email.value,
            password: form.password.value,
        });
    }, []);

    return (
        <form method="POST" onSubmit={handleSubmit}>
            {children}
        </form>
    );
};

export default Form;
