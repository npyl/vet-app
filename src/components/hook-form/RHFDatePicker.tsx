import { Controller, useFormContext } from "react-hook-form";
import Stack from "@mui/material/Stack";
import { FormHelperText, Typography } from "@mui/material";
import { DatePicker as MuiDatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

interface Props {
    label: string;
    name: string;
}

// INFO: value prop must be an ISO date string
const DatePicker = ({ name, label }: Props) => {
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { value, ...field }, fieldState: { error } }) => (
                <Stack spacing={1}>
                    <Typography variant="subtitle1">{label}</Typography>
                    <MuiDatePicker
                        {...field}
                        value={value ? dayjs(value) : null}
                    />
                    {error ? (
                        <FormHelperText error>{error?.message}</FormHelperText>
                    ) : null}
                </Stack>
            )}
        />
    );
};

export default DatePicker;
