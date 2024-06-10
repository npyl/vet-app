import { Controller, useFormContext } from "react-hook-form";
import { FormControlLabel, Select, SelectProps } from "@mui/material";
import ErrorTooltip from "./ErrorTooltip";

export interface RHFSelectProps extends Omit<SelectProps, "name"> {
    name: string;
    label: string;
    labelPlacement?: "end" | "start" | "top" | "bottom";
}

const RHFSelect = ({
    name,
    label,
    labelPlacement = "top",
    ...props
}: RHFSelectProps) => {
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState: { error } }) => (
                <FormControlLabel
                    control={
                        <ErrorTooltip
                            error={error?.message || ""}
                            sx={{
                                right: 30,
                            }}
                        >
                            <Select {...field} {...props} />
                        </ErrorTooltip>
                    }
                    label={label}
                    labelPlacement={labelPlacement}
                />
            )}
        />
    );
};

export default RHFSelect;
