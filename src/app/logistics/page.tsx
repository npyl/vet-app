"use client";

import DataGrid from "@/components/DataGrid";
import { SpaceBetween } from "@/components/styled";
import { IProduct } from "@/types/products";
import { Fab, Skeleton, Stack, TextField, Typography } from "@mui/material";
import { GridColDef, GridPaginationModel } from "@mui/x-data-grid";
import { useCallback, useMemo, useState } from "react";
import useSWR from "swr";
import AddIcon from "@mui/icons-material/Add";
import useDialog from "@/hooks/useDialog";
import AddOrEditDialog from "./AddOrEdit";

const COLUMNS: GridColDef<IProduct>[] = [
    {
        field: "name",
        headerName: "Name",
        align: "center",
        headerAlign: "center",
    },
];

//
//  Skeletons
//
const renderSkeletonCell = () => <Skeleton width={150} animation="wave" />;
const skeletonRows = Array.from({ length: 2 }, (_, index) => ({
    id: index + 1,
}));

const PAGE_SIZE = 5;

// ---------------------------------------------------------------------------------------

const useGetStock = () => {
    const { data, isLoading, mutate } = useSWR<IProduct[]>("/api/stock");

    const { all, almostOutOfStock } = useMemo(
        () => ({
            all: Array.isArray(data) ? data : [],
            almostOutOfStock: Array.isArray(data)
                ? data.filter(({ stock }) => stock <= 20) // <= 20 items
                : [],
        }),
        [data],
    );

    return { all, almostOutOfStock, isLoading, mutate };
};

// ---------------------------------------------------------------------------------------

const Logistics = () => {
    const { all, almostOutOfStock, isLoading, mutate } = useGetStock();

    const [search, setSearch] = useState("");

    const [page, setPage] = useState(0);
    const handlePaginationChange = useCallback(
        ({ page }: GridPaginationModel) => setPage(page),
        [],
    );

    const [isDialogOpen, openDialog, closeDialog] = useDialog();

    return (
        <>
            <SpaceBetween alignItems="center" py={2}>
                <Stack>
                    <Typography variant="h4">Stock</Typography>
                    <TextField
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </Stack>

                <Fab color="primary" onClick={openDialog}>
                    <AddIcon />
                </Fab>
            </SpaceBetween>

            <Stack spacing={1}>
                {isLoading ? (
                    <DataGrid
                        columns={COLUMNS.map((c) => ({
                            ...c,
                            renderCell: renderSkeletonCell,
                        }))}
                        rows={skeletonRows}
                        // ...
                        page={0}
                        pageSize={10}
                        sortingBy=""
                        sortingOrder=""
                    />
                ) : (
                    <DataGrid
                        rows={all}
                        columns={COLUMNS}
                        // ...
                        paginationMode="client"
                        page={page}
                        pageSize={PAGE_SIZE}
                        totalRows={all.length ?? 0}
                        sortingBy=""
                        sortingOrder=""
                        onPaginationModelChange={handlePaginationChange}
                        // ...
                        resource="logistics"
                    />
                )}

                <Typography variant="h6">Almost out of stock:</Typography>

                {isLoading ? (
                    <DataGrid
                        columns={COLUMNS.map((c) => ({
                            ...c,
                            renderCell: renderSkeletonCell,
                        }))}
                        rows={skeletonRows}
                        // ...
                        page={0}
                        pageSize={10}
                        sortingBy=""
                        sortingOrder=""
                    />
                ) : (
                    <DataGrid
                        rows={almostOutOfStock}
                        columns={COLUMNS}
                        // ...
                        paginationMode="client"
                        page={page}
                        pageSize={PAGE_SIZE}
                        totalRows={almostOutOfStock.length ?? 0}
                        sortingBy=""
                        sortingOrder=""
                        onPaginationModelChange={handlePaginationChange}
                        // ...
                        resource="logistics"
                    />
                )}
            </Stack>

            {isDialogOpen ? (
                <AddOrEditDialog
                    open={isDialogOpen}
                    onClose={closeDialog}
                    onMutate={mutate}
                />
            ) : null}
        </>
    );
};

export default Logistics;
