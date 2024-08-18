import { DialogProps as MuiDialogProps } from "@mui/material";
import { ReactNode } from "react";

export type DialogProps = {
    open?: boolean;
    title?: ReactNode;
    content?: ReactNode;
    actions?: ReactNode;
    submit?: boolean; // support <form> mode
    onClose?: VoidFunction;
} & Omit<MuiDialogProps, "title" | "content" | "open" | "onClose">;

export interface DialogFormProps
    extends Omit<DialogProps, "submit" | "onSubmit"> {
    schema: any;
    values: any;
    submitAction: (t: any) => void; // action
}
