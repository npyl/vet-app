import { Grid } from "@mui/material";
import Calendar from "./Calendar";
import AlmostOutOfStock from "./AlmostOutOf";
import { SectionHeader } from "@/components/Section";

const VetDashboard = () => (
    <Grid container spacing={1}>
        <Grid item xs={12} lg={6}>
            <Calendar onEventClick={() => {}} />
        </Grid>
        <Grid item xs={12} lg={6}>
            <SectionHeader
                title="Almost out of stock"
                icon=""
                color="warning"
            />

            <AlmostOutOfStock />
        </Grid>
    </Grid>
);

export default VetDashboard;
