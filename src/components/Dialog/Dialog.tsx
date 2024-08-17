import {
    Stack,
    Dialog as MuiDialog,
    DialogActions as MuiDialogActions,
    DialogContent,
    DialogTitle as MuiDialogTitle,
    IconButton as MuiIconButton,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { FC, forwardRef } from "react";
import Iconify from "@/components/iconify";
import { DialogProps } from "./types";

const DialogTitle = styled(MuiDialogTitle)({
    position: "relative",
    borderBottom: "1px solid #ddd",
});
const DialogActions = styled(MuiDialogActions)({
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
});
const IconButton = styled(MuiIconButton)(({ theme }) => ({
    position: "absolute",
    right: theme.spacing(2),
}));

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
