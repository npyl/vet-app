"use client";
import { SpaceBetween } from "@/components/styled";
import { IProduct } from "@/types/products";
import {
    Box,
    Button,
    Drawer,
    Fab,
    MenuItem,
    Select,
    SelectChangeEvent,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import { GridPaginationModel } from "@mui/x-data-grid";
import { useCallback, useMemo, useState } from "react";
import useSWR from "swr";
import AddIcon from "@mui/icons-material/Add";
import AddOrEditDialog from "./AddOrEdit";
import useApiContext from "@/contexts/api";
import useDialog from "@/hooks/useDialog";
import { ProductType } from "@prisma/client";
import { SectionHeader } from "@/components/Section";
import StockDataGrid from "@/components/DataGrid/Stock";
import WithVet from "@/guards/WithVet";

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
                <StockDataGrid
                    loading={isLoading}
                    rows={all}
                    page={page}
                    pageSize={PAGE_SIZE}
                    onPaginationModelChange={handlePaginationChange}
                    onEditClick={setEditedRow}
                    onDeleteClick={removeItem}
                />

                <Drawer
                    open={isDrawerOpen}
                    onClose={closeDrawer}
                    role="presentation"
                    anchor="right"
                    slotProps={{
                        backdrop: { invisible: true },
                    }}
                >
                    <SectionHeader
                        title="Almost out of stock"
                        icon=""
                        color="warning"
                    />
                    <Box width={700} p={2}>
                        {isDrawerOpen ? (
                            <StockDataGrid
                                rows={almostOutOfStock}
                                page={page}
                                pageSize={PAGE_SIZE}
                                rowCount={almostOutOfStock.length ?? 0}
                                onPaginationModelChange={handlePaginationChange}
                                onEditClick={setEditedRow}
                                onDeleteClick={removeItem}
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

export default WithVet(Logistics);
