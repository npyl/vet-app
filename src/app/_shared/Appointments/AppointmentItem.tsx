import IconTypography from "@/components/iconify/Typography";
import { SpaceBetween } from "@/components/styled";
import { IAppointment } from "@/types/appointment";
import { Avatar, Stack, Typography, alpha } from "@mui/material";
import Link from "next/link";
import MuiLink from "@mui/material/Link";
import { UserType } from "@/types/user";

interface AppointmentItemProps {
    a: IAppointment;
    variant: UserType;
    noPet?: boolean;
}

const AppointmentItem = ({
    a,
    variant,
    noPet = false,
}: AppointmentItemProps) => (
    <SpaceBetween
        p={1}
        px={2.5}
        gap={1}
        direction="row"
        alignItems="center"
        flexWrap="wrap"
    >
        {variant === "USER" ? (
            <IconTypography
                icon="carbon:time"
                iconProps={{
                    width: 20,
                    height: 20,
                    color: "warning.main",
                }}
                bgcolor={(theme) => alpha(theme.palette.warning.main, 0.1)}
                borderRadius="15px"
                px={1}
                stackProps={{
                    color: "warning.main",
                    spacing: 0.3,
                }}
                fontWeight={500}
            >
                {new Date(a?.date).toLocaleDateString()}
            </IconTypography>
        ) : null}

        <Typography
            bgcolor={(theme) => alpha(theme.palette.primary.main, 0.3)}
            borderRadius="15px"
            color="primary.main"
            fontWeight={500}
            px={1}
        >
            {new Date(a?.date).toLocaleTimeString()}
        </Typography>

        <IconTypography
            icon="carbon:time"
            iconProps={{
                width: 20,
                height: 20,
                color: "warning.main",
            }}
            bgcolor={(theme) => alpha(theme.palette.warning.main, 0.1)}
            borderRadius="15px"
            px={1}
            stackProps={{
                color: "warning.main",
                spacing: 0.3,
            }}
            fontWeight={500}
        >
            1 hour
        </IconTypography>

        {noPet ? null : (
            <MuiLink
                component={Link}
                href={`/pets/${a?.pet?.id}`}
                sx={{
                    "&:hover": {
                        backgroundColor: (theme) =>
                            alpha(theme.palette.primary.main, 0.3),
                        cursor: "pointer",
                    },
                }}
                p={1}
                borderRadius="15px"
            >
                <Stack direction="row" spacing={1} alignItems="center">
                    <Avatar
                        src={a?.pet?.photo || ""}
                        sx={{
                            width: 50,
                            height: 50,
                        }}
                    />
                    <Typography variant="subtitle2">
                        {a?.pet?.name || ""}
                    </Typography>
                </Stack>
            </MuiLink>
        )}

        {variant === "USER" ? (
            <MuiLink
                component={Link}
                href={`/profile/${a?.vet?.id}`}
                sx={{
                    "&:hover": {
                        backgroundColor: (theme) =>
                            alpha(theme.palette.primary.main, 0.3),
                        cursor: "pointer",
                    },
                }}
                p={1}
                borderRadius="15px"
            >
                <Stack direction="row" spacing={1} alignItems="center">
                    <Avatar
                        src={a?.vet?.avatar || ""}
                        sx={{
                            width: 50,
                            height: 50,
                        }}
                    />
                    <Typography variant="subtitle2">
                        {a?.vet?.email || ""}
                    </Typography>
                </Stack>
            </MuiLink>
        ) : null}
    </SpaceBetween>
);

export default AppointmentItem;
