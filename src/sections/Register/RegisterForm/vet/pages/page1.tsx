import { RHFTextField } from "@/components/hook-form";
import Iconify from "@/components/iconify";
import { IconButton, InputAdornment, Stack, Typography } from "@mui/material";
import { useState } from "react";

const Page1 = () => {
    const [password, setPassword] = useState(false);

    return (
        <>
            <Typography
                variant="h5"
                color="text.secondary"
                textAlign="center"
                mb={2}
            >
                Credentials
            </Typography>

            <Stack direction="row" spacing={0.5}>
                <RHFTextField fullWidth name="firstName" label="First Name" />
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
        </>
    );
};

export default Page1;
