import { ListProps, List as MuiList } from "@mui/material";
import type { FC, ReactNode } from "react";

interface BaseListProps extends ListProps {
    children: ReactNode;
}

const List: FC<BaseListProps> = ({ children, ...props }) => (
    <MuiList disablePadding {...props}>
        {children}
    </MuiList>
);

export default List;
