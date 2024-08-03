import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import MuiLink from "@mui/material/Link";
import NextLink from "next/link";
import TextField from "@mui/material/TextField";
import PasswordTextField from "./PasswordTextField";
import Form from "./Form";
import SubmitButton from "@/components/SubmitButton";
import React from "react";
import { SoftAlert } from "@/components/styled";

interface Props {
    error?: string;
}

const LoginContent: React.FC<Props> = ({ error }) => (
    <>
        <Stack spacing={1} mb={1}>
            <Typography variant="h4">Sign in</Typography>

            <Stack direction="row" spacing={0.5}>
                <Typography variant="body2">New user?</Typography>

                <MuiLink
                    component={NextLink}
                    variant="subtitle2"
                    sx={{
                        "&:hover": {
                            textDecoration: "underline",
                            cursor: "pointer",
                        },
                    }}
                    color="primary.main"
                    href="/register"
                >
                    Create an account
                </MuiLink>
            </Stack>
        </Stack>

        <Form>
            <Stack spacing={0.5}>
                <TextField name="email" label="Email address" />
                <PasswordTextField />
            </Stack>

            <SubmitButton
                fullWidth
                color="primary"
                size="large"
                variant="contained"
                sx={{
                    mt: 5,
                }}
            >
                Login
            </SubmitButton>
        </Form>

        {error ? <SoftAlert>{error}</SoftAlert> : null}
    </>
);

export default LoginContent;
