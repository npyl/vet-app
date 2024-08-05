// react
import { useMemo } from "react";
// misc
import DataGrid from "../DataGrid";
import GridProps from "../types";
import getCOLUMNS from "./columns";
import { usePathname } from "next/navigation";

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
    const isLogistics = usePathname() === "/logistics";

    const COLUMNS = useMemo(
        () => getCOLUMNS(isLogistics, onEditClick, onDeleteClick),
        [isLogistics],
    );

    return (
        <DataGrid
            // ...
            columns={COLUMNS}
            paginationMode="client"
            // ...
            resource="logistics"
            {...props}
        />
    );
};

export default StockDataGrid;
