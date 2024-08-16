"use client";

import Grid from "@mui/material/Grid";
import AppointmentItem from "./AppointmentItem";
import { UserType } from "@/types/user";
import { Divider } from "@mui/material";
import NoAppointments from "./NoAppointments";
import Pagination from "@/components/Pagination";
import { use, useCallback, useState } from "react";
import { StyledPaper } from "./styled";
import { IAppointment } from "@/types/appointment";

const PAGE_SIZE = 5;

interface AppointmentsListProps {
    variant: UserType;
    appointmentsPromise: Promise<IAppointment[]>;
}

export const AppointmentsList = ({
    appointmentsPromise,
    variant,
}: AppointmentsListProps) => {
    const appointments = use(appointmentsPromise);

    const [page, setPage] = useState(1);
    const handlePageChange = useCallback((_: any, p: number) => setPage(p), []);

    if (appointments.length === 0) return <NoAppointments />;

    return (
        <StyledPaper elevation={15}>
            <Pagination
                page={page}
                pageSize={PAGE_SIZE}
                onChange={handlePageChange}
                Container={Grid}
                ContainerProps={{
                    container: true,
                }}
            >
                {appointments.map((a) => (
                    <Grid item key={a.id} width={1}>
                        <AppointmentItem a={a} variant={variant} />
                        <Divider />
                    </Grid>
                ))}
            </Pagination>
        </StyledPaper>
    );
};

export default AppointmentsList;
