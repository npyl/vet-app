"use client";
import DataGrid from "@/components/DataGrid";
import { useCallback, useState } from "react";
import { IPet } from "@/types/pet";
import {
    GridCellParams,
    GridColDef,
    GridPaginationModel,
} from "@mui/x-data-grid";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Image from "next/image";

const RenderImageCell = ({ row }: GridCellParams<IPet>) => (
    <Stack justifyContent="center" alignItems="center" width={1} height={1}>
        <Image
            src={row.photo}
            alt="petPhoto"
            width={70}
            height={70}
            style={{
                borderRadius: "100%",
            }}
        />
    </Stack>
);

const COLUMNS: GridColDef<IPet>[] = [
    {
        field: "photo",
        headerName: "",
        align: "center",
        headerAlign: "center",
        renderCell: RenderImageCell,
    },
    {
        field: "name",
        headerName: "Pet Name",
        flex: 1,
        align: "center",
        headerAlign: "center",
    },
    {
        field: "age",
        headerName: "Pet Age",
        flex: 1,
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

interface PetsTableProps {
    rows: any[];
    isLoading: boolean;
}

export default function PetsTable({ rows, isLoading }: PetsTableProps) {
    const [page, setPage] = useState(0);

    const handlePaginationChange = useCallback(
        ({ page }: GridPaginationModel) => setPage(page),
        [],
    );

    // -------------------------------------------------------------

    return (
        <>
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
                    resource="pets"
                />
            ) : (
                <DataGrid
                    rows={rows}
                    columns={COLUMNS}
                    // ...
                    paginationMode="client"
                    page={page}
                    pageSize={PAGE_SIZE}
                    totalRows={rows.length ?? 0}
                    onPaginationModelChange={handlePaginationChange}
                    // ...
                    resource="pets"
                />
            )}
        </>
    );
}
