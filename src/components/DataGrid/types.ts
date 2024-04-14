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

    sortingBy: string | null;
    sortingOrder: string | null;

    page: number;
    pageSize: number;
    totalRows?: number;
    onPaginationModelChange?: (
        model: GridPaginationModel,
        details: GridCallbackDetails,
    ) => void;

    onBulkDelete?: (selectedRows: GridRowSelectionModel) => void;
    onBulkEdit?: (selectedRows: GridRowSelectionModel) => void;

    resource?: string;
} & Omit<DataGridProps, "sortingOrder">;

export default GridProps;
