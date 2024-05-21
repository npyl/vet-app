import { PaginationProps as MuiPaginationProps } from "@mui/material/Pagination";
import React, { useMemo } from "react";
import { ReactNode } from "react";
import StyledPagination from "./styled";
import Box from "@mui/material/Box";

interface PaginationProps<C extends React.ElementType>
    extends Omit<MuiPaginationProps, "page"> {
    pageSize: number;
    page: number;
    children: ReactNode;
    Container?: C;
    ContainerProps?: React.ComponentProps<C>;
}

const Pagination = <C extends React.ElementType = "div">({
    children,
    Container,
    pageSize,
    ContainerProps,
    ...props
}: PaginationProps<C>) => {
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
            <Box component={Container} {...ContainerProps}>
                {displayItems}
            </Box>

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
