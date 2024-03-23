import { forwardRef } from "react";
// next
// @mui
import { Link, ListItemText, Tooltip } from "@mui/material";
// locales
// auth
//

import ChevronRight from "@mui/icons-material/ChevronRight";
import { NavItemProps } from "../types";
import { StyledIcon, StyledItem } from "./styles";

// ----------------------------------------------------------------------

const NavItem = forwardRef<HTMLDivElement, NavItemProps>(
    ({ item, depth, open, active, isExternalLink, ...other }, ref) => {
        const { title, path, icon, children, disabled, caption } = item;

        const subItem = depth !== 1;

        const renderContent = (
            <StyledItem
                ref={ref}
                open={open}
                depth={depth}
                active={active}
                disabled={disabled}
                {...other}
            >
                {icon && <StyledIcon>{icon}</StyledIcon>}

                <ListItemText
                    primary={title}
                    primaryTypographyProps={{
                        noWrap: true,
                        sx: {
                            width: 72,
                            fontSize: 10,
                            lineHeight: "16px",
                            textAlign: "center",
                            ...(active && {
                                fontWeight: "fontWeightMedium",
                            }),
                            ...(subItem && {
                                fontSize: 14,
                                width: "auto",
                                textAlign: "left",
                            }),
                        },
                    }}
                />

                {caption && (
                    <Tooltip title={caption} arrow placement="right">
                        {/* <Iconify
                            icon="eva:info-outline"
                            width={16}
                            sx={{
                                top: 11,
                                left: 6,
                                position: "absolute",
                            }}
                        /> */}
                        <div></div>
                    </Tooltip>
                )}

                {!!children && (
                    <ChevronRight
                        sx={{
                            fontSize: "14px",
                            top: 14,
                            right: 0,
                            position: "absolute",
                        }}
                    />
                )}
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

            // Default
            return <Link href={path}>{renderContent}</Link>;
        };

        return renderItem();
    },
);

export default NavItem;
