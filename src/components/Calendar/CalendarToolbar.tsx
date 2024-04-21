// @mui
import { Stack, IconButton, StackProps } from "@mui/material";
// components
import Iconify from "@/components/iconify";

// ----------------------------------------------------------------------

type Props = StackProps & {
    onNextDate: VoidFunction;
    onPrevDate: VoidFunction;
};

export default function CalendarToolbar({
    onNextDate,
    onPrevDate,
    ...props
}: Props) {
    return (
        <Stack direction="row" alignItems="center" spacing={2} {...props}>
            <IconButton onClick={onPrevDate}>
                <Iconify icon="eva:arrow-ios-back-fill" />
            </IconButton>

            <IconButton onClick={onNextDate}>
                <Iconify icon="eva:arrow-ios-forward-fill" />
            </IconButton>
        </Stack>
    );
}
