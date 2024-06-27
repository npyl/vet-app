"use client";

import { useEffect, type FC, type ReactNode } from "react";
import useAuth from "@/hooks/useAuth";
import { usePathname, useRouter } from "next/navigation";
import DashboardLayout from "@/components/NavigationBar";

interface AuthGuardProps {
    children: ReactNode;
}

export const AuthGuard: FC<AuthGuardProps> = ({ children }) => {
    const router = useRouter();
    const pathname = usePathname();
    const { isAuthenticated } = useAuth();

    useEffect(() => {
        if (isAuthenticated) return;
        router.replace("/login");
    }, [isAuthenticated]);

    // !Authenticated
    if (!isAuthenticated && pathname !== "/login" && pathname !== "/register")
        return null;
    // !Authenticated + Login/Register
    if (!isAuthenticated) return <>{children}</>;

    // Authenticated state but still haven't finished loading normal page (=> hide login/register for a bit)
    if (pathname === "/login" || pathname === "/register") return null;

    return <DashboardLayout>{children}</DashboardLayout>;
};
