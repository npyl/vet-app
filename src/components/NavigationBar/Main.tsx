// @mui
import { Box, BoxProps, Container } from "@mui/material";

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
            <Container maxWidth="xl">{children}</Container>
        </Box>
    );
}
