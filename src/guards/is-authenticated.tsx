"use client";

import type { FC, ReactNode } from "react";
import useAuth from "@/hooks/useAuth";

interface AuthGuardProps {
    children: ReactNode;
    alternative: ReactNode;
}

export const AuthGuard: FC<AuthGuardProps> = ({ children, alternative }) => {
    const auth = useAuth();

    if (!auth.isAuthenticated) {
        return <>{alternative}</>;
    }

    return <>{children}</>;
};
