import { SpaceBetween } from "@/components/styled";
import useAuth from "@/hooks/useAuth";
import { Logout } from "@mui/icons-material";
import { Avatar, Box, IconButton, Stack, Typography } from "@mui/material";

const VetBadge = (
    <Box
        px={1}
        border="1px solid"
        borderColor="success.dark"
        borderRadius="10px"
        bgcolor="success.light"
    >
        <Typography color="success.dark">VET</Typography>
    </Box>
);

const NavAccount = () => {
    const { logout, user } = useAuth();

    return (
        <SpaceBetween alignItems="center" p={2} borderTop="1px solid #ddd">
            <Stack>
                <Stack direction="row" alignItems="center" spacing={1}>
                    <Avatar src={user?.avatar || ""} />
                    {user?.type === "VET" ? VetBadge : null}
                </Stack>
                <Typography variant="button">{user?.email}</Typography>
            </Stack>

            <IconButton onClick={logout}>
                <Logout />
            </IconButton>
        </SpaceBetween>
    );
};

export default NavAccount;
