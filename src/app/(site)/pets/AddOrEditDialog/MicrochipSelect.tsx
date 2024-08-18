"use client";

import { FC, useState } from "react";
import RHFDatePicker from "@/components/hook-form/RHFDatePicker";
import RHFTextField from "@/components/hook-form/RHFTextField";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Stack from "@mui/material/Stack";
import { IPet } from "@/types/pet";

interface Props {
    pet?: IPet;
}

const MicrochipSelect: FC<Props> = ({ pet }) => {
    const [chipped, setChipped] = useState(!!pet?.microchip_date);

    return (
        <Stack direction="row" spacing={1} flexGrow={1} alignItems="flex-end">
            <FormControlLabel
                control={<Checkbox />}
                label="Chipped"
                checked={chipped}
                onChange={(e, b) => setChipped(b)}
            />

            {chipped ? (
                <>
                    <RHFDatePicker
                        label="Microchip Date"
                        name="microchip_date"
                    />

                    <RHFTextField
                        fullWidth
                        label="Chip Code"
                        name="microchip_code"
                    />
                </>
            ) : null}
        </Stack>
    );
};

export default MicrochipSelect;
