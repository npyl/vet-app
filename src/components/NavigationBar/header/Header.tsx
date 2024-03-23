// @mui
import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

// hooks
import useResponsive from "@/hooks/useResponsive";
// config
import { useSettingsContext } from "@/contexts/settings";
import { MenuOutlined } from "@mui/icons-material";
import { HEADER, NAV } from "../config";
// components
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
//

// ----------------------------------------------------------------------

type Props = {
    onOpenNav?: VoidFunction;
};

export default function Header({ onOpenNav }: Props) {
    const theme = useTheme();
    const { themeLayout, onChangeLayout } = useSettingsContext();
    const isNavMini = themeLayout === "mini";
    const isDesktop = useResponsive("up", "lg");

    const renderContent = (
        <>
            {!isDesktop && (
                <IconButton onClick={onOpenNav} sx={{ mr: 1 }}>
                    <MenuOutlined />
                </IconButton>
            )}
            {isDesktop && (
                <IconButton
                    disableFocusRipple
                    disableRipple
                    sx={{
                        height: "15px",
                        width: "10px",
                        position: "absolute",
                        left: 0,
                        marginLeft: "-10px",
                        border: "1px solid grey",
                        borderRadius: "24px",
                        background: "white",
                    }}
                    onClick={() =>
                        onChangeLayout(
                            isNavMini ? "vertical" : ("mini" as string),
                        )
                    }
                >
                    {isNavMini ? (
                        <ChevronRightIcon sx={{ fontSize: "14px" }} />
                    ) : (
                        <ChevronLeftIcon sx={{ fontSize: "14px" }} />
                    )}
                </IconButton>
            )}
            <Typography color={"black"} variant="h6">
                App Bar
            </Typography>
        </>
    );

    return (
        <AppBar
            sx={{
                background: "white",
                boxShadow: "none",
                borderBottom: (theme) =>
                    `1px solid ${theme.palette?.neutral?.[300]}`,
                height: isDesktop
                    ? HEADER.H_DASHBOARD_DESKTOP
                    : HEADER.H_MOBILE,
                zIndex: theme.zIndex.appBar + 1,

                transition: theme.transitions.create(["height"], {
                    duration: theme.transitions.duration.shorter,
                }),
                ...(isDesktop && {
                    width: `calc(100% - ${NAV.W_DASHBOARD + 1}px)`,
                    ...(isNavMini && {
                        width: `calc(100% - ${NAV.W_DASHBOARD_MINI + 1}px)`,
                    }),
                }),
            }}
        >
            <Toolbar
                sx={{
                    height: 1,
                    px: { lg: 5 },
                }}
            >
                {renderContent}
            </Toolbar>
        </AppBar>
    );
}
