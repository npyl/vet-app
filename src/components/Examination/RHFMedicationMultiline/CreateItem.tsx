import { ICONS } from "@/constants/logistics";
import Iconify from "@/components/iconify";
import { SpaceBetween } from "@/components/styled";
import useTextField from "@/hooks/useTextField";
import { IMedicationPOST, TMedicationFrequency } from "@/types/medication";
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
    onAdd: (m: IMedicationPOST) => void;
    onCancel: VoidFunction;
}

const MedicationCreateItem = ({
    onAdd,
    onCancel,
}: MedicationCreateItemProps) => {
    const { medicine, medicineOptions } = useGetMedicine();

    const [medicineName, setMedicineName] = useState("");
    const [duration, setDuration] = useTextField("");
    const [frequency, setFrequency] = useTextField("");
    const [quantity, setQuantity] = useTextField("");

    const complete = medicineName && duration && frequency && quantity;

    const handleAdd = useCallback(() => {
        const medicineId = medicine?.find(
            ({ name }) => name === medicineName,
        )?.id;

        if (!medicineId) return;

        onAdd({
            medicineId,
            duration,
            quantity,
            frequency: frequency as TMedicationFrequency,
        });
    }, [medicineName, medicine, duration, quantity, frequency]);

    return (
        <SpaceBetween p={1} direction="row" alignItems="center">
            <Stack direction="row" spacing={1} alignItems="center">
                <Iconify icon={ICONS.MEDICINE} width={30} height={30} />
                <Autocomplete
                    sx={{ width: "300px" }}
                    disablePortal
                    value={medicineName}
                    onChange={(_, v) => v && setMedicineName(v)}
                    clearIcon={<></>}
                    options={medicineOptions}
                    renderInput={(params) => (
                        <TextField {...params} placeholder="Search Medicine" />
                    )}
                />
                <TextField
                    label="Duration"
                    value={duration}
                    onChange={setDuration}
                />
                <TextField
                    label="Frequency"
                    value={frequency}
                    onChange={setFrequency}
                />
                <TextField
                    label="Quantity"
                    value={quantity}
                    onChange={setQuantity}
                />
            </Stack>

            <Stack direction="row" spacing={1}>
                <IconButton onClick={onCancel}>
                    <Close />
                </IconButton>

                {complete ? (
                    <IconButton onClick={handleAdd}>
                        <Done />
                    </IconButton>
                ) : null}
            </Stack>
        </SpaceBetween>
    );
};

export default MedicationCreateItem;
