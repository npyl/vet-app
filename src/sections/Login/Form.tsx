"use client";

import login from "@/actions/login";
import { FormEvent, PropsWithChildren, useCallback } from "react";

const Form: React.FC<PropsWithChildren> = ({ children }) => {
    const handleSubmit = useCallback(async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const password = (e.target as HTMLFormElement).password.value || "";
        const email = (e.target as HTMLFormElement).email.value || "";

        await login(email, password);
    }, []);

    return (
        <form method="POST" onSubmit={handleSubmit}>
            {children}
        </form>
    );
};

export default Form;
