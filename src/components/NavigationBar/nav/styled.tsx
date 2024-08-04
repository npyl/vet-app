"use client";

import MuiLink, { LinkProps as MuiLinkProps } from "@mui/material/Link";
import { NAV } from "../config";
import { alpha, styled } from "@mui/material/styles";
import { SpaceBetween } from "@/components/styled";
import { PaperProps } from "@mui/material";

const StyledPaperProps: PaperProps = {
    sx: {
        display: {
            xs: "none",
            lg: "flex",
        },
        width: NAV.W_DASHBOARD,
        bgcolor: (theme) => alpha(theme.palette.primary.main, 0.3),
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

export { StyledPaperProps, AccountContainer, ProfileButton };
