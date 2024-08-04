"use client";

import Grid from "@mui/material/Grid";
import AppointmentsList from "@/components/Appointments";
import AlmostOutOfStock from "./AlmostOutOf";
import { SectionHeader } from "@/components/Section";

const VetDashboard = () => (
    <Grid container spacing={5}>
        <Grid item xs={12} lg={6} gap={1}>
            <SectionHeader
                title="Today's Appointments"
                icon=""
                color="primary"
                borderRadius="10px 10px 0 0"
            />

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
