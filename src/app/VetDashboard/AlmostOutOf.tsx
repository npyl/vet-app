// react
import { useCallback, useMemo, useState } from "react";
// misc
import StockDataGrid from "@/components/DataGrid/Stock";
import { IProduct } from "@/types/products";
import { GridPaginationModel } from "@mui/x-data-grid";
import useSWR from "swr";

const PAGE_SIZE = 5;

const AlmostOutOfStock = () => {
    const [page, setPage] = useState(0);
    const handlePaginationChange = useCallback(
        ({ page }: GridPaginationModel) => setPage(page),
        [],
    );

    const { data, isLoading } = useSWR<IProduct[]>(`/api/stock`);
    const almostOutOfStock = useMemo(
        () =>
            Array.isArray(data)
                ? data.filter(({ stock }) => stock <= 20) // <= 20 items
                : [],
        [data],
    );

    return (
        <StockDataGrid
            loading={isLoading}
            // ...
            rows={almostOutOfStock}
            page={page}
            pageSize={PAGE_SIZE}
            totalRows={almostOutOfStock.length ?? 0}
            onPaginationModelChange={handlePaginationChange}
            // ...
            onEditClick={() => {}}
            onDeleteClick={() => {}}
        />
    );
};

export default AlmostOutOfStock;
