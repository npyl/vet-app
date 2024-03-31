// form
import { Controller, useFormContext } from "react-hook-form";
// @mui
import {
    Checkbox,
    FormControlLabel,
    FormControlLabelProps,
} from "@mui/material";

// ----------------------------------------------------------------------

interface RHFCheckboxProps extends Omit<FormControlLabelProps, "control"> {
    name: string;
}

function RHFCheckbox({ name, ...other }: RHFCheckboxProps) {
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => (
                <FormControlLabel
                    control={<Checkbox {...field} checked={field.value} />}
                    {...other}
                />
            )}
        />
    );
}

export default RHFCheckbox;
