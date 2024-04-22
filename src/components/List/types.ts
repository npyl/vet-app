import { ListItemProps as MuiListItemProps } from "@mui/material";
import { ReactNode } from "react";

export type Direction = "horizontal" | "vertical";

interface ListItemProps extends MuiListItemProps {
    align?: Direction;

    label: string;
    value?: any | null;

    labelNode?: ReactNode; // INFO: instead of label
}

export default ListItemProps;
