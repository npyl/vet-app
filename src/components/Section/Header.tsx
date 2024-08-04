import Iconify from "@/components/iconify";
import Typography from "@mui/material/Typography";
import Stack, { StackProps } from "@mui/material/Stack";
import { ReactNode } from "react";
import StyledSpaceBetween from "./styled";

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
    <StyledSpaceBetween {...props} color={color}>
        <Stack direction="row" alignItems="center" spacing={1}>
            <Iconify icon={icon} width={30} height={30} color="primary.main" />
            <Typography color={color} variant="h6">
                {title}
            </Typography>
        </Stack>
        {endNode}
    </StyledSpaceBetween>
);

export default SectionHeader;
