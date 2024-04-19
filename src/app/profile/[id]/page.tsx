"use client";

import { VetBadge } from "@/components/Badge";
import IUser from "@/types/user";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useParams } from "next/navigation";
import useSWR from "swr";

const Profile = () => {
    const { id } = useParams();

    const { data: user } = useSWR<IUser>(id ? `/api/user/${id}` : null);

    return (
        <>
            <Paper
                elevation={10}
                sx={{
                    mt: 2,
                    position: "relative",
                }}
            >
                <Stack p={2} alignItems="center">
                    <Box position="relative">
                        <Avatar
                            src={user?.avatar || ""}
                            sx={{
                                height: "150px",
                                width: "150px",
                            }}
                        />

                        {user?.type === "VET" ? (
                            <VetBadge position="absolute" top={2} right={2} />
                        ) : null}
                    </Box>

                    <Typography variant="h6" flex={1} mt={1}>
                        {user?.email}
                    </Typography>
                </Stack>
                <Divider />
            </Paper>
        </>
    );
};

export default Profile;
