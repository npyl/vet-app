import { RHFOnlyNumbers } from "@/components/hook-form";
import { SpaceBetween } from "@/components/styled";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

interface CustomTimePickerProps {
    day: string;
    name1: string;
    name2: string;
}

const CustomTimePicker = ({ day, name1, name2 }: CustomTimePickerProps) => (
    <SpaceBetween alignItems="center">
        <Typography mr={2}>{day}</Typography>
        <Stack direction="row" spacing={1} alignItems="center">
            <RHFOnlyNumbers name={name1} />
            <Typography variant="body2">to</Typography>
            <RHFOnlyNumbers name={name2} />
        </Stack>
    </SpaceBetween>
);

export default CustomTimePicker;
