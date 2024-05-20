import MuiBreadcrumbs from "@mui/material/Breadcrumbs";
import { alpha, styled } from "@mui/material/styles";
import HomeIcon from "@mui/icons-material/Home";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { usePathname } from "next/navigation";
import Stack, { StackProps } from "@mui/material/Stack";
import { ReactNode } from "react";
import { Typography } from "@mui/material";

const BreadcrumbStack = styled(Stack)(({ theme }) => ({
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing(1),
    width: "max-content",
    // ...
    backgroundColor: alpha(theme.palette.primary.main, 0.2),
    color: theme.palette.primary.main,
    borderRadius: "15px",
    // ...
    paddingTop: theme.spacing(0.5),
    paddingBottom: theme.spacing(0.5),
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
}));

interface BreadcrumbPros extends StackProps {
    label: string;
    icon?: ReactNode;
}

const Breadcrumb: React.FC<BreadcrumbPros> = ({ label, icon, ...props }) => (
    <BreadcrumbStack {...props}>
        {icon}
        <Typography variant="subtitle2">{label}</Typography>
    </BreadcrumbStack>
);

const toUpperFirstLetter = (s: string) => `${s[0].toUpperCase()}${s.slice(1)}`;

const BreadCrumbs = () => {
    const pathname = usePathname();
    const crumbs = (pathname === "/" ? ["/"] : pathname.split("/")) || [];

    return (
        <MuiBreadcrumbs
            separator={<NavigateNextIcon fontSize="small" color="primary" />}
        >
            {crumbs.map((c, i) => (
                <Breadcrumb
                    key={i}
                    label={i === 0 ? "Home" : toUpperFirstLetter(c)}
                    icon={i === 0 ? <HomeIcon /> : undefined}
                />
            ))}
        </MuiBreadcrumbs>
    );
};

export default BreadCrumbs;
