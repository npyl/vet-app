import { IProduct } from "@/types/products";
import { IconButton, Stack, Typography } from "@mui/material";
import { GridCellParams } from "@mui/x-data-grid";
import { MouseEvent, useCallback } from "react";
import Iconify from "@/components/iconify";

import { GridColDef } from "@mui/x-data-grid";

import { ICONS } from "@/app/logistics/constants";

const RenderMainCell = ({ row }: GridCellParams<IProduct>) => (
    <Stack
        direction="row"
        justifyContent="left"
        alignItems="center"
        width={1}
        height={1}
        spacing={1}
    >
        <Iconify
            icon={ICONS[row.type]}
            width={30}
            height={30}
            color="primary.main"
        />
        <Typography>{row?.name}</Typography>
    </Stack>
);

interface RenderButtonsCellProps {
    params: GridCellParams<IProduct>;
    onEditClick: (id: number) => void;
    onDeleteClick: (id: number) => void;
}

const RenderButtonsCell = ({
    params,
    onEditClick,
    onDeleteClick,
}: RenderButtonsCellProps) => {
    const handleEditClick = useCallback((e: MouseEvent) => {
        e.stopPropagation();
        onEditClick(params.row.id);
    }, []);
    const handleDeleteClick = useCallback((e: MouseEvent) => {
        e.stopPropagation();
        onDeleteClick(params.row.id);
    }, []);

    return (
        <Stack
            direction="row"
            spacing={1}
            justifyContent="center"
            alignItems="center"
            width={1}
            height={1}
        >
            <IconButton onClick={handleDeleteClick}>
                <Iconify
                    icon="material-symbols-light:delete"
                    width={30}
                    height={30}
                    color="error.main"
                />
            </IconButton>
            <IconButton onClick={handleEditClick}>
                <Iconify
                    icon="material-symbols:edit-outline"
                    width={30}
                    height={30}
                    color="primary.main"
                />
            </IconButton>
        </Stack>
    );
};

const getCOLUMNS = (
    onEditClick: (id: number) => void,
    onDeleteClick: (id: number) => void,
): GridColDef<IProduct>[] => [
    {
        field: "name",
        flex: 1,
        headerName: "",
        align: "left",
        headerAlign: "left",
        renderCell: RenderMainCell,
    },
    {
        field: "type",
        headerName: "",
        align: "center",
        renderCell: (params) => (
            <RenderButtonsCell
                params={params}
                onEditClick={onEditClick}
                onDeleteClick={onDeleteClick}
            />
        ),
    },
];

export default getCOLUMNS;
