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
import { Button } from "@mui/material";
import userLogin from "./userLogin";
import vetLogin from "./vetLogin";

const Option = ({ text, action }: { text: string; action: VoidFunction }) => (
    <form action={action}>
        <Button
            type="submit"
            sx={{
                "&:hover": {
                    bgcolor: "primary.light",
                    color: "white",
                },
            }}
            fullWidth
        >
            {text}
        </Button>
    </form>
);

const QuickSignInOptions = () => (
    <Stack
        position="absolute"
        right={-50}
        top={-50}
        bgcolor="background.paper"
        p={2}
        borderRadius={2}
        gap={1}
        border="1px solid"
        borderColor="primary.main"
        boxShadow={5}
    >
        <Typography variant="h6">Quick Login</Typography>
        <Option text="User" action={userLogin} />
        <Option text="Vet" action={vetLogin} />
    </Stack>
);

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

        <QuickSignInOptions />
    </>
);

export default LoginContent;
