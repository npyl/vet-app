"use client";

// React
import { useState } from "react";
// MUI
import LoadingButton from "@mui/lab/LoadingButton";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Stack from "@mui/material/Stack";
// Iconify
import Iconify from "@/components/iconify";
import { RHFTextField } from "@/components/hook-form";

interface UserFormProps {
    isSubmitting: boolean;
}

const UserForm = ({ isSubmitting }: UserFormProps) => {
    const [password, setPassword] = useState(false);

    return (
        <>
            <Stack spacing={0.5}>
                <Stack direction="row" spacing={0.5}>
                    <RHFTextField
                        fullWidth
                        name="firstName"
                        label="First Name"
                    />
                    <RHFTextField fullWidth name="lastName" label="Last Name" />
                </Stack>

                <RHFTextField fullWidth name="email" label="Email address" />

                <RHFTextField
                    fullWidth
                    name="password"
                    label="Password"
                    type={password ? "text" : "password"}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={() => setPassword((old) => !old)}
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
            </Stack>

            <LoadingButton
                sx={{
                    mt: 5,
                }}
                fullWidth
                color="primary"
                size="large"
                type="submit"
                variant="contained"
                loading={isSubmitting}
            >
                Sign up
            </LoadingButton>
        </>
    );
};

export default UserForm;
