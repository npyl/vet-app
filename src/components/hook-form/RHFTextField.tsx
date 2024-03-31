// form
import { Controller, useFormContext } from "react-hook-form";
// @mui
import { TextField, TextFieldProps } from "@mui/material";

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
                <TextField
                    {...field}
                    value={
                        typeof field.value === "number" && field.value === 0
                            ? ""
                            : field.value || ""
                    }
                    inputProps={{
                        autoComplete: "new-password",
                    }}
                    error={!!error}
                    helperText={error?.message ?? ""}
                    {...other}
                />
            )}
        />
    );
}
