// form
import { Controller, useFormContext } from "react-hook-form";
// @mui
import { InputAdornment, TextField, TextFieldProps } from "@mui/material";
import { NumberFormatValues, NumericFormat } from "react-number-format";
import { useCallback, useState } from "react";

// ----------------------------------------------------------------------

type Props = TextFieldProps & {
    name: string;
    acceptsDecimal?: boolean;
    adornment?: string;
};

// (*): See https://github.com/s-yadav/react-number-format/issues/61

export default function RHFOnlyNumbers({
    name,
    label,
    disabled = false,
    acceptsDecimal = false,
    adornment = "",
    ...other
}: Props) {
    const { control, setValue } = useFormContext();

    // INFO: *ONLY* used if we are reading values from BE (e.g. on edit mode where we have initial value)
    //       Instead of using our local displayValue, we use field.value (which has an initial value coming from BE)
    //       Since numeric-format does not expose a format() method, we run our own.
    const getFormattedValue = useCallback((value?: string | number | null) => {
        // Basically, we just convert the "." (decimal separator) to a greek ","
        if (value === 0 || value === null || value === undefined) return "";
        return value.toString().replace(/\./g, ",");
    }, []);

    const [displayValue, setDisplayValue] = useState("");

    const handleChange = useCallback((values: NumberFormatValues) => {
        setValue(name, values.floatValue || 0);
        setDisplayValue(values.formattedValue);
    }, []);

    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState: { error } }) => (
                <NumericFormat
                    fullWidth
                    label={label}
                    customInput={TextField}
                    disabled={disabled}
                    value={displayValue || getFormattedValue(field.value)}
                    // formatting
                    decimalSeparator=","
                    allowedDecimalSeparators={[",", "."]}
                    decimalScale={acceptsDecimal ? undefined : 0} // (*)
                    fixedDecimalScale={acceptsDecimal} // (*)
                    allowNegative={false}
                    onValueChange={handleChange}
                    valueIsNumericString
                    // error
                    error={Boolean(error)}
                    helperText={error ? error.message : null}
                    // adornment
                    InputProps={{
                        endAdornment: adornment ? (
                            <InputAdornment position="end">
                                {adornment}
                            </InputAdornment>
                        ) : null,
                    }}
                />
            )}
        />
    );
}
