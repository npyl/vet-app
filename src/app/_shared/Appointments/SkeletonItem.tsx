import { SpaceBetween } from "@/components/styled";
import { Skeleton, Stack } from "@mui/material";
import { UserType } from "@/types/user";

interface SkeletonItemProps {
    variant: UserType;
}

const SkeletonItem = ({ variant }: SkeletonItemProps) => (
    <SpaceBetween
        p={1}
        px={2.5}
        gap={1}
        direction="row"
        alignItems="center"
        flexWrap="wrap"
        width={1}
    >
        <Skeleton variant="text" animation="wave" width={100} />
        <Skeleton variant="text" animation="wave" width={100} />
        {variant === "USER" ? (
            <Skeleton variant="text" animation="wave" width={100} />
        ) : null}

        <Stack direction="row" spacing={1} alignItems="center">
            <Skeleton
                variant="circular"
                width={50}
                height={50}
                animation="wave"
            />
            <Skeleton variant="text" width={100} animation="wave" />
        </Stack>

        {variant === "USER" ? (
            <Stack direction="row" spacing={1} alignItems="center">
                <Skeleton
                    variant="circular"
                    width={50}
                    height={50}
                    animation="wave"
                />
                <Skeleton variant="text" width={100} animation="wave" />
            </Stack>
        ) : null}
    </SpaceBetween>
);

export default SkeletonItem;
