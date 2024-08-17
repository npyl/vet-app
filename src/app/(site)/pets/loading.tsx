import { SpaceBetween } from "@/components/styled";
import { Typography } from "@mui/material";
import AddPetDialog from "./AddOrEdit";
import DialogFab from "@/components/Dialog/Fab";
import PetsTableSkeleton from "./Table/TableSkeleton";

export default function PetsPage() {
    return (
        <>
            <SpaceBetween alignItems="center" py={2}>
                <Typography variant="h4">Pets</Typography>
            </SpaceBetween>

            <PetsTableSkeleton />

            {/* Dialog */}
            <DialogFab Dialog={AddPetDialog} />
        </>
    );
}
