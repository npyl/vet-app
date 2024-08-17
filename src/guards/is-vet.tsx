import getProfile from "@/util/getProfile";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

interface OnlyVetGuardProps {
    children: ReactNode;
}

const OnlyVetGuard = async ({ children }: OnlyVetGuardProps) => {
    const profile = await getProfile();

    if (profile?.type !== "VET") {
        redirect("/pets");
    }

    return <>{children}</>;
};

export default OnlyVetGuard;
