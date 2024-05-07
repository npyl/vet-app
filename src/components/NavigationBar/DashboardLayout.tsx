"use client";

import { useState } from "react";
// @mui
import { Box } from "@mui/material";
// auth
import Main from "./Main";
import NavVertical from "./nav/NavVertical";
// ----------------------------------------------------------------------

type Props = {
    children?: React.ReactNode;
};

export default function DashboardLayout({ children }: Props) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <Box
            sx={{
                display: { lg: "flex" },
                minHeight: { lg: 1 },
            }}
        >
            <NavVertical openNav={open} onCloseNav={handleClose} />

            <Main onOpenSidebar={handleOpen}>{children}</Main>
        </Box>
    );
}
