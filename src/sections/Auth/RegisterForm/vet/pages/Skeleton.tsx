import Stack from "@mui/material/Stack";
import Skeleton from "@mui/material/Skeleton";

const PageSkeleton = () => (
    <Stack m="auto" width={1} spacing={1}>
        <Skeleton variant="text" width={210} height={40} />
        <Skeleton
            variant="rectangular"
            height={30}
            sx={{
                borderRadius: "15px",
            }}
        />
        <Skeleton
            variant="rectangular"
            height={30}
            sx={{
                borderRadius: "15px",
                width: 1,
            }}
        />
        <Skeleton
            variant="rectangular"
            height={30}
            sx={{
                borderRadius: "15px",
            }}
        />
        <Skeleton
            variant="rectangular"
            height={30}
            sx={{
                borderRadius: "15px",
            }}
        />
    </Stack>
);

export default PageSkeleton;
