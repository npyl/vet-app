"use client";

import { styled } from "@mui/material/styles";
import { ListItem as MuiListItem } from "@mui/material";

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

export default StyledListItem;
