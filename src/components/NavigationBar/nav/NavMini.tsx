// @mui
import { Box, Stack, Typography } from "@mui/material";
// config
import { NAV } from "../config";
// utils
// components
// import Logo from '../../../components/logo';
import { NavSectionMini } from "../nav-section";
//
import navConfig from "./config";

// ----------------------------------------------------------------------

export default function NavMini() {
    return (
        <Box
            component="nav"
            sx={{
                flexShrink: { lg: 0 },
                width: { lg: NAV.W_DASHBOARD_MINI },
            }}
        >
            <Stack
                sx={{
                    pb: 2,
                    height: 1,
                    position: "fixed",
                    width: NAV.W_DASHBOARD_MINI,
                    borderRight: (theme) =>
                        `dashed 1px ${theme.palette.divider}`,

                    msOverflowStyle: "none",
                    scrollbarWidth: "none",
                    overflowY: "scroll",
                    "&::-webkit-scrollbar": {
                        display: "none",
                    },
                }}
            >
                {/* <Logo sx={{ mx: 'auto', my: 2 }} /> */}
                <Typography sx={{ mx: "auto", my: 2 }}>Logo</Typography>
                <NavSectionMini data={navConfig} />
            </Stack>
        </Box>
    );
}
