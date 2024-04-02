import type { FC } from "react";
import ListItem from "../item";
import ClearIcon from "@mui/icons-material/Clear";
import DoneIcon from "@mui/icons-material/Done";
import ListItemProps from "../types";

interface ListBooleanItemProps extends Omit<ListItemProps, "value"> {
    status: boolean;
}

const ListBooleanItem: FC<ListBooleanItemProps> = ({ status, ...props }) => (
    <ListItem {...props}>
        {status ? (
            <DoneIcon sx={{ color: "success.main", fontSize: "inherit" }} />
        ) : (
            <ClearIcon sx={{ color: "error.main", fontSize: "inherit" }} />
        )}
    </ListItem>
);

export default ListBooleanItem;
