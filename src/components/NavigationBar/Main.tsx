// @mui
import { MenuOutlined } from "@mui/icons-material";
import { Box, BoxProps, Container, IconButton, Stack } from "@mui/material";
import BreadCrumbs from "./BreadCrumbs";
import useResponsive from "@/hooks/useResponsive";

interface MainProps extends BoxProps {
    onOpenSidebar: VoidFunction;
}

export default function Main({
    onOpenSidebar,
    children,
    sx,
    ...other
}: MainProps) {
    const isDesktop = useResponsive("up", "lg");

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
                {isDesktop ? null : (
                    <IconButton onClick={onOpenSidebar}>
                        <MenuOutlined />
                    </IconButton>
                )}

                <BreadCrumbs />
            </Stack>

            <Container maxWidth="xl">{children}</Container>
        </Box>
    );
}
