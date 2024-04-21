"use client";

import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

interface CorrectEntryUrlProps {
    children: ReactNode;
}

const CorrectEntryUrl = ({ children }: CorrectEntryUrlProps) => {
    const auth = useAuth();
    const router = useRouter();
    const [done, setDone] = useState(false);

    useEffect(() => {
        if (!auth.isAuthenticated) {
            setDone(false);
            return;
        }

        const navigate = async () => {
            if (auth.user?.type === "VET") {
                await router.push("/appointments");
            }
            if (auth.user?.type === "USER") {
                await router.push("/pets");
            }
        };

        navigate();

        setDone(true);
    }, [auth.isAuthenticated]);

    return <>{done ? children : null}</>;
};

export default CorrectEntryUrl;
