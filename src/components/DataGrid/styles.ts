import { alpha, styled } from "@mui/material/styles";
import { DataGrid } from "@mui/x-data-grid";

export const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
    border: 0,
    borderRadius: 10,
    backgroundColor:
        theme.palette.mode === "light"
            ? theme.palette.neutral![100]
            : theme.palette.neutral![800],
    color:
        theme.palette.mode === "light"
            ? "rgba(0,0,0,.85)"
            : "rgba(255,255,255,0.85)",
    fontFamily: [
        "-apple-system",
        "BlinkMacSystemFont",
        '"Segoe UI"',
        "Roboto",
        '"Helvetica Neue"',
        "Arial",
        "sans-serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
    ].join(","),
    WebkitFontSmoothing: "auto",
    letterSpacing: "normal",
    "& .MuiDataGrid-columnsContainer": {
        backgroundColor: theme.palette.mode === "light" ? "#fafafa" : "#1d1d1d",
    },
    "& .MuiDataGrid-iconSeparator": {
        display: "none",
    },
    "& .MuiDataGrid-columnsContainer, .MuiDataGrid-cell": {
        borderBottom: `1px solid ${
            theme.palette.mode === "light" ? "#f0f0f0" : "#303030"
        }`,
    },

    "& .MuiPaginationItem-root": {
        borderRadius: 0,
    },
    "& .MuiDataGrid-cell:focus-within, & .MuiDataGrid-cell:focus": {
        outline: "none !important",
    },
    "& .MuiDataGrid-columnHeader:focus-within, & .MuiDataGrid-columnHeader:focus":
        {
            outline: "none !important",
        },

    "& .MuiDataGrid-row": {
        backgroundColor: theme.palette.background.paper,
    },

    "& .MuiDataGrid-row:hover": {
        cursor: "pointer",
        backgroundColor: `${alpha(theme.palette.primary.light, 0.2)} !important`,
        borderRadius: "10px",
    },
}));
