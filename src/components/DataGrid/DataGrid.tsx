import EditNoteIcon from "@mui/icons-material/EditNote";
import { Button } from "@mui/material";
import {
    GridDeleteIcon,
    GridRowSelectionModel,
    GridSortDirection,
    GridSortModel,
    GridToolbarContainer,
} from "@mui/x-data-grid";
import { FC, useEffect, useState } from "react";
import { StyledDataGrid } from "./styles";
import GridProps from "./types";

const DataGridTable: FC<GridProps> = ({
    rows,
    columns,

    sortingBy,
    sortingOrder,

    page,
    pageSize,
    totalRows,
    onPaginationModelChange,

    onBulkDelete,
    onBulkEdit,

    ...other
}) => {
    const [selectedRows, setSelectedRows] = useState<GridRowSelectionModel>([]);
    const [sortModel, setSortModel] = useState<GridSortModel>([]);

    useEffect(() => {
        setSortModel([
            { field: sortingBy || "", sort: sortingOrder as GridSortDirection },
        ]);
    }, [sortingBy, sortingOrder]);

    const BulkEditButton = () => (
        <Button
            onClick={() => onBulkEdit?.(selectedRows)}
            startIcon={<EditNoteIcon />}
            sx={{ position: "absolute", right: 0, mr: 1, mt: 0.5 }}
        >
            {"Edit"}
        </Button>
    );

    const BulkDeleteButton = () => (
        <Button
            startIcon={<GridDeleteIcon />}
            onClick={() => onBulkDelete?.(selectedRows)}
        >
            {"Delete"}
        </Button>
    );

    const CustomToolbar = () => (
        <GridToolbarContainer>
            {selectedRows && selectedRows.length > 0 && (
                <>
                    {onBulkDelete && <BulkDeleteButton />}
                    {onBulkEdit && <BulkEditButton />}
                </>
            )}
        </GridToolbarContainer>
    );

    const handleSortChange = (newSortModel: any) => setSortModel(newSortModel);

    const handleRowSelectionChange = (model: GridRowSelectionModel) =>
        setSelectedRows(model);

    return (
        <>
            <StyledDataGrid
                slots={{
                    toolbar: CustomToolbar,
                }}
                localeText={{
                    toolbarColumns: "Fields",
                    MuiTablePagination: {
                        labelRowsPerPage: "Rows per page",
                    },
                }}
                sx={{
                    "& .MuiDataGrid-row": {
                        cursor: "pointer",
                    },
                }}
                // --- selection ---
                onRowSelectionModelChange={handleRowSelectionChange}
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
                checkboxSelection
                autoHeight
                disableRowSelectionOnClick
                sortModel={sortModel}
                onSortModelChange={handleSortChange}
                rows={rows}
                columns={columns}
                pageSizeOptions={[25, 50, 100]}
                // ...
                {...other}
            />
        </>
    );
};

export default DataGridTable;
