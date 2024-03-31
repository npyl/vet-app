import { Controller, useFormContext } from "react-hook-form";
import { FormHelperText, Select, SelectProps } from "@mui/material";
import Stack from "@mui/material/Stack";

interface Props extends Omit<SelectProps, "name"> {
    name: string;
}

const RHFSelect = ({ name, children, ...props }: Props) => {
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState: { error } }) => (
                <Stack spacing={1}>
                    <Select {...field} {...props}>
                        {children}
                    </Select>

                    {error ? (
                        <FormHelperText error>{error?.message}</FormHelperText>
                    ) : null}
                </Stack>
            )}
        />
    );
};

export default RHFSelect;
