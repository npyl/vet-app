import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";

export default async function Home() {
    return (
        <Stack direction="row" alignItems="center" spacing={1} py={1}>
            <Typography variant="h4" my={4} color="primary.main">
                Welcome
            </Typography>
            <Skeleton width="150px" height="30px" />{" "}
            <Skeleton width="150px" height="30px" />
        </Stack>
    );
}
