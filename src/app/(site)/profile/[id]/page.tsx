import VetBadge from "@/components/VetBadge";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import prisma from "@/util/db";
import IUser from "@/types/user";
import NextPageProps from "@/types/NextPageProps";
// ...
import Office from "./Office";
import WorkingHours from "./WorkingHours";
import PersonalInfo from "./Personal";
import WithAuth from "@/guards/WithAuth";

const getUserById = async (id: number) => {
    const user = await prisma.user.findUnique({
        where: {
            id,
        },
        include: {
            workplace: true,
            workingHours: true,
        },
    });

    return user as unknown as IUser;
};

const Profile: React.FC<NextPageProps> = async ({ params }) => {
    const { id } = params;

    const user = await getUserById(+id);

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
                <PersonalInfo
                    firstName={user?.firstName || ""}
                    lastName={user?.lastName || ""}
                />
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

export default WithAuth(Profile);
