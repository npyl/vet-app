"use client";

// Must be used inside a <form />

import LoadingButton, { LoadingButtonProps } from "@mui/lab/LoadingButton";
import React from "react";
import { useFormStatus } from "react-dom";

interface SubmitButtonProps
    extends Omit<LoadingButtonProps, "type" | "loading" | "disabled"> {}

const SubmitButton: React.FC<SubmitButtonProps> = (props) => {
    const { pending } = useFormStatus();

    return (
        <LoadingButton
            type="submit"
            disabled={pending}
            loading={pending}
            {...props}
        />
    );
};

export default SubmitButton;
