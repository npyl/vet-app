"use client";
// React
import { useCallback, useState } from "react";
// Hooks
import useAuth from "@/hooks/useAuth";
import { useRouter, useSearchParams } from "next/navigation";
// React-Hook-Form
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
// Vet Form
import VetForm from "./vet";
// Types
import { UserType } from "@/types/user";
import { IRegisterReq } from "@/types/auth";
import { IVetWorkingHoursPOST } from "@/types/workingHours";
import { SoftAlert } from "@/components/styled";
import UserForm from "./user";

// ----------------------------------------------------------

const TUPLE = yup
    .tuple([
        yup
            .number()
            .min(8, "must be more than / or 8")
            .max(22, "must be less than / or 22")
            .required(),
        yup
            .number()
            .min(8, "must be more than / or 8")
            .max(22, "must be less than / or 22")
            .required(),
    ])
    .required();

const UserSchema = yup.object<IRegisterReq>().shape({
    firstName: yup.string().required(),
    lastName: yup.string().required(),

    email: yup.string().required(),
    password: yup.string().required(),
    type: yup.string().oneOf<UserType>(["USER", "VET"]).required(),
    avatar: yup.string().notRequired(),

    // --- VET SPECIFIC ---
    region: yup.string(),
    city: yup.string(),
    complex: yup.string(),
    telephone: yup.string(),

    workingHours: yup.object<IVetWorkingHoursPOST>().shape({
        monday: TUPLE,
        tuesday: TUPLE,
        wednesday: TUPLE,
        thursday: TUPLE,
        friday: TUPLE,

        vetId: yup.number().required(),
    }),
});

const VetSchema = yup.object<IRegisterReq>().shape({
    firstName: yup.string().required(),
    lastName: yup.string().required(),

    email: yup.string().email().required(),
    password: yup.string().required(),
    type: yup.string().oneOf<UserType>(["USER", "VET"]).required(),
    avatar: yup.string().notRequired(),

    // --- VET SPECIFIC ---
    region: yup.string().required(),
    city: yup.string().required(),
    complex: yup.string().required(),
    telephone: yup.string().required(),
    afm: yup.string().required(),

    workingHours: yup.object<IVetWorkingHoursPOST>().shape({
        monday: TUPLE,
        tuesday: TUPLE,
        wednesday: TUPLE,
        thursday: TUPLE,
        friday: TUPLE,

        vetId: yup.number().required(),
    }),
});

// ----------------------------------------------------------

interface Props {
    type: UserType;
}

export default function RegisterForm({ type }: Props) {
    const { signup } = useAuth();

    const router = useRouter();
    const searchParams = useSearchParams();
    const returnTo = searchParams.get("returnTo") || "/";

    // ---------------------------------------------------------------

    const methods = useForm<IRegisterReq>({
        resolver: yupResolver(type === "USER" ? UserSchema : VetSchema) as any, // TODO: fix this any
        values: {
            firstName: "",
            lastName: "",

            avatar: "",
            email: "",
            password: "",
            type,

            // --- VET SPECIFIC ---
            region: "",
            city: "",
            complex: "",

            telephone: "",
            afm: "",

            workingHours: {
                // 9am-5pm
                monday: [9, 17],
                tuesday: [9, 17],
                wednesday: [9, 17],
                thursday: [9, 17],
                friday: [9, 17],

                vetId: -1,
            },
        },
    });

    const [error, setError] = useState("");
    const handleError = useCallback(
        (e: any) => setError(e.errorMessage || "An error has occured"),
        [],
    );

    const handleSubmit = useCallback(
        (d: IRegisterReq) => {
            console.log("d: ", d);

            signup(d)
                .then(() => returnTo && router.push(returnTo))
                .catch(handleError);
        },
        [type, returnTo],
    );

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(handleSubmit)}>
                {error ? <SoftAlert severity="error">{error}</SoftAlert> : null}

                {type === "USER" ? (
                    <UserForm isSubmitting={methods.formState.isSubmitting} />
                ) : (
                    <VetForm isSubmitting={methods.formState.isSubmitting} />
                )}
            </form>
        </FormProvider>
    );
}
