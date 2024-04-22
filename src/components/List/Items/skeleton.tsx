import type { FC } from "react";
import ListItemProps from "../types";
import ListItem from "../item";
import { Skeleton } from "@mui/material";

interface SkeletonListItemProps
    extends Omit<ListItemProps, "label" | "value"> {}

const SkeletonListItem: FC<SkeletonListItemProps> = (props) => (
    <ListItem
        label=""
        labelNode={<Skeleton variant="text" animation="wave" width="35%" />}
        {...props}
    >
        <Skeleton variant="text" animation="wave" width="20%" />
    </ListItem>
);

export default SkeletonListItem;
