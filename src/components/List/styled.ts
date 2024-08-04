"use client";

import { ListItem as MuiListItem } from "@mui/material";
import type { ListItemTextProps } from "@mui/material";
import { ListItemText } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Direction } from "./types";

const StyledListItem = styled(MuiListItem)(({ theme }) => ({
    flex: 1,
    "&:nth-of-type(odd)": {
        background:
            theme.palette.mode === "dark"
                ? theme.palette.neutral?.[900]
                : theme.palette.background.paper,
    },
    "&:nth-of-type(even)": {
        background:
            theme.palette.mode === "dark"
                ? theme.palette.neutral?.[800]
                : theme.palette.grey[50],
    },
}));

interface CustomProps extends ListItemTextProps {
    align?: Direction;
}

const CustomListItemText = styled(ListItemText)<CustomProps>(({ align }) => ({
    display: "flex",
    // horizontal vs. vertical mode
    ...(align === "horizontal"
        ? {
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
          }
        : {}),
}));

export { StyledListItem, CustomListItemText };
