import { ICONS } from "@/app/logistics/constants";
import Iconify from "@/components/iconify";
import { SpaceBetween } from "@/components/styled";
import { IMedicationPOST } from "@/types/medication";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

interface MedicationItemProps {
    m: IMedicationPOST;
    onRemove: (mId: number) => void;
}

const MedicationItem = ({ m, onRemove }: MedicationItemProps) => (
    <SpaceBetween p={1} direction="row" alignItems="center">
        <Stack direction="row" spacing={1} alignItems="center">
            <Iconify icon={ICONS.MEDICINE} width={30} height={30} />
            <Typography>{m.medicineId}</Typography>
            <Typography>{m.duration}</Typography>
            <Typography>{m.quantity}</Typography>
            <Typography>{m.frequency}</Typography>
        </Stack>

        <IconButton onClick={() => onRemove(m.medicineId)}>
            <Iconify
                icon="clarity:remove-line"
                width={20}
                height={20}
                color="error.main"
            />
        </IconButton>
    </SpaceBetween>
);

export default MedicationItem;
