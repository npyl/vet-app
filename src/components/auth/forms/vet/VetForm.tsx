// React
import { lazy, useCallback, useState, Suspense } from "react";
// Mui
import Stack from "@mui/material/Stack";
import LoadingButton from "@mui/lab/LoadingButton";
import Button from "@mui/material/Button";
// Pages
import { Page1 } from "./pages";
import PageSkeleton from "./pages/Skeleton";
const Page2 = lazy(() => import("./pages/page2"));
const Page3 = lazy(() => import("./pages/page3"));

// ----------------------------------------------------------

const PAGES_COUNT = 3;

interface NavigationProps {
    page: number;
    isSubmitting: boolean;
    onNext: VoidFunction;
    onPrevious: VoidFunction;
}

const Navigation = ({
    onNext,
    onPrevious,
    page,
    isSubmitting,
}: NavigationProps) => (
    <Stack direction="row" spacing={1} justifyContent="center">
        {page !== 0 ? (
            <Button variant="outlined" onClick={onPrevious}>
                Previous
            </Button>
        ) : null}

        {page !== PAGES_COUNT - 1 ? (
            <Button variant="outlined" onClick={onNext}>
                Next
            </Button>
        ) : (
            <LoadingButton
                color="primary"
                size="large"
                type="submit"
                variant="contained"
                loading={isSubmitting}
            >
                Sign up
            </LoadingButton>
        )}
    </Stack>
);

interface Props {
    isSubmitting: boolean;
}

export default function VetForm({ isSubmitting }: Props) {
    const [page, setPage] = useState(0);
    const nextPage = useCallback(() => setPage((old) => old + 1), []);
    const previousPage = useCallback(
        () => setPage((old) => (old - 1 > -1 ? old - 1 : 0)),
        [],
    );

    // ---------------------------------------------------------------

    return (
        <Stack spacing={1}>
            <Suspense fallback={<PageSkeleton />}>
                {page === 0 ? <Page1 /> : null}
                {page === 1 ? <Page2 /> : null}
                {page === 2 ? <Page3 /> : null}
            </Suspense>

            <Navigation
                page={page}
                isSubmitting={isSubmitting}
                onNext={nextPage}
                onPrevious={previousPage}
            />
        </Stack>
    );
}
