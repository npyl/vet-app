import Iconify from "@/components/iconify";
import { SpaceBetween } from "@/components/styled";
import { Stack, StackProps, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";
import { ReactNode } from "react";

interface SectionHeaderProps extends StackProps {
    title: string;
    icon: string;
    endNode?: ReactNode;
    color?: "primary" | "warning" | "error";
}

const SectionHeader = ({
    title,
    icon,
    endNode,
    color = "primary",
    ...props
}: SectionHeaderProps) => (
    <SpaceBetween
        p={2}
        alignItems="center"
        sx={{
            backgroundColor: (theme) => alpha(theme.palette[color].main, 0.1),
        }}
        {...props}
    >
        <Stack direction="row" alignItems="center" spacing={1}>
            <Iconify icon={icon} width={30} height={30} color="primary.main" />
            <Typography
                color={(theme) => theme.palette[color].main}
                variant="h6"
            >
                {title}
            </Typography>
        </Stack>
        {endNode}
    </SpaceBetween>
);

export default SectionHeader;
