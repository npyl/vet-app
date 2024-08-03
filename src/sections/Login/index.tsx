import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import MuiLink from "@mui/material/Link";
import NextLink from "next/link";

import LoginForm from "./LoginForm";

const LoginContent = () => (
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

        <LoginForm />
    </>
);

export default LoginContent;
