"use client";

import {
    DialogActions as MuiDialogActions,
    DialogTitle as MuiDialogTitle,
    IconButton as MuiIconButton,
} from "@mui/material";
import { styled } from "@mui/material/styles";

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

export { DialogTitle, DialogActions, IconButton };
