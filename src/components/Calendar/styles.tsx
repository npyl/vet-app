import Box from "@mui/material/Box";
import { styled, alpha } from "@mui/material/styles";

const StyledCalendar = styled(Box)(({ theme }) => ({
    boxShadow: theme.shadows[16],

    "& .fc": {
        "--fc-list-event-dot-width": "8px",
        "--fc-border-color": theme.palette.divider,
        "--fc-event-border-color": theme.palette.info.light,
        "--fc-now-indicator-color": theme.palette.error.main,
        "--fc-today-bg-color": theme.palette.action.selected,
        "--fc-page-bg-color": theme.palette.background.default,
        "--fc-neutral-bg-color": theme.palette.background.default,
        "--fc-list-event-hover-bg-color": theme.palette.action.hover,
        "--fc-highlight-color": alpha(theme.palette.primary.main, 0.08),
    },

    "& .fc-theme-standard .fc-scrollgrid": {
        border: "1px solid",
        borderColor: alpha(theme.palette.primary.main, 0.3),
        borderRadius: "15px",
    },

    // WARN: this is important to silence stupid message
    "& .fc .fc-license-message": { display: "none" },

    // Table Head
    "& .fc .fc-col-header ": {
        boxShadow: `inset 0 -1px 0 ${theme.palette.divider}`,
        color: theme.palette.primary.main,
        backgroundColor: alpha(theme.palette.primary.main, 0.2),
        borderTopLeftRadius: "15px",
        borderTopRightRadius: "15px",
        "& th": { borderColor: "transparent" },
        "& .fc-col-header-cell-cushion": {
            ...theme.typography.body2,
            fontWeight: "700",
            padding: "13px 0",
        },
    },

    // Week & Day View
    "& .fc .fc-timegrid-axis-cushion": {
        ...theme.typography.body2,
        color: theme.palette.text.secondary,
    },
    "& .fc .fc-timegrid-slot-label-cushion": {
        ...theme.typography.body2,
    },
}));

export default StyledCalendar;
