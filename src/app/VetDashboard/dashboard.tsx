import { Grid, Typography } from "@mui/material";
import AppointmentsList from "../_shared/Appointments/Appointments";
import AlmostOutOfStock from "./AlmostOutOf";
import { SectionHeader } from "@/components/Section";

const VetDashboard = () => (
    <Grid container spacing={5}>
        <Grid item xs={12} lg={6} gap={1}>
            <Typography variant="h6" mb={1}>
                Today&apos;s Appointments
            </Typography>
            <AppointmentsList variant="VET" />
        </Grid>
        <Grid item xs={12} lg={6}>
            <SectionHeader
                title="Almost out of stock"
                icon=""
                color="warning"
                borderRadius="10px 10px 0 0"
            />

            <AlmostOutOfStock />
        </Grid>
    </Grid>
);

export default VetDashboard;
