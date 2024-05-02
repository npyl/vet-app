"use client";
import DataGrid from "@/components/DataGrid";
import { SpaceBetween } from "@/components/styled";
import { IProduct } from "@/types/products";
import {
    Box,
    Button,
    Drawer,
    Fab,
    IconButton,
    MenuItem,
    Select,
    SelectChangeEvent,
    Skeleton,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import {
    GridCellParams,
    GridColDef,
    GridPaginationModel,
} from "@mui/x-data-grid";
import { MouseEvent, useCallback, useMemo, useState } from "react";
import useSWR from "swr";
import AddIcon from "@mui/icons-material/Add";
import AddOrEditDialog from "./AddOrEdit";
import Iconify from "@/components/iconify";
import useApiContext from "@/contexts/api";
import useDialog from "@/hooks/useDialog";
import { ICONS } from "./constants";
import { ProductType } from "@prisma/client";

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

//
//  Skeletons
//
const renderSkeletonCell = () => <Skeleton width={150} animation="wave" />;
const skeletonRows = Array.from({ length: 2 }, (_, index) => ({
    id: index + 1,
}));

const PAGE_SIZE = 5;

// ---------------------------------------------------------------------------------------

const useStock = () => {
    const { remove } = useApiContext();

    const [search, setSearch] = useState("");
    const [selectedType, setSelectedType] = useState<ProductType | "ALL">(
        "ALL",
    );

    const urlParams = useMemo(
        () =>
            new URLSearchParams({
                search,
                selectedType,
            }),
        [search, selectedType],
    );

    const { data, isLoading, mutate } = useSWR<IProduct[]>(
        `/api/stock?${urlParams.toString()}`,
    );

    const { all, almostOutOfStock } = useMemo(
        () => ({
            all: Array.isArray(data) ? data : [],
            almostOutOfStock: Array.isArray(data)
                ? data.filter(({ stock }) => stock <= 20) // <= 20 items
                : [],
        }),
        [data],
    );

    const removeItem = useCallback(
        (id: number) => remove(`/api/stock?id=${id}`).then(mutate),
        [],
    );

    return {
        all,
        almostOutOfStock,
        isLoading,
        removeItem,
        mutate,
        // ...
        search,
        setSearch,
        selectedType,
        setSelectedType,
    };
};

// ---------------------------------------------------------------------------------------

const Logistics = () => {
    const {
        all,
        almostOutOfStock,
        isLoading,
        removeItem,
        mutate,
        // ...
        search,
        setSearch,
        selectedType,
        setSelectedType,
    } = useStock();

    const handleSelect = useCallback(
        (e: SelectChangeEvent<ProductType>) =>
            setSelectedType(e.target.value as ProductType),
        [],
    );

    const [page, setPage] = useState(0);
    const handlePaginationChange = useCallback(
        ({ page }: GridPaginationModel) => setPage(page),
        [],
    );

    // -2: nothing
    // -1: create
    // >=0: row id
    const [editedRow, setEditedRow] = useState(-2);
    const openDialog = useCallback(() => setEditedRow(-1), []);
    const closeDialog = useCallback(() => setEditedRow(-2), []);

    const [isDrawerOpen, openDrawer, closeDrawer] = useDialog();

    const productById = useMemo(
        () =>
            editedRow >= 0 ? all.find(({ id }) => id === editedRow) : undefined,
        [all, editedRow],
    );

    const COLUMNS = useMemo(() => getCOLUMNS(setEditedRow, removeItem), []);

    return (
        <>
            <SpaceBetween alignItems="center" py={2}>
                <Stack direction="row" alignItems="center" spacing={1}>
                    <Typography variant="h4">Stock</Typography>
                    <TextField
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <Select value={selectedType as any} onChange={handleSelect}>
                        <MenuItem value="ALL">All</MenuItem>
                        <MenuItem value="TOY">Toys</MenuItem>
                        <MenuItem value="MEDICINE">Medicine</MenuItem>
                        <MenuItem value="ANIMAL_FEED">Animal Feed</MenuItem>
                    </Select>
                </Stack>

                <Stack direction="row" spacing={1} alignItems="center">
                    <Button
                        variant="outlined"
                        color="warning"
                        onClick={openDrawer}
                    >
                        Almost out of stock ({almostOutOfStock.length})
                    </Button>

                    <Fab color="primary" onClick={openDialog}>
                        <AddIcon />
                    </Fab>
                </Stack>
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

                <Drawer
                    open={isDrawerOpen}
                    onClose={closeDrawer}
                    role="presentation"
                    anchor="right"
                >
                    <Box width={700} p={2}>
                        {isDrawerOpen ? (
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
                        ) : null}
                    </Box>
                </Drawer>
            </Stack>

            {editedRow !== -2 ? (
                <AddOrEditDialog
                    open={editedRow !== -2}
                    onClose={closeDialog}
                    onMutate={mutate}
                    product={productById}
                />
            ) : null}
        </>
    );
};

export default Logistics;
