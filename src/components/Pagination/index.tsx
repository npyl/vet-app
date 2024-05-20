import { PaginationProps as MuiPaginationProps } from "@mui/material/Pagination";
import React, { useMemo } from "react";
import { ReactNode } from "react";
import StyledPagination from "./styled";
import Box from "@mui/material/Box";

interface PaginationProps extends Omit<MuiPaginationProps, "page"> {
    pageSize: number;
    Container?: React.ElementType;
    children: ReactNode;

    // force non-falsy
    page: number;
}

const Pagination: React.FC<PaginationProps> = ({
    children,
    Container = "div",
    pageSize,
    ...props
}) => {
    const totalItems = React.Children.count(children);
    const totalPages = Math.ceil(totalItems / pageSize);

    const displayItems = useMemo(
        () =>
            React.Children.toArray(children).slice(
                (props.page - 1) * pageSize,
                props.page * pageSize,
            ),
        [children, props.page, pageSize],
    );

    return (
        <>
            <Box component={Container}>{displayItems}</Box>

            <StyledPagination
                {...props}
                variant="outlined"
                color="primary"
                count={totalPages}
            />
        </>
    );
};

export default Pagination;
