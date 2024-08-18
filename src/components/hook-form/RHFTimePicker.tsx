"use client";

import { Controller, useFormContext } from "react-hook-form";
import { FormControlLabel } from "@mui/material";
import {
    TimePicker as MuiTimePicker,
    TimePickerProps as MuiTimePickerProps,
} from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { useCallback } from "react";
import ErrorTooltip from "./ErrorTooltip";

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
                <FormControlLabel
                    labelPlacement="top"
                    label={label}
                    control={
                        <ErrorTooltip error={error?.message || ""}>
                            <MuiTimePicker
                                {...field}
                                {...props}
                                value={value ? dayjs(value) : null}
                                onChange={handleChange}
                            />
                        </ErrorTooltip>
                    }
                />
            )}
        />
    );
};

export default TimePicker;
