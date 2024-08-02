// mui
import { Container } from "@mui/material";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Background, StyledPaper } from "./styled";
import Hero from "./Hero";
import MuiLink from "@mui/material/Link";
import NextLink from "next/link";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

// ----------------------------------------------------------------------

interface AuthPageProps {
    mode: "login" | "register";
}

const AuthPage = ({ mode = "login" }: AuthPageProps) => (
    <main>
        <Background>
            <Hero />

            <Container maxWidth="sm" component={StyledPaper}>
                {mode === "login" ? (
                    <>
                        <Stack spacing={1} mb={1}>
                            <Typography variant="h4">Sign in</Typography>

                            <Stack direction="row" spacing={0.5}>
                                <Typography variant="body2">
                                    New user?
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
                                    href="/register"
                                >
                                    Create an account
                                </MuiLink>
                            </Stack>
                        </Stack>

                        <LoginForm />
                    </>
                ) : (
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
                )}
            </Container>
        </Background>
    </main>
);

export default AuthPage;
