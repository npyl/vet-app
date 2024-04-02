"use client";

import type { ListItemTextProps } from "@mui/material";
import { ListItemText, Typography } from "@mui/material";
import StyledListItem from "./styled";
import { styled } from "@mui/material/styles";
import type { FC } from "react";
import ListItemProps, { Direction } from "./types";

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

// --------------------------------------------------------------------------------

const ListItem: FC<ListItemProps> = (props) => {
    const {
        align = "horizontal",
        children,
        disableGutters,
        value,
        label,
        ...other
    } = props;

    return (
        <StyledListItem
            sx={{
                px: disableGutters ? 0 : 3,
            }}
            {...other}
        >
            <CustomListItemText
                align={align}
                disableTypography
                primary={<Typography variant="subtitle2">{label}</Typography>}
                secondary={
                    children || (
                        <Typography
                            color="text.secondary"
                            variant="body2"
                            textAlign="right"
                        >
                            {value?.toString() || ""}
                        </Typography>
                    )
                }
            />
        </StyledListItem>
    );
};

export default ListItem;
