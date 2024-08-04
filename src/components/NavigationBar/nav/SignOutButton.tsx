"use client";

import IconButton from "@mui/material/IconButton";
import LogoutIcon from "@mui/icons-material/Logout";
import { signOut } from "next-auth/react";

const SignOutButton = () => (
    <IconButton onClick={() => signOut()}>
        <LogoutIcon />
    </IconButton>
);

export default SignOutButton;
