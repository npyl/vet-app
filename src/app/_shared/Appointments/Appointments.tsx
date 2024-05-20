import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import AppointmentItem from "./AppointmentItem";
import { paper } from "@/theme/css";
import { UserType } from "@/types/user";
import { Divider } from "@mui/material";
import useGetAppointments from "./hook";
import SkeletonItem from "./SkeletonItem";
import NoAppointments from "./NoAppointments";

interface AppointmentsListProps {
    variant: UserType;
}

export const AppointmentsList = ({ variant }: AppointmentsListProps) => {
    const { appointments, isLoading } = useGetAppointments();

    if (!isLoading && appointments.length === 0) return <NoAppointments />;

    return (
        <Grid
            component={Paper}
            container
            sx={(theme) => ({
                ...paper(theme.palette.background.paper),
            })}
            elevation={15}
        >
            {isLoading ? <SkeletonItem variant={variant} /> : null}
            {isLoading ? <SkeletonItem variant={variant} /> : null}
            {isLoading ? <SkeletonItem variant={variant} /> : null}

            {appointments.map((a) => (
                <Grid item key={a.id} width={1}>
                    <AppointmentItem a={a} variant={variant} />
                    <Divider />
                </Grid>
            ))}
        </Grid>
    );
};

export default AppointmentsList;
