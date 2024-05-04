// react
import { useMemo } from "react";
// misc
import DataGrid from "../DataGrid";
import GridProps from "../types";
import getCOLUMNS from "./columns";

interface StockDataGridProps
    extends Omit<
        GridProps,
        "columns" | "paginationMode" | "sortingBy" | "sortingOrder" | "resource"
    > {
    onEditClick: (id: number) => void;
    onDeleteClick: (id: number) => void;
}

const StockDataGrid = ({
    onEditClick,
    onDeleteClick,
    ...props
}: StockDataGridProps) => {
    const COLUMNS = useMemo(() => getCOLUMNS(onEditClick, onDeleteClick), []);

    return (
        <DataGrid
            // ...
            columns={COLUMNS}
            paginationMode="client"
            sortingBy=""
            sortingOrder=""
            // ...
            resource="logistics"
            {...props}
        />
    );
};

export default StockDataGrid;
