import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Skeleton } from "@mui/material";

export default async function Home() {
    return (
        <Box py={1}>
            <Typography variant="h4" my={4} color="primary.main">
                Welcome <Skeleton width="150px" height="30px" />{" "}
                <Skeleton width="150px" height="30px" />
            </Typography>
        </Box>
    );
}
