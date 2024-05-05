import useGetTodaysAppointments from "./hook";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import AppointmentItem from "./AppointmentItem";
import { paper } from "@/theme/css";

export const Appointments = () => {
    const { appointments } = useGetTodaysAppointments();

    return (
        <Grid
            component={Paper}
            container
            sx={(theme) => ({
                ...paper(theme.palette.background.paper),
            })}
            elevation={15}
        >
            {appointments.map((a) => (
                <Grid item key={a.id} width={1}>
                    <AppointmentItem a={a} />
                </Grid>
            ))}
        </Grid>
    );
};

export default Appointments;
