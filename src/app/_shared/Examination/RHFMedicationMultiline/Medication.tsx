import SectionHeader from "@/components/Section/Header";
import IconButton from "@mui/material/IconButton";
import Stack, { StackProps } from "@mui/material/Stack";
import { Add as AddIcon } from "@mui/icons-material";
import { IProduct } from "@/types/products";
import MedicationItem from "./MedicationItem";
import { useFormContext } from "react-hook-form";
import useDialog from "@/hooks/useDialog";
import MedicationCreateItem from "./CreateItem";

const Medication = (props: StackProps) => {
    const { watch } = useFormContext();

    const medication = watch("medication") as IProduct[];

    const [isAdding, startAdd, endAdd] = useDialog();

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
            {medication?.map((m) => <MedicationItem key={m.id} m={m} />)}

            {/* Add */}
            {isAdding ? (
                <MedicationCreateItem onCancel={endAdd} onAdd={() => {}} />
            ) : null}
        </Stack>
    );
};

export default Medication;
