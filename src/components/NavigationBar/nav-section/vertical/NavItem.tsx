// next
// @mui
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box, Link, ListItemText, Tooltip } from "@mui/material";
//
import { NavItemProps } from "../types";
import { StyledDotIcon, StyledIcon, StyledItem } from "./styles";

// ----------------------------------------------------------------------

export default function NavItem({
    item,
    depth,
    open,
    active,
    isExternalLink,
    ...other
}: NavItemProps) {
    const { title, path, icon, info, children, disabled, caption } = item;
    const subItem = depth !== 1;
    const renderContent = (
        <StyledItem
            depth={depth}
            active={active}
            disabled={disabled}
            caption={!!caption}
            {...other}
        >
            {icon && <StyledIcon>{icon}</StyledIcon>}

            {subItem && (
                <StyledIcon>
                    <StyledDotIcon active={active && subItem} />
                </StyledIcon>
            )}

            <ListItemText
                primary={title}
                secondary={
                    caption && (
                        <Tooltip title={caption} placement="top-start">
                            <span>{caption}</span>
                        </Tooltip>
                    )
                }
                primaryTypographyProps={{
                    noWrap: true,
                    component: "span",
                    variant: active ? "subtitle2" : "body2",
                }}
                secondaryTypographyProps={{
                    noWrap: true,
                    variant: "caption",
                }}
            />

            {info && (
                <Box component="span" sx={{ lineHeight: 0 }}>
                    {info}
                </Box>
            )}

            {!!children && (!open ? <ExpandMoreIcon /> : <ExpandLessIcon />)}
        </StyledItem>
    );

    const renderItem = () => {
        // ExternalLink
        if (isExternalLink)
            return (
                <Link
                    href={path}
                    target="_blank"
                    rel="noopener"
                    underline="none"
                >
                    {renderContent}
                </Link>
            );

        // Has child
        if (children) {
            return renderContent;
        }

        // Default
        return <Link href={path}>{renderContent}</Link>;
    };

    return renderItem();
}
