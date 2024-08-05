import { FC } from "react";
import { StyledDataGrid } from "./styles";
import GridProps from "./types";
import { GridRow, GridRowProps } from "@mui/x-data-grid";
import MuiLink from "@mui/material/Link";

interface CustomRowProps extends GridRowProps {
    resource: string;
}

const CustomRow = ({ resource, ...props }: CustomRowProps) => (
    <MuiLink href={resource ? `/${resource}/${props.row?.id}` : "#"}>
        <GridRow {...props} />
    </MuiLink>
);

const DataGridTable: FC<GridProps> = ({
    rows,
    columns,

    resource,

    page,
    pageSize,
    totalRows,

    ...other
}) => (
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
        paginationMode="server"
        rowCount={totalRows}
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
