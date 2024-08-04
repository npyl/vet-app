// @mui
import { MenuOutlined } from "@mui/icons-material";
import { Box, BoxProps, Container, IconButton, Stack } from "@mui/material";
import BreadCrumbs from "./Breadcrumbs";

export default function Main({ children, sx, ...other }: BoxProps) {
    // const isDesktop = useResponsive("up", "lg");

    return (
        <Box
            component="main"
            sx={{
                flexGrow: 1,
                ...sx,
            }}
            {...other}
        >
            {/* Top bar */}
            <Stack
                direction={{
                    xs: "row",
                    lg: "column",
                }}
                alignItems={{
                    xs: "center",
                    lg: "initial",
                }}
                p={2}
                borderBottom="1px solid #ddd"
                spacing={1}
            >
                <IconButton>
                    <MenuOutlined />
                </IconButton>

                <BreadCrumbs />
            </Stack>

            <Container maxWidth="xl">{children}</Container>
        </Box>
    );
}
