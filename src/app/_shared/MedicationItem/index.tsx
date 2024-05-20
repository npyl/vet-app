import { ICONS } from "@/app/logistics/constants";
import Iconify from "@/components/iconify";
import IconTypography from "@/components/iconify/Typography";
import { SpaceBetween } from "@/components/styled";
import { IMedicationPOST } from "@/types/medication";
import IconButton from "@mui/material/IconButton";
import MedicineName from "./MedicineName";

interface MedicationItemProps {
    m: IMedicationPOST;
    onRemove?: (mId: number) => void;
}

const MedicationItem = ({ m, onRemove }: MedicationItemProps) => (
    <SpaceBetween p={1} px={2.5} direction="row" alignItems="center">
        <Iconify icon={ICONS.MEDICINE} width={30} height={30} />

        <MedicineName id={m.medicineId} />

        <IconTypography
            icon="circum:pills-bottle-1"
            iconProps={{
                width: 20,
                height: 20,
            }}
        >
            {m.quantity}
        </IconTypography>

        <IconTypography icon="ph:clock">every: {m.frequency}</IconTypography>

        <IconTypography icon="system-uicons:calendar-days">
            for: {m.duration}
        </IconTypography>

        {onRemove ? (
            <IconButton onClick={() => onRemove(m.medicineId)}>
                <Iconify
                    icon="clarity:remove-line"
                    width={20}
                    height={20}
                    color="error.main"
                />
            </IconButton>
        ) : null}
    </SpaceBetween>
);

export default MedicationItem;
