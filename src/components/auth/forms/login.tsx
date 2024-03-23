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
import { SoftAlert } from "../styled";

export default function LoginForm() {
    const { signin } = useAuth();

    const router = useRouter();
    const searchParams = useSearchParams();
    const returnTo = searchParams.get("returnTo");

    const [isSubmitting, setIsSubmitting] = useState(false);
    // const [errorMsg, setErrorMsg] = useState("");
    const [password, setPassword] = useState(false);

    const handleSubmit = useCallback(
        (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();

            setIsSubmitting(true);

            const form = e.target as HTMLFormElement;

            signin(form.email.value, form.password.value)
                .then(() => returnTo && router.push(returnTo))
                .catch((error) => console.error(error))
                .finally(() => setIsSubmitting(false));
        },
        [returnTo],
    );

    return (
        <>
            <SoftAlert severity="info" sx={{ mb: 3 }}>
                Use email : <strong>tester@example.com</strong> / password :
                <strong>123456</strong>
            </SoftAlert>

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

                    <Link
                        variant="body2"
                        color="inherit"
                        underline="always"
                        sx={{ alignSelf: "flex-end" }}
                    >
                        Forgot password?
                    </Link>

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
