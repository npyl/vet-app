"use client";

import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { alpha, styled } from "@mui/material/styles";

export const SpaceBetween = styled(Stack)({
    flexDirection: "row",
    justifyContent: "space-between",
});

export const SoftAlert = styled(Alert)(({ theme }) => ({
    backgroundColor: alpha(theme.palette.primary.main, 0.3),
    color: theme.palette.primary.main,
    "& .MuiAlert-icon": {
        color: theme.palette.primary.main,
    },
}));
