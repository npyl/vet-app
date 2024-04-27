"use client";

// mui
import {
    Button,
    ButtonGroup,
    ButtonGroupProps,
    Container,
    Paper,
} from "@mui/material";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Background } from "./styled";
import { useCallback, useState } from "react";
import { LoginForm, RegisterForm } from "./forms";
import { UserType } from "@prisma/client";
import Hero from "./Hero";

// ----------------------------------------------------------------------

interface Props extends ButtonGroupProps {
    type: UserType;
    setType: (t: UserType) => void;
}

const UserTypeSelect = ({ type, setType, ...props }: Props) => {
    const selectUser = useCallback(() => setType("USER"), []);
    const selectVet = useCallback(() => setType("VET"), []);

    return (
        <ButtonGroup {...props}>
            <Button
                variant={type === "USER" ? "contained" : "outlined"}
                onClick={selectUser}
            >
                User
            </Button>
            <Button
                variant={type === "VET" ? "contained" : "outlined"}
                onClick={selectVet}
            >
                Vet
            </Button>
        </ButtonGroup>
    );
};

// ----------------------------------------------------------------------

export default function AuthPage() {
    const [mode, setMode] = useState<"login" | "register">("login");
    const setLogin = useCallback(() => setMode("login"), []);
    const setRegister = useCallback(() => setMode("register"), []);

    const [type, setType] = useState<UserType>("USER");

    return (
        <main>
            <Background>
                <Hero />

                <Container maxWidth="sm">
                    <Paper
                        sx={{
                            p: 5,
                            borderRadius: "15px",
                            position: "relative",
                        }}
                    >
                        {mode === "login" ? (
                            <>
                                <Stack spacing={1} mb={1}>
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
                                            color="primary.main"
                                            onClick={setRegister}
                                        >
                                            Create an account
                                        </Typography>
                                    </Stack>
                                </Stack>
                                <LoginForm type={type} />
                            </>
                        ) : (
                            <>
                                <UserTypeSelect
                                    type={type}
                                    setType={setType}
                                    sx={{
                                        position: "absolute",
                                        right: "40px",
                                        top: "50px",
                                    }}
                                />

                                <Stack spacing={1} mb={1}>
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
                                            color="primary.main"
                                            onClick={setLogin}
                                        >
                                            Sign in
                                        </Typography>
                                    </Stack>
                                </Stack>
                                <RegisterForm type={type} />
                            </>
                        )}
                    </Paper>
                </Container>
            </Background>
        </main>
    );
}
