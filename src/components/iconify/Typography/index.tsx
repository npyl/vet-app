import { BoxProps } from "@mui/material/Box";
import Stack, { StackProps } from "@mui/material/Stack";
import Typography, { TypographyProps } from "@mui/material/Typography";
import Iconify from "../iconify";

interface IconTypographyProps extends TypographyProps {
    icon: string;
    iconProps?: Omit<BoxProps, "ref">;
    stackProps?: StackProps;
}

const IconTypography = ({
    icon,
    iconProps,
    children,
    stackProps,
    ...other
}: IconTypographyProps) => (
    <Stack direction="row" spacing={1} alignItems="center" {...stackProps}>
        <Iconify icon={icon} width={20} height={20} {...iconProps} />
        <Typography {...other}>{children}</Typography>
    </Stack>
);

export default IconTypography;
