"use client";

// form
import { Controller, useFormContext } from "react-hook-form";
// @mui
import {
    Checkbox,
    FormControlLabel,
    FormControlLabelProps,
} from "@mui/material";
// custom
import ErrorTooltip from "./ErrorTooltip";

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
            render={({ field, fieldState: { error } }) => (
                <ErrorTooltip
                    error={error?.message || ""}
                    sx={{
                        right: -9,
                    }}
                >
                    <FormControlLabel
                        control={<Checkbox {...field} checked={field.value} />}
                        {...other}
                    />
                </ErrorTooltip>
            )}
        />
    );
}

export default RHFCheckbox;
