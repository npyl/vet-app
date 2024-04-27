// form
import { Controller, useFormContext } from "react-hook-form";
// @mui
import { TextField, TextFieldProps } from "@mui/material";
// custom
import ErrorTooltip from "./ErrorTooltip";

// ----------------------------------------------------------------------

type Props = TextFieldProps & {
    name: string;
};

export default function RHFTextField({ name, ...other }: Props) {
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState: { error } }) => (
                <ErrorTooltip error={error?.message || ""}>
                    <TextField
                        {...field}
                        value={
                            typeof field.value === "number" && field.value === 0
                                ? ""
                                : field.value || ""
                        }
                        {...other}
                    />
                </ErrorTooltip>
            )}
        />
    );
}
