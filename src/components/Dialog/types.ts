import { DialogProps as MuiDialogProps } from "@mui/material";
import { ReactNode } from "react";

export type DialogProps = {
    title?: ReactNode;
    content?: ReactNode;
    actions?: ReactNode;
    submit?: boolean; // support <form> mode
} & Omit<MuiDialogProps, "title" | "content" | "open" | "onClose">;
