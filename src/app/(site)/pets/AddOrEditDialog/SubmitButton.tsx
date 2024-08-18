"use client";

import { IPet } from "@/types/pet";
import LoadingButton from "@mui/lab/LoadingButton";
import { FC } from "react";
import { useFormContext } from "react-hook-form";

interface Props {
    pet?: IPet;
}

const SubmitButton: FC<Props> = ({ pet }) => {
    const {
        formState: { isLoading },
    } = useFormContext();

    return (
        <LoadingButton
            type="submit"
            variant="contained"
            disabled={isLoading}
            loading={isLoading}
        >
            {pet ? "Update" : "Add"}
        </LoadingButton>
    );
};

export default SubmitButton;
