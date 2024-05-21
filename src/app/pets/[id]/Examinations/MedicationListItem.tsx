import type { FC } from "react";
import ListItem from "@/components/List/item";
import ListItemProps from "@/components/List/types";
import { IMedication } from "@/types/medication";
import MedicationItem from "@/app/_shared/MedicationItem";
import Stack from "@mui/material/Stack";

interface MedicationListItemProps extends Omit<ListItemProps, "value"> {
    medication: IMedication[];
}

const MedicationListItem: FC<MedicationListItemProps> = ({
    medication,
    ...props
}) => (
    <ListItem {...props} align="vertical">
        <Stack width={1}>
            {medication?.map((m) => (
                <MedicationItem
                    key={m.id}
                    m={{ ...m, medicineId: m.medicine.id }}
                />
            ))}
        </Stack>
    </ListItem>
);

export default MedicationListItem;
