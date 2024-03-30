// @mui
import { Box, BoxProps, Container } from "@mui/material";
import BreadCrumbsLayout from "./BreadCrumbsLayout";

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
            <BreadCrumbsLayout>
                <Container maxWidth="xl">{children}</Container>
            </BreadCrumbsLayout>
        </Box>
    );
}
