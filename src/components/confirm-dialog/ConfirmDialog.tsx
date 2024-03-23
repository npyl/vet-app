// @mui
import {
    Dialog,
    Button,
    DialogTitle,
    DialogActions,
    DialogContent,
    Stack,
} from "@mui/material";
//
import { ConfirmDialogProps } from "./types";

// ----------------------------------------------------------------------

export default function ConfirmDialog({
    title,
    content,
    action,
    open,
    onClose,
    ...other
}: ConfirmDialogProps) {
    return (
        <Dialog
            fullWidth
            maxWidth="xs"
            open={open}
            onClose={onClose}
            {...other}
        >
            <DialogTitle>{title}</DialogTitle>

            {content && (
                <DialogContent sx={{ typography: "body2" }}>
                    {" "}
                    {content}{" "}
                </DialogContent>
            )}

            <DialogActions
                sx={{
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <Stack spacing={1} width="80%">
                    {action}

                    <Button
                        variant="outlined"
                        color="inherit"
                        onClick={onClose}
                    >
                        Cancel
                    </Button>
                </Stack>
            </DialogActions>
        </Dialog>
    );
}
