"use client";

import { FC } from "react";
import { StyledDataGrid } from "./styles";
import GridProps from "./types";
import { GridRow, GridRowProps } from "@mui/x-data-grid";
import MuiLink from "@mui/material/Link";
import Skeleton from "@mui/material/Skeleton";

interface CustomRowProps extends GridRowProps {
    resource: string;
}

const CustomRow = ({ resource, ...props }: CustomRowProps) => (
    <MuiLink href={resource ? `/${resource}/${props.row?.id}` : "#"}>
        <GridRow {...props} />
    </MuiLink>
);

//
//  Skeletons
//
const renderSkeletonCell = () => <Skeleton width={150} animation="wave" />;
const skeletonRows = Array.from({ length: 2 }, (_, index) => ({
    id: index + 1,
}));

const DataGridTable: FC<GridProps> = ({
    rows,
    columns,

    resource,

    page,
    pageSize,

    loading,

    ...other
}) =>
    loading ? (
        <StyledDataGrid
            rows={skeletonRows}
            columns={columns.map((c) => ({
                ...c,
                renderCell: renderSkeletonCell,
            }))}
            rowHeight={100}
        />
    ) : (
        <StyledDataGrid
            slots={{
                row: (props) => <CustomRow {...props} resource={resource} />,
            }}
            localeText={{
                toolbarColumns: "Fields",
                MuiTablePagination: {
                    labelRowsPerPage: "Rows per page",
                },
            }}
            // --- pagination ---
            paginationMode="client"
            paginationModel={{ page, pageSize }}
            // ------------------
            disableColumnFilter
            disableDensitySelector
            rowHeight={100}
            getRowId={(e) => e.id}
            // checkboxSelection
            autoHeight
            disableRowSelectionOnClick
            rows={rows}
            columns={columns}
            pageSizeOptions={[25, 50, 100]}
            // ...
            {...other}
        />
    );

export default DataGridTable;
