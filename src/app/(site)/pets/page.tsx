"use client";
import { SpaceBetween } from "@/components/styled";
import { Typography } from "@mui/material";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import useDialog from "@/hooks/useDialog";
import Table from "./Table";
import AddPetDialog from "./AddOrEdit";
import { useMemo } from "react";
import useAuth from "@/hooks/useAuth";
import useSWR from "swr";
import { IPet } from "@/types/pet";

const usePets = () => {
    const { user } = useAuth();

    const { data, isLoading, mutate } = useSWR<IPet[]>(
        user?.id ? `/api/user/${user.id}/pets` : null,
    );

    const pets = useMemo(
        () => (Array.isArray(data) && data.length > 0 ? data : []),
        [data],
    );

    return { pets, isLoading, mutate };
};

export default function PetsPage() {
    const { pets, isLoading, mutate } = usePets();

    const [isOpen, openDialog, closeDialog] = useDialog();

    return (
        <>
            <SpaceBetween alignItems="center" py={2}>
                <Typography variant="h4">Pets</Typography>

                <Fab color="primary" onClick={openDialog}>
                    <AddIcon />
                </Fab>
            </SpaceBetween>

            <Table rows={pets} isLoading={isLoading} />

            {/* Dialog */}
            {isOpen ? (
                <AddPetDialog
                    open={isOpen}
                    onMutate={mutate}
                    onClose={closeDialog}
                />
            ) : null}
        </>
    );
}
