// @mui
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
// config
import { NAV } from "../config";
import { NavSectionVertical } from "../nav-section";
//
import navConfig from "./config";

import BobosLogo from "public/images/bobos_logo.jpg";
import NavAccount from "./account";
import Image from "next/image";
import Link from "next/link";
import Drawer from "@mui/material/Drawer";
import { StyledPaperProps } from "./styled";

const SidebarContent = () => (
    <>
        <Stack justifyContent="center" alignItems="center" p={5}>
            <Tooltip title="Home">
                <Link href="/">
                    <Image
                        alt="Bobos logo"
                        src={BobosLogo.src}
                        width={200}
                        height={200}
                        style={{
                            boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.3)",
                            borderRadius: "50px",
                        }}
                    />
                </Link>
            </Tooltip>
        </Stack>

        <NavSectionVertical data={navConfig} />

        {/* Vertical Space */}
        <Box sx={{ flexGrow: 1 }} />

        <NavAccount />
    </>
);

// ----------------------------------------------------------------------

export default function NavVertical() {
    // const isDesktop = useResponsive("up", "lg");

    return (
        <Box
            component="nav"
            sx={{
                flexShrink: { lg: 0 },
                width: { lg: NAV.W_DASHBOARD },
            }}
        >
            {/* {isDesktop ? ( */}
            <Drawer open variant="permanent" PaperProps={StyledPaperProps}>
                <SidebarContent />
            </Drawer>

            {/* ) : (
                <Drawer
                    ModalProps={{
                        keepMounted: true,
                    }}
                    PaperProps={StyledPaperProps}
                >
                    <SidebarContent />
                </Drawer>
            )} */}
        </Box>
    );
}
