import { Box, alpha } from "@mui/material";
import { styled } from "@mui/material/styles";
import Alert from "@mui/material/Alert";

export const Background = styled(Box)(({ theme }) => ({
    minHeight: "100vh",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: alpha(theme.palette.primary.main, 0.85),
}));

export const SoftAlert = styled(Alert)(({ theme }) => ({
    backgroundColor: alpha(theme.palette.primary.main, 0.3),
    color: theme.palette.primary.main,
    "& .MuiAlert-icon": {
        color: theme.palette.primary.main,
    },
}));
