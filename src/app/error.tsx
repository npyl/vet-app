"use client";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import Alert from "@mui/material/Alert";
import Hero from "@/components/Hero";

const GeneralError = ({ error }: { error: Error }) => (
    <Stack
        width="100vw"
        height="100vh"
        alignItems="center"
        justifyContent="center"
        bgcolor="primary.main"
    >
        <Hero />

        <Container
            sx={{
                zIndex: 1,
            }}
            maxWidth="md"
        >
            <Alert severity="error">{error?.message || ""}</Alert>
        </Container>
    </Stack>
);

export default GeneralError;
