"use client";

import { VetBadge } from "@/components/Badge";
import IUser from "@/types/user";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import useSWR from "swr";
import { useParams } from "next/navigation";
import Office from "./Office";
import WorkingHours from "./WorkingHours";
import ProfileSkeleton from "./Skeleton";

const Profile = () => {
    const { id } = useParams();

    const { data: user, isLoading } = useSWR<IUser>(
        id ? `/api/user/${id}` : null,
    );

    if (isLoading) {
        return <ProfileSkeleton />;
    }

    return (
        <Container maxWidth="md">
            <Paper
                elevation={20}
                sx={{
                    mt: 2,
                    position: "relative",
                    border: "1px solid #eee",
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
                {user?.type === "VET" ? (
                    <>
                        <Divider />
                        <Office d={user?.workplace} />
                        <Divider />
                        <WorkingHours d={user?.workingHours} />
                    </>
                ) : null}
            </Paper>
        </Container>
    );
};

export default Profile;
