import { ICONS } from "@/app/logistics/constants";
import Iconify from "@/components/iconify";
import { SpaceBetween } from "@/components/styled";
import { IProduct } from "@/types/products";
import { Close, Done } from "@mui/icons-material";
import { Autocomplete, IconButton, Stack, TextField } from "@mui/material";
import { useCallback, useMemo, useState } from "react";
import useSWR from "swr";

// ---------------------------------------------------------------------------

const useGetMedicine = () => {
    const { data, isLoading } = useSWR<IProduct[]>("/api/stock/medicine");

    const { medicine, medicineOptions } = useMemo(
        () => ({
            medicine: Array.isArray(data) ? data : [],
            medicineOptions: Array.isArray(data)
                ? data.map(({ name }) => name)
                : [],
        }),
        [data],
    );

    return { medicine, medicineOptions, isLoading };
};

// ---------------------------------------------------------------------------

interface MedicationCreateItemProps {
    onAdd: (id: number) => void;
    onCancel: VoidFunction;
}

const MedicationCreateItem = ({
    onAdd,
    onCancel,
}: MedicationCreateItemProps) => {
    const [value, setValue] = useState("");

    const { medicine, medicineOptions } = useGetMedicine();

    const handleAdd = useCallback(() => {
        const id = medicine?.find(({ name }) => name === value)?.id;
        if (!id) return;
        onAdd(id);
    }, [value, medicine]);

    return (
        <SpaceBetween p={1} direction="row" alignItems="center">
            <Stack direction="row" spacing={1} alignItems="center">
                <Iconify icon={ICONS.MEDICINE} width={30} height={30} />
                <Autocomplete
                    sx={{ width: "300px" }}
                    disablePortal
                    value={value}
                    onChange={(_, v) => setValue(v || "")}
                    clearIcon={<></>}
                    options={medicineOptions}
                    renderInput={(params) => (
                        <TextField {...params} placeholder="Search Medicine" />
                    )}
                />
            </Stack>

            <Stack direction="row" spacing={1}>
                <IconButton onClick={onCancel}>
                    <Close />
                </IconButton>

                {value ? (
                    <IconButton onClick={handleAdd}>
                        <Done />
                    </IconButton>
                ) : null}
            </Stack>
        </SpaceBetween>
    );
};

export default MedicationCreateItem;
