import type { FC } from "react";
import { Box } from "@mui/material";

export const SplashScreen: FC = () => (
    <Box
        sx={{
            alignItems: "center",
            backgroundColor: "neutral.900",
            display: "flex",
            flexDirection: "column",
            height: "100vh",
            justifyContent: "center",
            left: 0,
            p: 3,
            position: "fixed",
            top: 0,
            width: "100vw",
            zIndex: 2000,
        }}
    />
);
