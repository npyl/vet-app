import { Stack, Dialog as MuiDialog, DialogContent } from "@mui/material";
import { FC, forwardRef } from "react";
import Iconify from "@/components/iconify";
import { DialogProps } from "./types";
import { DialogActions, DialogTitle, IconButton } from "./styled";

const DialogForm = forwardRef<HTMLFormElement>((props, ref) => (
    <form ref={ref} {...props} method="POST" />
));

const Dialog: FC<DialogProps> = ({
    open,
    submit = false,
    title,
    actions,
    content,
    onClose,
    ...props
}) =>
    !open ? null : (
        <MuiDialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="sm"
            PaperProps={{
                sx: {
                    pb: 4,
                },
            }}
            // INFO: make the dialog work as a <form> component
            component={submit ? DialogForm : undefined}
            // ...
            {...props}
        >
            <DialogTitle>
                <IconButton onClick={onClose}>
                    <Iconify icon="line-md:close" />
                </IconButton>
                <Stack alignItems="center" mt={1}>
                    {title}
                </Stack>
            </DialogTitle>
            <DialogContent>{content}</DialogContent>
            <DialogActions>{actions}</DialogActions>
        </MuiDialog>
    );

export default Dialog;
