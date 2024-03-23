"use client";
import { useState } from "react";
// @mui
import { Box, IconButton } from "@mui/material";
// hooks
import useResponsive from "@/hooks/useResponsive";
// auth
// import AuthGuard from "../../auth/AuthGuard";

//

import Main from "./Main";
import NavMini from "./nav/NavMini";
import NavVertical from "./nav/NavVertical";

import { useSettingsContext } from "@/contexts/settings";
import { MenuOutlined } from "@mui/icons-material";
import Header from "./header";
// ----------------------------------------------------------------------

type Props = {
    children?: React.ReactNode;
};

export default function DashboardLayout({ children }: Props) {
    const { themeLayout } = useSettingsContext();

    const isDesktop = useResponsive("up", "lg");

    const [open, setOpen] = useState(false);

    const isNavMini = themeLayout === "mini";

    const handleOpen = () => {
        setOpen(!open);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const renderNavVertical = (
        <NavVertical openNav={open} onCloseNav={handleClose} />
    );

    const renderContent = () => {
        if (isNavMini) {
            return (
                <>
                    {!isDesktop && (
                        <IconButton
                            // onClick={onOpenNav}
                            sx={{ mr: 1, color: "text.primary" }}
                        >
                            <MenuOutlined />
                        </IconButton>
                    )}
                    <Box
                        sx={{
                            display: { lg: "flex" },
                            minHeight: { lg: 1 },
                        }}
                    >
                        <Header onOpenNav={handleOpen} />
                        {isDesktop ? <NavMini /> : renderNavVertical}

                        <Main>{children}</Main>
                    </Box>
                </>
            );
        }

        return (
            <Box width={1}>
                <Header onOpenNav={handleOpen} />

                <Box
                    sx={{
                        display: { lg: "flex" },
                        minHeight: { lg: 1 },
                    }}
                >
                    {renderNavVertical}

                    <Main>{children}</Main>
                </Box>
            </Box>
        );
    };
    return renderContent();
}
