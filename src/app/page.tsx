"use client";

import useAuth from "@/hooks/useAuth";

import VetDashboard from "./VetDashboard";
import UserDashboard from "./UserDashboard";

import Box from "@mui/material/Box";

export default function Home() {
    const { user } = useAuth();

    return (
        <Box py={1}>
            {user?.type === "VET" ? <VetDashboard /> : <UserDashboard />}
        </Box>
    );
}
