"use client";

import { useState } from "react";
// @mui
import { Box, IconButton } from "@mui/material";
// hooks
import useResponsive from "@/hooks/useResponsive";
// auth
import Main from "./Main";
import NavVertical from "./nav/NavVertical";
import { MenuOutlined } from "@mui/icons-material";
import BreadCrumbsLayout from "./BreadCrumbsLayout";
// ----------------------------------------------------------------------

type Props = {
    children?: React.ReactNode;
};

export default function DashboardLayout({ children }: Props) {
    const isDesktop = useResponsive("up", "lg");

    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <Box width={1}>
            {isDesktop ? null : (
                <IconButton
                    sx={{
                        ml: 1.5,
                    }}
                    onClick={handleOpen}
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
                <NavVertical openNav={open} onCloseNav={handleClose} />

                <Main>{children}</Main>
            </Box>
        </Box>
    );
}
