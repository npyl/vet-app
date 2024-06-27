import Grid from "@mui/material/Grid";
import Medication from "./Medication";
import Appointments from "../_shared/Appointments";
import SectionHeader from "@/components/Section/Header";

const UserDashboard = () => (
    <Grid container spacing={5}>
        <Grid item xs={12} lg={6} gap={1}>
            <SectionHeader
                title="Upcoming Appointments"
                icon=""
                color="primary"
                borderRadius="10px 10px 0 0"
            />

            <Appointments variant="USER" />
        </Grid>
        <Grid item xs={12} lg={6}>
            <SectionHeader
                title="Current medication"
                icon=""
                color="primary"
                borderRadius="10px 10px 0 0"
            />

            <Medication />
        </Grid>
    </Grid>
);

export default UserDashboard;
