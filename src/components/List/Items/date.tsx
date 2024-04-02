import type { FC } from "react";
import ListItem from "../item";
import ListItemProps from "../types";

const ListDateItem: FC<ListItemProps> = ({ value, ...props }) => (
    <ListItem value={value ? new Date(value).toDateString() : "-"} {...props} />
);

export default ListDateItem;
