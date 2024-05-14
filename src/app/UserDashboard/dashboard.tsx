import { Grid, Typography } from "@mui/material";
import Medication from "./Medication";
import { Appointments } from "../_shared/Appointments";

const UserDashboard = () => (
    <Grid container spacing={5}>
        <Grid item xs={12} lg={6} gap={1}>
            <Typography variant="h6" mb={1}>
                Future Appointments
            </Typography>
            <Appointments variant="USER" />
        </Grid>
        <Grid item xs={12} lg={6}>
            <Medication />
        </Grid>
    </Grid>
);

export default UserDashboard;
