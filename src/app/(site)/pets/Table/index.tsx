"use client";
import DataGrid from "@/components/DataGrid";
import { use, useCallback, useState } from "react";
import { IPet } from "@/types/pet";
import { GridPaginationModel } from "@mui/x-data-grid";
import COLUMNS from "./columns";

const PAGE_SIZE = 5;

interface PetsTableProps {
    rowsPromise: Promise<IPet[]>;
}

export default function PetsTable({ rowsPromise }: PetsTableProps) {
    const rows = use(rowsPromise);

    const [page, setPage] = useState(0);

    const handlePaginationChange = useCallback(
        ({ page }: GridPaginationModel) => setPage(page),
        [],
    );

    // -------------------------------------------------------------

    return (
        <DataGrid
            rows={rows}
            columns={COLUMNS}
            // ...
            paginationMode="client"
            page={page}
            pageSize={PAGE_SIZE}
            onPaginationModelChange={handlePaginationChange}
            // ...
            resource="pets"
        />
    );
}
