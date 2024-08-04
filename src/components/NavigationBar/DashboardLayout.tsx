// @mui
import { Box } from "@mui/material";
// auth
import Main from "./Main";
import NavDesktop from "./Nav";
import NavMobile from "./NavMobile";
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
            <NavDesktop />
            <NavMobile />

            <Main mb={2}>{children}</Main>
        </Box>
    );
}
