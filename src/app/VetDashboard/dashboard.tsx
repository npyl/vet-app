import { Grid, Typography } from "@mui/material";
import AppointmentsList from "./Appointments";
import AlmostOutOfStock from "./AlmostOutOf";
import { SectionHeader } from "@/components/Section";

const VetDashboard = () => (
    <Grid container spacing={5}>
        <Grid item xs={12} lg={6} gap={1}>
            <Typography variant="h5">Today&apos;s Appointments</Typography>
            <AppointmentsList />
        </Grid>
        <Grid item xs={12} lg={6}>
            <SectionHeader
                title="Almost out of stock:"
                icon=""
                color="warning"
            />

            <AlmostOutOfStock />
        </Grid>
    </Grid>
);

export default VetDashboard;
