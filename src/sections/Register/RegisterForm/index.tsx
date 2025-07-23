"use client";
// React
import { useCallback, useState } from "react";
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
import UserForm from "./user";
import UserTypeSelect from "./UserTypeSelect";
import register from "@/actions/register";
import { useRouter } from "next/navigation";

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
    telephone: yup.string().length(10),

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
    telephone: yup.string().length(10).required(),
    afm: yup.string().length(9).required(),

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

export default function RegisterForm() {
    const [type, setType] = useState<UserType>("USER");

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

    const router = useRouter();
    const handleSubmit = useCallback(
        async (d: IRegisterReq) => {
            const res = await register(d);
            if (!res) return;
            router.push("/");
        },
        [type],
    );

    return (
        <FormProvider {...methods}>
            <UserTypeSelect
                type={type}
                setType={setType}
                sx={{
                    position: "absolute",
                    right: "40px",
                    top: "50px",
                }}
            />

            <form onSubmit={methods.handleSubmit(handleSubmit)}>
                {/* {error ? <SoftAlert severity="error">{error}</SoftAlert> : null} */}

                {type === "USER" ? (
                    <UserForm isSubmitting={methods.formState.isSubmitting} />
                ) : (
                    <VetForm isSubmitting={methods.formState.isSubmitting} />
                )}
            </form>
        </FormProvider>
    );
}
