import { List as MuiList } from "@mui/material";
import type { FC, ReactNode } from "react";

interface BaseListProps {
    children: ReactNode;
}

const List: FC<BaseListProps> = (props) => {
    const { children } = props;

    return <MuiList disablePadding>{children}</MuiList>;
};

export default List;
