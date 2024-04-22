import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Divider, Skeleton } from "@mui/material";
import { List, ListSkeletonItem } from "@/components/List";

const ProfileSkeleton = () => (
    <Container maxWidth="md">
        <Paper
            elevation={20}
            sx={{
                mt: 2,
                position: "relative",
                border: "1px solid #eee",
            }}
        >
            <Stack p={2} alignItems="center">
                <Box position="relative">
                    <Skeleton
                        variant="circular"
                        animation="wave"
                        sx={{
                            height: "150px",
                            width: "150px",
                        }}
                    />
                </Box>

                <Skeleton
                    variant="text"
                    width="150px"
                    height="50px"
                    sx={{
                        mt: 1,
                    }}
                />
            </Stack>
            <Divider />
            <Grid container mb={2}>
                <Grid item xs={6}>
                    <List>
                        <ListSkeletonItem />
                        <ListSkeletonItem />
                        <ListSkeletonItem />
                    </List>
                </Grid>
                <Grid item xs={6}>
                    <List>
                        <ListSkeletonItem />
                        <ListSkeletonItem />
                        <ListSkeletonItem />
                    </List>
                </Grid>
            </Grid>
        </Paper>
    </Container>
);

export default ProfileSkeleton;
