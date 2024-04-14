"use client";

// React
import { FormEvent, useCallback, useState } from "react";
// MUI
import LoadingButton from "@mui/lab/LoadingButton";
import { TextField } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Stack from "@mui/material/Stack";
// Iconify
import Iconify from "@/components/iconify";
// Hooks
import useAuth from "@/hooks/useAuth";
import { useRouter, useSearchParams } from "next/navigation";
import { UserType } from "@/types/user";

interface Props {
    type: UserType;
}

export default function RegisterForm({ type }: Props) {
    const { signup } = useAuth();

    const router = useRouter();
    const searchParams = useSearchParams();
    const returnTo =
        searchParams.get("returnTo") || type === "USER"
            ? "/pets"
            : "/appointments";

    const [isSubmitting, setIsSubmitting] = useState(false);
    // const [errorMsg, setErrorMsg] = useState("");
    const [password, setPassword] = useState(false);

    const handleSubmit = useCallback(
        (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();

            setIsSubmitting(true);

            const form = e.target as HTMLFormElement;

            signup(form.email.value, form.password.value, type)
                .then(() => returnTo && router.push(returnTo))
                .catch((error) => console.error(error))
                .finally(() => setIsSubmitting(false));
        },
        [type, returnTo],
    );

    return (
        <>
            <form method="POST" onSubmit={handleSubmit}>
                <Stack spacing={2.5}>
                    <TextField name="email" label="Email address" />

                    <TextField
                        name="password"
                        label="Password"
                        type={password ? "text" : "password"}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={() =>
                                            setPassword((old) => !old)
                                        }
                                        edge="end"
                                    >
                                        <Iconify
                                            icon={
                                                password
                                                    ? "solar:eye-bold"
                                                    : "solar:eye-closed-bold"
                                            }
                                        />
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />

                    <LoadingButton
                        fullWidth
                        color="primary"
                        size="large"
                        type="submit"
                        variant="contained"
                        loading={isSubmitting}
                    >
                        Sign up
                    </LoadingButton>
                </Stack>
            </form>
        </>
    );
}
