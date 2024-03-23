// @mui
import { Box, BoxProps, Container } from "@mui/material";
// hooks
import useResponsive from "@/hooks/useResponsive";
// config

// components

import { useSettingsContext } from "@/contexts/settings";
import { HEADER, NAV } from "./config";

// ----------------------------------------------------------------------

const SPACING = 8;

export default function Main({ children, sx, ...other }: BoxProps) {
    const { themeLayout } = useSettingsContext();

    const isNavMini = themeLayout === "mini";

    const isDesktop = useResponsive("up", "lg");

    return (
        <Box
            component="main"
            sx={{
                flexGrow: 1,
                py: `${HEADER.H_MOBILE + SPACING}px`,
                ...(isDesktop && {
                    px: 2,
                    py: `${HEADER.H_DASHBOARD_DESKTOP + SPACING}px`,
                    width: `calc(100% - ${NAV.W_DASHBOARD}px)`,
                    ...(isNavMini && {
                        width: `calc(100% - ${NAV.W_DASHBOARD_MINI}px)`,
                    }),
                }),
                ...sx,
            }}
            {...other}
        >
            <Container>{children}</Container>
        </Box>
    );
}
