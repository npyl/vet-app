"use client";

import { FC, useCallback } from "react";
import Dialog from "./Dialog";
import { DialogFormProps } from "./types";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const DialogForm: FC<DialogFormProps> = ({
    schema,
    values,
    submitAction,
    ...props
}) => {
    const methods = useForm({
        resolver: yupResolver(schema),
        values,
    });

    const handleSubmit = useCallback(
        async (d: any) => {
            await submitAction(d);
            props.onClose?.();
        },
        [submitAction],
    );

    return (
        <FormProvider {...methods}>
            <Dialog
                submit
                onSubmit={methods.handleSubmit(handleSubmit)}
                // ...
                {...props}
            />
        </FormProvider>
    );
};

export default DialogForm;
