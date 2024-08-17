import { SpaceBetween } from "@/components/styled";
import { Typography } from "@mui/material";
import Table from "./Table";
import AddPetDialog from "./AddOrEdit";
import DialogFab from "@/components/Dialog/Fab";
import getPets from "./getPets";

export default function PetsPage() {
    const pets = getPets();

    return (
        <>
            <SpaceBetween alignItems="center" py={2}>
                <Typography variant="h4">Pets</Typography>
            </SpaceBetween>

            <Table rowsPromise={pets} />

            {/* Dialog */}
            <DialogFab>
                <AddPetDialog />
            </DialogFab>
        </>
    );
}
