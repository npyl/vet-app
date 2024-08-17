"use client";
import LogoutIcon from "@mui/icons-material/Logout";
import { signOut } from "next-auth/react";
import Stack from "@mui/material/Stack";

const SignOutButton = () => (
    <Stack
        alignItems="center"
        justifyContent="center"
        onClick={() => signOut()}
    >
        <LogoutIcon />
    </Stack>
);

export default SignOutButton;
