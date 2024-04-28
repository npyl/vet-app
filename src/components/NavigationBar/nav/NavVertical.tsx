import { useEffect } from "react";
// next
import { usePathname } from "next/navigation";
// @mui
import { Box, Drawer, Stack } from "@mui/material";
// hooks
import useResponsive from "@/hooks/useResponsive";
// config
import { NAV } from "../config";
import { NavSectionVertical } from "../nav-section";
//
import navConfig from "./config";

import BobosLogo from "public/images/bobos_logo.jpg";
import NavAccount from "./account";
import Image from "next/image";

// ----------------------------------------------------------------------

type Props = {
    openNav: boolean;
    onCloseNav: VoidFunction;
};

export default function NavVertical({ openNav, onCloseNav }: Props) {
    const pathname = usePathname();
    const isDesktop = useResponsive("up", "lg");

    useEffect(() => {
        if (openNav) {
            onCloseNav();
        }
    }, [pathname]);

    const renderContent = (
        <>
            <Stack justifyContent="center" alignItems="center">
                <Image
                    alt="Bobos logo"
                    src={BobosLogo.src}
                    width={200}
                    height={200}
                />
            </Stack>

            <NavSectionVertical data={navConfig} />

            {/* Vertical Space */}
            <Box sx={{ flexGrow: 1 }} />

            <NavAccount />
        </>
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
