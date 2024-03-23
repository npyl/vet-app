// @mui
import { Stack, StackProps, Typography } from "@mui/material";
//

// ----------------------------------------------------------------------

interface EmptyContentProps extends StackProps {
    title: string;

    description?: string;
}

export default function EmptyContent({
    title,
    description,
    sx,
    ...other
}: EmptyContentProps) {
    return (
        <Stack
            alignItems="center"
            justifyContent="center"
            sx={{
                height: 1,
                textAlign: "center",
                p: (theme) => theme.spacing(8, 2),
                ...sx,
            }}
            {...other}
        >
            <Typography variant="h5" gutterBottom>
                {title}
            </Typography>

            {description && (
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    {description}
                </Typography>
            )}
        </Stack>
    );
}
