"use client";

// react
import React, { use, useCallback, useState } from "react";
// misc
import StockDataGrid from "@/components/DataGrid/Stock";
import { IProduct } from "@/types/products";
import { GridPaginationModel } from "@mui/x-data-grid";
import Placeholder from "./Placeholder";

const PAGE_SIZE = 5;

interface Props {
    data: Promise<IProduct[]>;
}

const AlmostOutOfStock: React.FC<Props> = ({ data }) => {
    const [page, setPage] = useState(0);
    const handlePaginationChange = useCallback(
        ({ page }: GridPaginationModel) => setPage(page),
        [],
    );

    const almostOutOfStock = use(data);

    if (almostOutOfStock.length === 0) return <Placeholder />;

    return (
        <StockDataGrid
            columnHeaderHeight={0} // hide
            sx={{
                borderRadius: "0 0 10px 10px",
            }}
            // ...
            rows={almostOutOfStock}
            page={page}
            pageSize={PAGE_SIZE}
            onPaginationModelChange={handlePaginationChange}
            // ...
            onEditClick={() => {}}
            onDeleteClick={() => {}}
        />
    );
};

export default AlmostOutOfStock;
