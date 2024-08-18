import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import BookDialog from "./Book";
import getProfile from "@/util/getProfile";
import { Suspense } from "react";
import AppointmentsButtonSkeleton from "./AppointmentsButtonSkeleton";
import AppointmentsButton from "./AppointmentsButton";
import { ProfileSkeleton } from "@/components/Skeleton";
import PetProfile from "./PetProfile";
import EditButton from "./EditButton";
import AddOrEditDialog from "../../PetDialog";
import getPetById from "./getPetById";

interface OverviewProps {
    id: number;
}

const Overview = async ({ id }: OverviewProps) => {
    const user = await getProfile();
    const pet = await getPetById(id);

    const isVet = user?.type === "VET";

    return (
        <>
            <Container maxWidth="md">
                <Paper
                    elevation={10}
                    sx={{
                        mt: 2,
                        position: "relative",
                    }}
                >
                    <Stack
                        sx={{
                            position: "absolute",
                            top: 4,
                            right: 4,
                        }}
                        direction="row"
                        spacing={0.5}
                    >
                        <Suspense fallback={<AppointmentsButtonSkeleton />}>
                            <AppointmentsButton petId={id} vet={isVet}>
                                <BookDialog petId={id} />
                            </AppointmentsButton>
                        </Suspense>

                        <EditButton vet={isVet}>
                            <AddOrEditDialog pet={pet} />
                        </EditButton>
                    </Stack>

                    <Suspense fallback={<ProfileSkeleton />}>
                        <PetProfile petId={id} />
                    </Suspense>
                </Paper>
            </Container>
        </>
    );
};

export default Overview;
