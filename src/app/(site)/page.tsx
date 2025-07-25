import VetDashboard from "@/sections/VetDashboard";
import UserDashboard from "@/sections/UserDashboard";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import getProfile from "@/util/getProfile";
import WithAuth from "@/guards/WithAuth";

async function Home() {
    const user = await getProfile();
    if (!user) return null;

    return (
        <Box py={1}>
            <Typography variant="h4" my={4} color="primary.main">
                Welcome {`${user?.firstName} ${user?.lastName}`}
            </Typography>

            {user?.type === "VET" ? <VetDashboard /> : <UserDashboard />}
        </Box>
    );
}

export default WithAuth(Home);
