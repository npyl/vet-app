import { Box, Paper, alpha } from "@mui/material";
import { styled } from "@mui/material/styles";

export const Background = styled(Box)(({ theme }) => ({
    minHeight: "100vh",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: alpha(theme.palette.primary.main, 0.85),
}));

export const StyledPaper = styled(Paper)(({ theme }) => ({
    p: theme.spacing(5),
    borderRadius: "15px",
    position: "relative",
}));
