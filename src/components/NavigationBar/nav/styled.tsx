"use client";

import MuiLink, { LinkProps as MuiLinkProps } from "@mui/material/Link";
import { NAV } from "./config";
import { alpha, styled } from "@mui/material/styles";
import { SpaceBetween } from "@/components/styled";
import { PaperProps, Stack } from "@mui/material";

const SidebarContentStack = styled(Stack)(({ theme }) => ({
    height: "100%",
    width: "100%",
    backgroundColor: alpha(theme.palette.primary.main, 0.3),
}));

const StyledPaperProps: PaperProps = {
    className: "SidebarDrawer",
    sx: {
        width: NAV.W_DASHBOARD,
        display: { xs: "none", lg: "flex" },
    },
};

const AccountContainer = styled(SpaceBetween)(({ theme }) => ({
    alignItems: "center",
    padding: theme.spacing(2),
    borderTop: "1px solid",
    borderColor: alpha(theme.palette.primary.main, 0.5),
}));

const ProfileButton: React.FC<MuiLinkProps> = (props) => (
    <MuiLink
        {...props}
        sx={{
            borderRadius: "15px",
            "&:hover": {
                cursor: "pointer",
                backgroundColor: (theme) =>
                    alpha(theme.palette.primary.main, 0.3),
                color: "primary.main",
            },
            p: 1,
        }}
    />
);

export {
    SidebarContentStack,
    StyledPaperProps,
    AccountContainer,
    ProfileButton,
};
