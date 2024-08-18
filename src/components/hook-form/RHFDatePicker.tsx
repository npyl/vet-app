"use client";

// react
import { useCallback } from "react";
// react-hook-form
import { Controller, useFormContext } from "react-hook-form";
// mui
import {
    DatePicker as MuiDatePicker,
    DatePickerProps as MuiDatePickerProps,
} from "@mui/x-date-pickers";
import FormControlLabel from "@mui/material/FormControlLabel";
import dayjs from "dayjs";
// custom
import ErrorTooltip from "./ErrorTooltip";

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
                <FormControlLabel
                    labelPlacement="top"
                    label={label}
                    control={
                        <ErrorTooltip
                            error={error?.message || ""}
                            sx={{
                                right: 35,
                            }}
                        >
                            <MuiDatePicker
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

export default DatePicker;
