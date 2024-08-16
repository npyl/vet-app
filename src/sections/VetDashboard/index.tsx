import Grid from "@mui/material/Grid";
import AppointmentsList from "@/components/Appointments";
import AlmostOutOfStock from "./AlmostOutOf";
import { SectionHeader } from "@/components/Section";
import { Suspense } from "react";
import DataGridSkeleton from "@/components/DataGrid/Skeleton";
import getAlmostOutOfStock from "./getAlmostOutOfStock";
import getUpcomingAppointments from "@/components/Appointments/getUpcomingAppointments";
import AppointmentsSkeleton from "@/components/Appointments/Skeleton";

const VetDashboard = async () => {
    const almostOutOfStock = getAlmostOutOfStock();
    const upcomingAppointments = getUpcomingAppointments();

    return (
        <Grid container spacing={5}>
            <Grid item xs={12} lg={6} gap={1}>
                <SectionHeader
                    title="Upcoming Appointments"
                    icon=""
                    color="primary"
                    borderRadius="10px 10px 0 0"
                />

                <Suspense fallback={<AppointmentsSkeleton />}>
                    <AppointmentsList
                        appointmentsPromise={upcomingAppointments}
                        variant="VET"
                    />
                </Suspense>
            </Grid>
            <Grid item xs={12} lg={6}>
                <SectionHeader
                    title="Almost out of stock"
                    icon=""
                    color="warning"
                    borderRadius="10px 10px 0 0"
                />

                <Suspense fallback={<DataGridSkeleton />}>
                    <AlmostOutOfStock data={almostOutOfStock} />
                </Suspense>
            </Grid>
        </Grid>
    );
};

export default VetDashboard;
