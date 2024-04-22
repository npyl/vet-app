import Iconify from "@/components/iconify";
import { SpaceBetween } from "@/components/styled";
import { Stack, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";
import { ReactNode } from "react";

interface SectionHeaderProps {
    title: string;
    icon: string;
    endNode?: ReactNode;
}

const SectionHeader = ({ title, icon, endNode }: SectionHeaderProps) => (
    <SpaceBetween
        p={2}
        alignItems="center"
        sx={{
            backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.1),
        }}
    >
        <Stack direction="row" alignItems="center" spacing={1}>
            <Iconify icon={icon} width={30} height={30} color="primary.main" />
            <Typography color="primary.main" variant="h6">
                {title}
            </Typography>
        </Stack>
        {endNode}
    </SpaceBetween>
);

export default SectionHeader;
