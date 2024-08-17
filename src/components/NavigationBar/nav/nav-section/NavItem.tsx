import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box, Link, ListItemText, Tooltip } from "@mui/material";
//
import { NavItemProps } from "./types";
import { StyledItem } from "./styles";
import Iconify from "@/components/iconify";
import ActiveIndicator from "./ActiveIndicator";

export default function NavItem({ item, depth, open, ...other }: NavItemProps) {
    const { title, path, icon, info, children, disabled, caption } = item;

    // Default
    return (
        <Link href={path}>
            <StyledItem
                depth={depth}
                disabled={disabled}
                caption={!!caption}
                {...other}
            >
                {icon ? (
                    <Iconify
                        icon={icon}
                        width={20}
                        height={20}
                        marginRight={1}
                    />
                ) : null}

                <ListItemText
                    primary={title}
                    secondary={
                        caption ? (
                            <Tooltip title={caption} placement="top-start">
                                <span>{caption}</span>
                            </Tooltip>
                        ) : null
                    }
                    primaryTypographyProps={{
                        noWrap: true,
                        component: "span",
                    }}
                    secondaryTypographyProps={{
                        noWrap: true,
                        variant: "caption",
                    }}
                />

                {info ? (
                    <Box component="span" sx={{ lineHeight: 0 }}>
                        {info}
                    </Box>
                ) : null}

                <ActiveIndicator path={path} />

                {children ? (
                    !open ? (
                        <ExpandMoreIcon />
                    ) : (
                        <ExpandLessIcon />
                    )
                ) : null}
            </StyledItem>
        </Link>
    );
}
