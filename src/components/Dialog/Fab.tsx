"use client";

import useDialog from "@/hooks/useDialog";
import Fab from "@mui/material/Fab";
import { ComponentType } from "react";
import AddIcon from "@mui/icons-material/Add";
import { DialogProps } from "./types";
import { styled } from "@mui/material/styles";

const FixedFab = styled(Fab)({
    position: "absolute",
    top: "75px",
    right: "10px",
});

interface DialogFabProps<T extends DialogProps> {
    Dialog: ComponentType<T>;
    dialogProps?: Omit<T, keyof DialogProps>;
}

function DialogFab<T extends DialogProps>({
    Dialog,
    dialogProps,
}: DialogFabProps<T>) {
    const [isOpen, openDialog, closeDialog] = useDialog();

    return (
        <>
            <FixedFab color="primary" onClick={openDialog}>
                <AddIcon />
            </FixedFab>

            {isOpen ? (
                <Dialog
                    {...(dialogProps as T)}
                    open={isOpen}
                    onClose={closeDialog}
                />
            ) : null}
        </>
    );
}

export default DialogFab;
