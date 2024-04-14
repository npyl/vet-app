"use client";

import DataGrid from "@/components/DataGrid";
import useSWR from "swr";
import { useMemo } from "react";
import { IPet } from "@/types/pet";
import { GridCellParams, GridColDef } from "@mui/x-data-grid";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import useAuth from "@/hooks/useAuth";

const RenderImageCell = ({ row }: GridCellParams<IPet>) => (
    <Stack justifyContent="center" alignItems="center" width={1} height={1}>
        <img
            src={row.photo}
            alt="petPhoto"
            width="70px"
            height="70px"
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

export default function PetsPage() {
    const { user } = useAuth();

    const { data, isLoading } = useSWR<IPet[]>(
        user?.id ? `/api/user/${user.id}/pets` : null,
    );

    const rows = useMemo(
        () => (Array.isArray(data) && data.length > 0 ? data : []),
        [data],
    );

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
                    sortingBy=""
                    sortingOrder=""
                />
            ) : (
                <DataGrid
                    rows={rows}
                    columns={COLUMNS}
                    // ...
                    page={0}
                    pageSize={10}
                    sortingBy=""
                    sortingOrder=""
                    // ...
                    resource="pets"
                />
            )}
        </>
    );
}
