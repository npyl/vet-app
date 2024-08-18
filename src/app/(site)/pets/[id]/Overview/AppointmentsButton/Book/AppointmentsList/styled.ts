"use client";

import Stack from "@mui/material/Stack";
import { alpha, styled } from "@mui/material/styles";

const StyledList = styled(Stack)(({ theme }) => ({
    borderRadius: "15px",
    border: "1px solid",
    borderColor: alpha(theme.palette.primary.main, 0.4),
}));

export default StyledList;
