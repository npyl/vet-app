import { Box, Tooltip, TooltipProps, Typography, alpha } from "@mui/material";
import { styled } from "@mui/material/styles";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

const StyledErrorOutlineIcon = styled(ErrorOutlineIcon)(({ theme }) => ({
    padding: theme.spacing(0.1),
    borderRadius: "100%",
    backgroundColor: alpha(theme.palette.error.main, 0.1),
    color: theme.palette.error.main,
    "& .MuiAlert-icon": {
        color: theme.palette.error.main,
    },
}));

interface ErrorTooltipProps extends Omit<TooltipProps, "title"> {
    error: string;
}

const ErrorTooltip = ({ error, children, sx, ...props }: ErrorTooltipProps) => {
    return (
        <Box position="relative">
            {children}

            {error ? (
                <Tooltip
                    title={<Typography>{error}</Typography>}
                    sx={{
                        position: "absolute",
                        transform: "translateY(-50%)",
                        top: "55%",
                        right: 4,
                        ...sx,
                    }}
                    {...props}
                >
                    <Box bgcolor="background.paper" p={0} borderRadius="100%">
                        <StyledErrorOutlineIcon />
                    </Box>
                </Tooltip>
            ) : null}
        </Box>
    );
};

export default ErrorTooltip;
