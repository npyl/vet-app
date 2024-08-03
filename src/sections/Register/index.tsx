import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import MuiLink from "@mui/material/Link";
import NextLink from "next/link";
import RegisterForm from "./RegisterForm";

const RegisterContent = () => (
    <>
        <Stack spacing={1} mb={1}>
            <Typography variant="h4">Sign up</Typography>

            <Stack direction="row" spacing={0.5}>
                <Typography variant="body2">
                    Already have an account?
                </Typography>

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
                    href="/login"
                >
                    Sign in
                </MuiLink>
            </Stack>
        </Stack>

        <RegisterForm />
    </>
);

export default RegisterContent;
