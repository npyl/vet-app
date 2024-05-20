"use client";

import useAuth from "@/hooks/useAuth";

import VetDashboard from "./VetDashboard";
import UserDashboard from "./UserDashboard";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function Home() {
    const { user } = useAuth();

    return (
        <Box py={1}>
            <Typography variant="h4" my={4} color="primary.main">
                Welcome {`${user?.firstName} ${user?.lastName}`}
            </Typography>

            {user?.type === "VET" ? <VetDashboard /> : <UserDashboard />}
        </Box>
    );
}
