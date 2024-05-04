"use client";

import useAuth from "@/hooks/useAuth";

import VetDashboard from "./VetDashboard";
import UserDashboard from "./UserDashboard";

export default function Home() {
    const { user } = useAuth();

    return user?.type === "VET" ? <VetDashboard /> : <UserDashboard />;
}
