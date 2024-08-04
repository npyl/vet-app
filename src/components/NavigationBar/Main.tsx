import Box, { BoxProps } from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import BreadCrumbs from "./Breadcrumbs";

export default function Main({ children, sx, ...other }: BoxProps) {
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
                borderBottom="1px solid #ddd"
                spacing={1}
                p={2}
                pl={{
                    xs: 6, // Make up space for MenuButton on mobile
                    lg: 2,
                }}
            >
                <BreadCrumbs />
            </Stack>

            <Container maxWidth="xl">{children}</Container>
        </Box>
    );
}
