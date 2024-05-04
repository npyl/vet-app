import ErrorTooltip from "@/components/hook-form/ErrorTooltip";
import { Controller, useFormContext } from "react-hook-form";
import Medication from "./Medication";
import { InputBase, Paper, PaperProps } from "@mui/material";

export interface RHFMedicationMultilineProps extends PaperProps {
    name: string;
    label: string;
    fullWidth?: boolean;
}

const RHFMedicationMultiline = ({
    name,
    label,
    fullWidth = false,
    ...props
}: RHFMedicationMultilineProps) => {
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState: { error } }) => (
                <ErrorTooltip error={error?.message || ""}>
                    <Paper
                        variant="outlined"
                        sx={{
                            flexGrow: 1,
                            borderRadius: "15px",
                            bgcolor: "transparent",
                        }}
                        {...props}
                    >
                        <InputBase
                            placeholder={label}
                            multiline
                            rows={5}
                            fullWidth={fullWidth}
                            sx={{
                                mx: 2,
                                mt: 2,
                                height: "100%", // WARN: this is important for not overflowing hidden
                            }}
                            {...field}
                        />

                        <Medication />
                    </Paper>
                </ErrorTooltip>
            )}
        />
    );
};

export default RHFMedicationMultiline;
