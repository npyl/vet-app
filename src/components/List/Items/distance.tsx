import type { FC } from "react";
import ListItemProps from "../types";
import ListItem from "../item";

const DistanceListItem: FC<ListItemProps> = ({ value, ...props }) => (
    <ListItem
        value={
            value
                ? value >= 1000
                    ? `${(value / 1000).toFixed(1)} km`
                    : `${value} m`
                : ""
        }
        {...props}
    />
);

export default DistanceListItem;
