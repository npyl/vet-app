import { Controller, useFormContext } from "react-hook-form";
import Stack from "@mui/material/Stack";
import { FormHelperText, Typography } from "@mui/material";
import {
    TimePicker as MuiTimePicker,
    TimePickerProps as MuiTimePickerProps,
} from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { useCallback } from "react";

interface Props extends MuiTimePickerProps<dayjs.Dayjs> {
    label: string;
    name: string;
}

// INFO: value prop must be an ISO date string
const TimePicker = ({ name, label, ...props }: Props) => {
    const { control, setValue } = useFormContext();

    const handleChange = useCallback(
        (d: dayjs.Dayjs | null) => setValue(name, d?.toISOString() || ""),
        [name],
    );

    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { value, ...field }, fieldState: { error } }) => (
                <Stack spacing={1}>
                    <Typography variant="subtitle1">{label}</Typography>
                    <MuiTimePicker
                        {...field}
                        {...props}
                        value={value ? dayjs(value) : null}
                        onChange={handleChange}
                    />
                    {error ? (
                        <FormHelperText error>{error?.message}</FormHelperText>
                    ) : null}
                </Stack>
            )}
        />
    );
};

export default TimePicker;
