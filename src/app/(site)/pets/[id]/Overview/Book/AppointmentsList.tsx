"use client";

import { useCallback, useState } from "react";
import getAppointmentsForPetById from "./getAppointmentsForPetById";
import { IAppointment } from "@/types/appointment";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Pagination from "@/components/Pagination";
import StyledList from "./styled";
import AppointmentItem from "@/components/Appointments/AppointmentItem";
import AddOrEditDialog from "./AppointmentDialog";
import Box from "@mui/material/Box";

const PAGE_SIZE = 5;

interface AppointmentsListProp {
    petId: number;
}

const AppointmentsList = async ({ petId }: AppointmentsListProp) => {
    const appointments = await getAppointmentsForPetById(petId);

    const [clickedItem, setClickedItem] = useState<IAppointment>();
    const closeDialog = useCallback(() => setClickedItem(undefined), []);

    const [page, setPage] = useState(1);
    const handlePageChange = useCallback((_: any, p: number) => setPage(p), []);

    if (appointments.length === 0) {
        return (
            <Stack mt={4} alignItems="center">
                <Typography>No appointments booked yet!</Typography>
            </Stack>
        );
    }

    return (
        <>
            <Box mt={4} />

            <Pagination
                page={page}
                pageSize={PAGE_SIZE}
                onChange={handlePageChange}
                Container={StyledList}
            >
                {appointments.map((a) => (
                    <AppointmentItem key={a.id} a={a} noPet variant="USER" />
                ))}
            </Pagination>

            {clickedItem ? (
                <AddOrEditDialog
                    open={!!clickedItem}
                    petId={petId}
                    appointment={clickedItem}
                    onClose={closeDialog}
                />
            ) : null}
        </>
    );
};

export default AppointmentsList;
