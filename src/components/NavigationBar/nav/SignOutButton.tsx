"use client";
import LogoutIcon from "@mui/icons-material/Logout";
import logout from "@/actions/logout";
import { IconButton } from "@mui/material";

const SignOutButton = () => (
    <form action={logout}>
        <IconButton type="submit">
            <LogoutIcon sx={{ width: 20, height: 20 }} />
        </IconButton>
    </form>
);

export default SignOutButton;
