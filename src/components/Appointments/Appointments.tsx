"use client";

import Grid from "@mui/material/Grid";
import AppointmentItem from "./AppointmentItem";
import { UserType } from "@/types/user";
import { Divider } from "@mui/material";
import useGetAppointments from "./hook";
import SkeletonItem from "./SkeletonItem";
import NoAppointments from "./NoAppointments";
import Pagination from "@/components/Pagination";
import { useCallback, useState } from "react";
import { StyledPaper } from "./styled";

const PAGE_SIZE = 5;

interface AppointmentsListProps {
    variant: UserType;
}

export const AppointmentsList = ({ variant }: AppointmentsListProps) => {
    const { appointments, isLoading } = useGetAppointments();

    const [page, setPage] = useState(1);
    const handlePageChange = useCallback((_: any, p: number) => setPage(p), []);

    if (!isLoading && appointments.length === 0) return <NoAppointments />;

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
                {isLoading ? <SkeletonItem variant={variant} /> : null}
                {isLoading ? <SkeletonItem variant={variant} /> : null}
                {isLoading ? <SkeletonItem variant={variant} /> : null}

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
