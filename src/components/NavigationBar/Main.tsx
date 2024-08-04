import Box, { BoxProps } from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import BreadCrumbs from "./Breadcrumbs";
import MenuButton from "./MenuButton";

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
                p={2}
                borderBottom="1px solid #ddd"
                spacing={1}
            >
                <MenuButton />

                <BreadCrumbs />
            </Stack>

            <Container maxWidth="xl">{children}</Container>
        </Box>
    );
}
