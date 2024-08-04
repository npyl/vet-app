import VetBadge from "@/components/VetBadge";
import { SpaceBetween } from "@/components/styled";
import useAuth from "@/hooks/useAuth";
import { Logout } from "@mui/icons-material";
import { Avatar, IconButton, Stack, Typography, alpha } from "@mui/material";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { signOut } from "next-auth/react";

const NavAccount = () => {
    const router = useRouter();
    const { user } = useAuth();

    const gotoProfile = useCallback(
        () => router.push(`/profile/${user?.id}`),
        [],
    );

    return (
        <SpaceBetween
            alignItems="center"
            p={2}
            borderTop="1px solid"
            borderColor={(theme) => alpha(theme.palette.primary.main, 0.5)}
        >
            <Stack
                sx={{
                    borderRadius: "15px",
                    "&:hover": {
                        cursor: "pointer",
                        backgroundColor: (theme) =>
                            alpha(theme.palette.primary.main, 0.3),
                        color: "primary.main",
                    },
                    p: 1,
                }}
                onClick={gotoProfile}
            >
                <Stack direction="row" alignItems="center" spacing={1}>
                    <Avatar src={user?.avatar || ""} />
                    {user?.type === "VET" ? <VetBadge /> : null}
                </Stack>
                <Typography variant="button">{user?.email}</Typography>
            </Stack>

            <IconButton onClick={() => signOut()}>
                <Logout />
            </IconButton>
        </SpaceBetween>
    );
};

export default NavAccount;
