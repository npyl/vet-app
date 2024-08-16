import {
    DataGridProps,
    GridCallbackDetails,
    GridColDef,
    GridPaginationModel,
    GridRowSelectionModel,
    GridRowsProp,
} from "@mui/x-data-grid";

type GridProps = {
    rows: GridRowsProp;
    columns: GridColDef[];

    page: number;
    pageSize: number;
    onPaginationModelChange?: (
        model: GridPaginationModel,
        details: GridCallbackDetails,
    ) => void;

    onBulkDelete?: (selectedRows: GridRowSelectionModel) => void;
    onBulkEdit?: (selectedRows: GridRowSelectionModel) => void;

    resource: string;
} & DataGridProps;

export default GridProps;
