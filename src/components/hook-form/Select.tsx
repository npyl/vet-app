import { MenuItem } from "@mui/material";
import { RHFSelect } from "@/components/hook-form";
import { RHFSelectProps } from "./RHFSelect";

type SelectProps = Omit<RHFSelectProps, "children"> & {
    name: string;
    label: string;
    emptyValue?: any;
    options: { key: string; value: string }[];
};

const Select = ({ name, label, emptyValue, options }: SelectProps) => (
    <RHFSelect fullWidth name={name} label={label}>
        <MenuItem value={emptyValue || ""}>Not selected</MenuItem>
        {options.map(({ key, value }, i) => (
            <MenuItem key={i} value={key}>
                {value}
            </MenuItem>
        ))}
    </RHFSelect>
);

export default Select;
