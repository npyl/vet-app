import Box from "@mui/material/Box";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Chip from "@mui/material/Chip";
import { ReactNode } from "react";
import { emphasize, styled } from "@mui/material/styles";
import HomeIcon from "@mui/icons-material/Home";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { usePathname } from "next/navigation";

interface Props {
    children: ReactNode;
}

const StyledBreadcrumb = styled(Chip)(({ theme }) => {
    const backgroundColor =
        theme.palette.mode === "light"
            ? theme.palette.grey[100]
            : theme.palette.grey[800];

    return {
        height: theme.spacing(3),
        color: theme.palette.text.primary,
        fontWeight: theme.typography.fontWeightRegular,
        backgroundColor: emphasize(backgroundColor, 1),
    };
}) as typeof Chip;

const BreadCrumbsLayout = ({ children }: Props) => {
    const pathname = usePathname();

    return (
        <>
            <Breadcrumbs
                separator={<NavigateNextIcon fontSize="small" />}
                sx={{
                    p: 2,
                    borderBottom: "1px solid #ddd",
                }}
            >
                {pathname.split("/").map((l, i) => (
                    <StyledBreadcrumb
                        key={i}
                        label={i === 0 ? "Home" : l}
                        icon={i === 0 ? <HomeIcon /> : undefined}
                    />
                ))}
            </Breadcrumbs>

            <Box>{children}</Box>
        </>
    );
};

export default BreadCrumbsLayout;
