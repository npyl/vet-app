import { SpaceBetween } from "@/components/styled";
import { Typography } from "@mui/material";
import Table from "./Table";
import AddPetDialog from "./PetDialog";
import DialogFab from "@/components/Dialog/Fab";
import getPets from "./getPets";
import WithAuth from "@/guards/WithAuth";

function PetsPage() {
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

export default WithAuth(PetsPage);
