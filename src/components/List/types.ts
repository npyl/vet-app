import { ListItemProps as MuiListItemProps } from "@mui/material";

export type Direction = "horizontal" | "vertical";

interface ListItemProps extends MuiListItemProps {
    align?: Direction;
    label: string;
    value?: any | null;
}

export default ListItemProps;
