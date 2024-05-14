import { Controller, useFormContext } from "react-hook-form";
import { TextFieldProps } from "@mui/material";
import ErrorTooltip from "./ErrorTooltip";
import MultilineTextField from "@/components/TextField/Multiline";

export interface RHFMultilineTextFieldProps
    extends Omit<TextFieldProps, "name"> {
    name: string;
}

const RHFMultilineTextField = ({
    name,
    ...props
}: RHFMultilineTextFieldProps) => {
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState: { error } }) => (
                <ErrorTooltip error={error?.message || ""}>
                    <MultilineTextField {...field} {...props} />
                </ErrorTooltip>
            )}
        />
    );
};

export default RHFMultilineTextField;
