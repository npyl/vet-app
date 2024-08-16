import Grid from "@mui/material/Grid";
import Medication from "./Medication";
import Appointments from "@/components/Appointments";
import SectionHeader from "@/components/Section/Header";
import { Suspense } from "react";
import MedicationSkeleton from "./MedicationSkeleton";
import AppointmentsSkeleton from "../../components/Appointments/Skeleton";
import getCurrentMedication from "./getCurrentMedication";
import getUpcomingAppointments from "@/components/Appointments/getUpcomingAppointments";

const UserDashboard = () => {
    const medication = getCurrentMedication();
    const appointments = getUpcomingAppointments();

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
                    <Appointments
                        appointmentsPromise={appointments}
                        variant="USER"
                    />
                </Suspense>
            </Grid>
            <Grid item xs={12} lg={6}>
                <SectionHeader
                    title="Current medication"
                    icon=""
                    color="primary"
                    borderRadius="10px 10px 0 0"
                />

                <Suspense fallback={<MedicationSkeleton />}>
                    <Medication data={medication} />
                </Suspense>
            </Grid>
        </Grid>
    );
};

export default UserDashboard;
