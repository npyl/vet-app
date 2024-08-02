import SectionHeader from "@/components/Section/Header";
import IconButton from "@mui/material/IconButton";
import Stack, { StackProps } from "@mui/material/Stack";
import { Add as AddIcon } from "@mui/icons-material";
import MedicationItem from "../../MedicationItem";
import { useFormContext } from "react-hook-form";
import useDialog from "@/hooks/useDialog";
import MedicationCreateItem from "./CreateItem";
import { IMedicationPOST } from "@/types/medication";
import { useCallback } from "react";
import toast, { Toaster } from "react-hot-toast";

const Medication = (props: StackProps) => {
    const { watch, setValue } = useFormContext();

    const [isAdding, startAdd, endAdd] = useDialog();

    const medication = watch("medication") as IMedicationPOST[];

    const handleAdd = useCallback((m: IMedicationPOST) => {
        const old = watch("medication") as IMedicationPOST[];

        const idExists = old.find(
            ({ medicineId }) => medicineId === m.medicineId,
        );
        if (idExists) {
            toast.error("Already exists!");
            return;
        }

        setValue("medication", [...old, m]);
    }, []);

    const handleRemove = useCallback((mId: number) => {
        const old = watch("medication") as IMedicationPOST[];

        setValue(
            "medication",
            old.filter(({ medicineId }) => medicineId !== mId),
        );
    }, []);

    return (
        <Stack width={1} {...props}>
            <SectionHeader
                icon=""
                title="Medication"
                endNode={
                    <IconButton onClick={startAdd}>
                        <AddIcon />
                    </IconButton>
                }
                borderRadius="15px"
            />

            {/* List */}
            {medication?.map((m) => (
                <MedicationItem
                    key={m.medicineId}
                    m={m}
                    onRemove={handleRemove}
                />
            ))}

            {/* Add */}
            {isAdding ? (
                <MedicationCreateItem onCancel={endAdd} onAdd={handleAdd} />
            ) : null}

            <Toaster />
        </Stack>
    );
};

export default Medication;
