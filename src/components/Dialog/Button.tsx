"use client";

import useDialog from "@/hooks/useDialog";
import Button, { ButtonProps } from "@mui/material/Button";
import { cloneElement, isValidElement, ReactElement } from "react";

interface DialogButtonProps extends Omit<ButtonProps, "onClick"> {
    label: string;
}

const DialogButton = ({ label, children, ...props }: DialogButtonProps) => {
    const [isOpen, openDialog, closeDialog] = useDialog();

    if (!isValidElement(children)) throw "Must only pass one element!";

    const childWithProps = cloneElement(children as ReactElement<any>, {
        open: isOpen,
        onClose: closeDialog,
    });

    return (
        <>
            <Button onClick={openDialog} {...props}>
                {label}
            </Button>

            {isOpen ? childWithProps : null}
        </>
    );
};

export default DialogButton;
