"use client";

import useDialog from "@/hooks/useDialog";
import Fab from "@mui/material/Fab";
import {
    cloneElement,
    FC,
    isValidElement,
    ReactElement,
    ReactNode,
} from "react";
import AddIcon from "@mui/icons-material/Add";
import { styled } from "@mui/material/styles";
import { DialogProps } from "./types";

const FixedFab = styled(Fab)({
    position: "absolute",
    top: "75px",
    right: "10px",
});

interface DialogChildProps extends DialogProps {
    open?: boolean;
    onClose?: VoidFunction;
}

interface DialogFabProps {
    children: ReactNode;
}

const DialogFab: FC<DialogFabProps> = ({ children }) => {
    const [isOpen, openDialog, closeDialog] = useDialog();

    if (!isValidElement(children)) throw "Must only pass one element!";

    const childWithProps = cloneElement(
        children as ReactElement<DialogChildProps>,
        {
            open: isOpen,
            onClose: closeDialog,
        },
    );

    return (
        <>
            <FixedFab color="primary" onClick={openDialog}>
                <AddIcon />
            </FixedFab>

            {isOpen ? childWithProps : null}
        </>
    );
};

export default DialogFab;
