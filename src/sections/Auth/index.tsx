// mui
import { Container } from "@mui/material";
import { Background, StyledPaper } from "./styled";
import Hero from "./Hero";
import React, { PropsWithChildren } from "react";

// ----------------------------------------------------------------------

const AuthPage: React.FC<PropsWithChildren> = ({ children }) => (
    <main>
        <Background>
            <Hero />

            <Container maxWidth="sm" component={StyledPaper}>
                {children}
            </Container>
        </Background>
    </main>
);

export default AuthPage;
