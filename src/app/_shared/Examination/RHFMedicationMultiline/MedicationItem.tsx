import { ICONS } from "@/app/logistics/constants";
import Iconify from "@/components/iconify";
import { SpaceBetween } from "@/components/styled";
import { IProduct } from "@/types/products";
import { Close } from "@mui/icons-material";
import { IconButton } from "@mui/material";

interface MedicationItemProps {
    m: IProduct;

    create?: boolean;
    onCancelCreate?: VoidFunction;
}

const MedicationItem = ({
    create = false,
    onCancelCreate,
}: MedicationItemProps) => {
    return (
        <SpaceBetween p={1} direction="row">
            <Iconify icon={ICONS.MEDICINE} width={30} height={30} />

            {create ? (
                <>
                    <IconButton onClick={onCancelCreate}>
                        <Close />
                    </IconButton>
                </>
            ) : null}
        </SpaceBetween>
    );
};

export default MedicationItem;
