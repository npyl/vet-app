import MultilineTextField from "@/components/TextField/Multiline";
import ErrorTooltip from "@/components/hook-form/ErrorTooltip";
import { RHFMultilineTextFieldProps } from "@/components/hook-form/RHFMultiline";
import { Controller, useFormContext } from "react-hook-form";

interface RHFMedicationMultilineProps extends RHFMultilineTextFieldProps {}

const RHFMedicationMultiline = ({
    name,
    ...props
}: RHFMedicationMultilineProps) => {
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

export default RHFMedicationMultiline;
