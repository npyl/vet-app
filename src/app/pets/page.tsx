"use client";

import { SpaceBetween } from "@/components/styled";
import { Typography } from "@mui/material";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import useDialog from "@/hooks/useDialog";
import Table from "./Table";
import AddPetDialog from "./Dialogs/AddOrEdit";

export default function PetsPage() {
    const [isOpen, openDialog, closeDialog] = useDialog();

    return (
        <>
            <SpaceBetween alignItems="center" py={2}>
                <Typography variant="h4">Pets</Typography>

                <Fab color="primary" onClick={openDialog}>
                    <AddIcon />
                </Fab>
            </SpaceBetween>

            <Table />

            {/* Dialog */}
            {isOpen ? (
                <AddPetDialog open={isOpen} onClose={closeDialog} />
            ) : null}
        </>
    );
}
