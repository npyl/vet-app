import {
    Stack,
    Dialog as MuiDialog,
    DialogActions as MuiDialogActions,
    DialogProps as MuiDialogProps,
    DialogContent,
    DialogTitle as MuiDialogTitle,
    IconButton as MuiIconButton,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { ReactNode, forwardRef } from "react";
import Iconify from "@/components/iconify";

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

type Props = {
    title?: ReactNode;
    content?: ReactNode;
    actions?: ReactNode;
    submit?: boolean; // support <form> mode
    onClose: () => void;
} & Omit<MuiDialogProps, "title" | "content">;

const Dialog = ({
    open,
    submit = false,
    title,
    actions,
    content,
    onClose,
    ...props
}: Props) =>
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
