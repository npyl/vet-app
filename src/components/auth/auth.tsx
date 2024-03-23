"use client";

// mui
import { Container, Paper } from "@mui/material";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Background } from "./styled";
import { useCallback, useState } from "react";
import { LoginForm, RegisterForm } from "./forms";

// ----------------------------------------------------------------------

export default function AuthPage() {
    const [mode, setMode] = useState<"login" | "register">("login");
    const setLogin = useCallback(() => setMode("login"), []);
    const setRegister = useCallback(() => setMode("register"), []);

    return (
        <main>
            <Background>
                <Container>
                    <Paper
                        sx={{
                            p: 5,
                            borderRadius: "15px",
                            backgroundColor: "background.paper",
                        }}
                    >
                        {mode === "login" ? (
                            <>
                                <Stack spacing={2} sx={{ mb: 5 }}>
                                    <Typography variant="h4">
                                        Sign in
                                    </Typography>

                                    <Stack direction="row" spacing={0.5}>
                                        <Typography variant="body2">
                                            New user?
                                        </Typography>

                                        <Typography
                                            variant="subtitle2"
                                            sx={{
                                                "&:hover": {
                                                    textDecoration: "underline",
                                                    cursor: "pointer",
                                                },
                                            }}
                                            onClick={setRegister}
                                        >
                                            Create an account
                                        </Typography>
                                    </Stack>
                                </Stack>
                                <LoginForm />
                            </>
                        ) : (
                            <>
                                <Stack spacing={2} sx={{ mb: 5 }}>
                                    <Typography variant="h4">
                                        Sign up
                                    </Typography>

                                    <Stack direction="row" spacing={0.5}>
                                        <Typography variant="body2">
                                            Already have an account?
                                        </Typography>

                                        <Typography
                                            variant="subtitle2"
                                            sx={{
                                                "&:hover": {
                                                    textDecoration: "underline",
                                                    cursor: "pointer",
                                                },
                                            }}
                                            onClick={setLogin}
                                        >
                                            Sign in
                                        </Typography>
                                    </Stack>
                                </Stack>
                                <RegisterForm />
                            </>
                        )}
                    </Paper>
                </Container>
            </Background>
        </main>
    );
}
