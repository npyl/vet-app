"use client";

import { IPet } from "@/types/pet";
import { GridCellParams, GridColDef } from "@mui/x-data-grid";
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

export default COLUMNS;
