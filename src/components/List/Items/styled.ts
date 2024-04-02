"use client";

import { Avatar, Button } from "@mui/material";
import { styled } from "@mui/material/styles";

export const CustomAvatar = styled(Avatar)(({ theme }) => ({
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.grey?.[900],
    width: 20,
    height: 20,
}));

export const CustomButton = styled(Button)(({ theme }) => ({
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "space-between",
    height: "auto",

    // INFO: appears better to my eyes.
    marginRight: theme.spacing(-1),

    paddingTop: theme.spacing(0),
    paddingBottom: theme.spacing(0),
    paddingLeft: theme.spacing(0.1),
    paddingRight: theme.spacing(0.5),

    borderRadius: "12px",
    borderColor: "transparent",

    color: theme.palette.text.primary,

    backgroundColor:
        theme.palette.mode === "dark"
            ? theme.palette.neutral?.[700]
            : theme.palette.neutral?.[200],

    gap: theme.spacing(1),

    "&:active": {
        borderColor: theme.palette.primary.main,
    },
}));
