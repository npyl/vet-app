import MuiBreadcrumbs from "@mui/material/Breadcrumbs";
import Chip from "@mui/material/Chip";
import { emphasize, styled } from "@mui/material/styles";
import HomeIcon from "@mui/icons-material/Home";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { usePathname } from "next/navigation";

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

const BreadCrumbs = () => {
    const pathname = usePathname();

    return (
        <MuiBreadcrumbs separator={<NavigateNextIcon fontSize="small" />}>
            {pathname.split("/").map((l, i) => (
                <StyledBreadcrumb
                    key={i}
                    label={i === 0 ? "Home" : l}
                    icon={i === 0 ? <HomeIcon /> : undefined}
                />
            ))}
        </MuiBreadcrumbs>
    );
};

export default BreadCrumbs;
