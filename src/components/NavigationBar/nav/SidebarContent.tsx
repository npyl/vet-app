import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import NavSectionVertical from "./nav-section";
import navConfig from "./config";
import BobosLogo from "public/images/bobos_logo.jpg";
import NavAccount from "./account";
import Image from "next/image";
import Link from "next/link";
import { SidebarContentStack } from "./styled";

const SidebarContent = () => (
    <SidebarContentStack>
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
    </SidebarContentStack>
);

export default SidebarContent;
