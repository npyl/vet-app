// @mui
import Box from "@mui/material/Box";
// config
import { NAV } from "./config";
import Drawer from "@mui/material/Drawer";
import { StyledPaperProps } from "./styled";
import SidebarContent from "./SidebarContent";

// ----------------------------------------------------------------------

export default function NavVertical() {
    return (
        <Box
            component="nav"
            sx={{
                flexShrink: { lg: 0 },
                width: { lg: NAV.W_DASHBOARD },
                backgroundColor: "white",
            }}
        >
            <Drawer open variant="permanent" PaperProps={StyledPaperProps}>
                <SidebarContent />
            </Drawer>
        </Box>
    );
}
