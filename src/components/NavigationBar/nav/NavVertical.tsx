import { useEffect } from "react";
// next
import { usePathname } from "next/navigation";
// @mui
import { Box, Button, Drawer, Stack, Typography } from "@mui/material";
// hooks
import useResponsive from "@/hooks/useResponsive";
// config
import { NAV } from "../config";
// components
// import Logo from "../../../components/logo";
import { NavSectionVertical } from "../nav-section";
import Scrollbar from "../scrollbar";
//
import navConfig from "./config";
import useAuth from "@/hooks/useAuth";

// import NavAccount from "./NavAccount";

// ----------------------------------------------------------------------

type Props = {
    openNav: boolean;
    onCloseNav: VoidFunction;
};

export default function NavVertical({ openNav, onCloseNav }: Props) {
    const { logout } = useAuth();

    const pathname = usePathname();

    const isDesktop = useResponsive("up", "lg");

    useEffect(() => {
        if (openNav) {
            onCloseNav();
        }
    }, [pathname]);

    const renderContent = (
        <Scrollbar
            sx={{
                height: 1,
                "& .simplebar-content": {
                    height: 1,
                    display: "flex",
                    flexDirection: "column",
                },
            }}
        >
            <Stack
                spacing={3}
                sx={{
                    pt: 3,
                    pb: 2,
                    px: 2.5,
                    flexShrink: 0,
                }}
            >
                {/* <Logo /> */}
                <Typography>Logo</Typography>
                {/* <NavAccount /> */}
            </Stack>

            <NavSectionVertical data={navConfig} />

            <Box sx={{ flexGrow: 1 }} />

            <Box display="flex" flexDirection="row" justifyContent="center">
                <Button variant="outlined" onClick={logout}>
                    Logout
                </Button>
            </Box>
        </Scrollbar>
    );

    return (
        <Box
            component="nav"
            sx={{
                flexShrink: { lg: 0 },
                width: { lg: NAV.W_DASHBOARD },
            }}
        >
            {isDesktop ? (
                <Drawer
                    open
                    variant="permanent"
                    PaperProps={{
                        sx: {
                            width: NAV.W_DASHBOARD,
                            bgcolor: "transparent",
                            borderRightStyle: "dashed",
                        },
                    }}
                >
                    {renderContent}
                </Drawer>
            ) : (
                <Drawer
                    open={openNav}
                    onClose={onCloseNav}
                    ModalProps={{
                        keepMounted: true,
                    }}
                    PaperProps={{
                        sx: {
                            paddingTop: 1,
                            width: NAV.W_DASHBOARD,
                        },
                    }}
                >
                    {renderContent}
                </Drawer>
            )}
        </Box>
    );
}
