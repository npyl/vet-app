import { Typography } from "@mui/material";
import { StyledListItem, CustomListItemText } from "./styled";
import type { FC } from "react";
import ListItemProps from "./types";

// --------------------------------------------------------------------------------

const ListItem: FC<ListItemProps> = (props) => {
    const {
        align = "horizontal",
        children,
        disableGutters,
        // ...
        labelNode,
        // ...
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
                primary={
                    labelNode || (
                        <Typography variant="subtitle2">{label}</Typography>
                    )
                }
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
