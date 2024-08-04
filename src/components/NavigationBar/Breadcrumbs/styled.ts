"use client";

import { alpha, styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";

const BreadcrumbStack = styled(Stack)(({ theme }) => ({
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing(1),
    width: "max-content",
    // ...
    backgroundColor: alpha(theme.palette.primary.main, 0.2),
    color: theme.palette.primary.main,
    borderRadius: "15px",
    // ...
    paddingTop: theme.spacing(0.5),
    paddingBottom: theme.spacing(0.5),
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
}));

export default BreadcrumbStack;
