import { Controller, useFormContext } from "react-hook-form";
import Stack from "@mui/material/Stack";
import { FormControlLabel, FormHelperText, Typography } from "@mui/material";
import {
    DatePicker as MuiDatePicker,
    DatePickerProps as MuiDatePickerProps,
} from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { useCallback } from "react";

interface Props extends MuiDatePickerProps<dayjs.Dayjs> {
    label: string;
    name: string;
}

// INFO: value prop must be an ISO date string
const DatePicker = ({ name, label, ...props }: Props) => {
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
                    <FormControlLabel
                        labelPlacement="top"
                        label={label}
                        control={
                            <MuiDatePicker
                                {...field}
                                {...props}
                                value={value ? dayjs(value) : null}
                                onChange={handleChange}
                            />
                        }
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
