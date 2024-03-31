import { Controller, useFormContext } from "react-hook-form";
import {
    FormControlLabel,
    FormHelperText,
    Select,
    SelectProps,
} from "@mui/material";
import Stack from "@mui/material/Stack";

interface Props extends Omit<SelectProps, "name"> {
    name: string;
    label: string;
}

const RHFSelect = ({ name, label, ...props }: Props) => {
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState: { error } }) => (
                <Stack spacing={1}>
                    <FormControlLabel
                        control={<Select {...field} {...props} />}
                        label={label}
                        labelPlacement="top"
                    />

                    {error ? (
                        <FormHelperText error>{error?.message}</FormHelperText>
                    ) : null}
                </Stack>
            )}
        />
    );
};

export default RHFSelect;
