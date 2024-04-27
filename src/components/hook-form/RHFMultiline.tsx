import { Controller, useFormContext } from "react-hook-form";
import { TextFieldProps, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import ErrorTooltip from "./ErrorTooltip";

export const MultilineTextField = styled(TextField)(({ theme }) => ({
    "& .MuiInputBase-root": {
        height: "auto!important",
    },
    "& .MuiInputBase-input.MuiOutlinedInput-input": {
        padding: theme.spacing(1),
        paddingLeft: "13px",
        paddingRight: "13px",
    },
}));

interface Props extends Omit<TextFieldProps, "name"> {
    name: string;
}

const RHFMultilineTextField = ({ name, ...props }: Props) => {
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
