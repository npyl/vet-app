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
    return (
        <Box
            sx={{
                display: { lg: "flex" },
                minHeight: { lg: 1 },
            }}
        >
            <NavVertical />

            <Main mb={2}>{children}</Main>
        </Box>
    );
}
