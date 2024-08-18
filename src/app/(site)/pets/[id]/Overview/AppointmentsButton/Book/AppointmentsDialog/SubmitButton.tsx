"use client";

import LoadingButton from "@mui/lab/LoadingButton";
import { useFormContext } from "react-hook-form";

const SubmitButton = () => {
    const {
        watch,
        formState: { isSubmitting },
    } = useFormContext();

    // Make sure we have everything filled in (TODO: date is not checked correct)
    const vetId = watch("vetId");
    const date = watch("date");
    const haveAllFields = vetId && vetId > -1 && date;

    return (
        <LoadingButton
            type="submit"
            loading={isSubmitting}
            variant="contained"
            disabled={isSubmitting || !haveAllFields}
        >
            Book
        </LoadingButton>
    );
};

export default SubmitButton;
