"use client";
// React
import { FormEvent, useCallback, useState } from "react";
// MUI
import LoadingButton from "@mui/lab/LoadingButton";
import { TextField } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
// Iconify
import Iconify from "@/components/iconify";
// Hooks
import useAuth from "@/hooks/useAuth";
import { useRouter, useSearchParams } from "next/navigation";
import { UserType } from "@/types/user";
import { SoftAlert } from "@/components/styled";

interface Props {
    type: UserType;
}

export default function LoginForm({ type }: Props) {
    const { signin } = useAuth();

    const router = useRouter();
    const searchParams = useSearchParams();
    const returnTo =
        searchParams.get("returnTo") || type === "USER"
            ? "/pets"
            : "/appointments";

    const [error, setError] = useState("");

    const [isSubmitting, setIsSubmitting] = useState(false);

    const [password, setPassword] = useState(false);

    const handleError = useCallback(
        (e: any) => setError(e.errorMessage || "An error has occured"),
        [],
    );

    const handleSubmit = useCallback(
        (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();

            setIsSubmitting(true);

            const form = e.target as HTMLFormElement;

            signin(form.email.value, form.password.value, type)
                .then(() => returnTo && router.push(returnTo))
                .catch(handleError)
                .finally(() => setIsSubmitting(false));
        },
        [type, returnTo],
    );

    return (
        <>
            <form method="POST" onSubmit={handleSubmit}>
                <Stack spacing={1}>
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

                    {/* <Link
                        variant="body2"
                        color="inherit"
                        underline="always"
                        sx={{ alignSelf: "flex-end" }}
                    >
                        Forgot password?
                    </Link> */}

                    {error ? (
                        <SoftAlert severity="error" sx={{ mb: 3 }}>
                            {error}
                        </SoftAlert>
                    ) : null}

                    <LoadingButton
                        fullWidth
                        color="primary"
                        size="large"
                        type="submit"
                        variant="contained"
                        loading={isSubmitting}
                    >
                        Login
                    </LoadingButton>
                </Stack>
            </form>
        </>
    );
}
