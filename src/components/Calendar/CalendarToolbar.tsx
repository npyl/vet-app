// @mui
import { Stack, IconButton } from "@mui/material";
// components
import Iconify from "@/components/iconify";

// ----------------------------------------------------------------------

type Props = {
    onNextDate: VoidFunction;
    onPrevDate: VoidFunction;
};

export default function CalendarToolbar({ onNextDate, onPrevDate }: Props) {
    return (
        <Stack direction="row" alignItems="center" spacing={2}>
            <IconButton onClick={onPrevDate}>
                <Iconify icon="eva:arrow-ios-back-fill" />
            </IconButton>

            <IconButton onClick={onNextDate}>
                <Iconify icon="eva:arrow-ios-forward-fill" />
            </IconButton>
        </Stack>
    );
}
