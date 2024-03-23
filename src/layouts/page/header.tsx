import { TableToolbar } from "@/components/StandardTable";
import { Stack, Typography } from "@mui/material";
import { HeaderProps } from "./headerTypes";

const PageHeader = ({
    filterName,
    handleFilterName,
    pageTitle,
    pageDescription,
    showSearchBar,
    contentRight,
    contentLeft,
    contentBottom,
}: HeaderProps) => (
    <Stack direction="row" justifyContent="space-between" px={4} mb={1}>
        <Stack spacing={1.5}>
            <Stack direction="row">
                <Typography variant="h4">{pageTitle}</Typography>
                {contentLeft ? contentLeft : null}
            </Stack>
            <Typography variant="body1" color="text.secondary">
                {pageDescription}
            </Typography>
            <Stack>
                {showSearchBar ? (
                    <TableToolbar
                        filterName={filterName}
                        onFilterName={handleFilterName}
                    />
                ) : null}
                {contentBottom ? contentBottom : null}
            </Stack>
        </Stack>
        <Stack
            direction="row"
            alignItems="center"
            justifyContent="center"
            spacing={1}
        >
            {contentRight ? contentRight : null}
        </Stack>
    </Stack>
);

export default PageHeader;
