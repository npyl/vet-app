// @mui
import { TablePaginationProps, Stack, Button, Typography } from "@mui/material";
//

// ----------------------------------------------------------------------

type Props = {
    page: number;
    count: number;
    rowsPerPage: number;
    onPageChange: (event: unknown, newPage: number) => void;
};

export default function TablePaginationCustom({
    page,
    count,
    rowsPerPage,
    onPageChange,
}: Props & TablePaginationProps) {
    return (
        <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            p={1}
        >
            <Stack direction="row" spacing={1}>
                <Button
                    onClick={() => onPageChange(null, page - 1)}
                    disabled={page === 0}
                    variant="outlined"
                    size="small"
                >
                    Previous
                </Button>
                <Button
                    onClick={() => onPageChange(null, page + 1)}
                    disabled={page === Math.ceil(count / rowsPerPage) - 1}
                    variant="outlined"
                    size="small"
                >
                    Next
                </Button>
            </Stack>

            <Typography variant="body2">
                Page {page + 1} of {Math.ceil(count / rowsPerPage)}
            </Typography>
        </Stack>
    );
}
