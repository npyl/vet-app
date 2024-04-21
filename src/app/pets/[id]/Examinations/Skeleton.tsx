import Grid from "@mui/material/Grid";
import Skeleton from "@mui/material/Skeleton";

const ExaminationItemSkeleton = () => (
    <Grid container spacing={2} padding={2}>
        <Grid item xs={12}>
            <Skeleton variant="text" width="40%" height={30} />
        </Grid>
        <Grid item xs={6}>
            <Skeleton variant="text" width="80%" height={30} />
            <Skeleton variant="text" width="80%" height={30} />
            <Skeleton variant="text" width="80%" height={30} />
        </Grid>
        <Grid item xs={6}>
            <Skeleton variant="text" width="80%" height={30} />
            <Skeleton variant="text" width="80%" height={30} />
            <Skeleton variant="text" width="80%" height={30} />
        </Grid>
    </Grid>
);

export default ExaminationItemSkeleton;
