import {
    GridRowParams,
    GridSortDirection,
    GridSortModel,
} from "@mui/x-data-grid";
import { FC, useCallback, useEffect, useState } from "react";
import { StyledDataGrid } from "./styles";
import GridProps from "./types";
import { useRouter } from "next/navigation";

const DataGridTable: FC<GridProps> = ({
    rows,
    columns,

    sortingBy,
    sortingOrder,

    page,
    pageSize,
    totalRows,
    onPaginationModelChange,

    ...other
}) => {
    const router = useRouter();

    const [sortModel, setSortModel] = useState<GridSortModel>([]);

    useEffect(() => {
        setSortModel([
            { field: sortingBy || "", sort: sortingOrder as GridSortDirection },
        ]);
    }, [sortingBy, sortingOrder]);

    const handleSortChange = useCallback(
        (newSortModel: any) => setSortModel(newSortModel),
        [],
    );

    const handleRowClick = useCallback(
        (e: GridRowParams) => router.push(`/${other.resource}/${e.row.id}`),
        [other.resource],
    );

    return (
        <StyledDataGrid
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
            onPaginationModelChange={onPaginationModelChange}
            // ------------------
            disableColumnFilter
            disableDensitySelector
            rowHeight={100}
            getRowId={(e) => e.id}
            // checkboxSelection
            autoHeight
            disableRowSelectionOnClick
            sortModel={sortModel}
            onSortModelChange={handleSortChange}
            rows={rows}
            columns={columns}
            pageSizeOptions={[25, 50, 100]}
            // ...
            onRowClick={handleRowClick}
            {...other}
        />
    );
};

export default DataGridTable;
