"use client";

import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

interface OnlyVetGuardProps {
    children: ReactNode;
}

const OnlyVetGuard = ({ children }: OnlyVetGuardProps) => {
    const auth = useAuth();
    const router = useRouter();

    if (auth.user?.type !== "VET") {
        router.push("/pets");
        return null;
    }

    return <>{children}</>;
};

export default OnlyVetGuard;
