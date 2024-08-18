import { useCallback, useState } from "react";
import getAppointmentsForPetById from "./getAppointmentsForPetById";
import { IAppointment } from "@/types/appointment";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import AddOrEditDialog from "../AppointmentDialog";
import Box from "@mui/material/Box";
import PaginatedList from "./PaginatedList";

interface AppointmentsListProp {
    petId: number;
}

const AppointmentsList = async ({ petId }: AppointmentsListProp) => {
    const appointments = await getAppointmentsForPetById(petId);

    // const [clickedItem, setClickedItem] = useState<IAppointment>();
    // const closeDialog = useCallback(() => setClickedItem(undefined), []);

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

            <PaginatedList appointments={appointments} />

            {/* {clickedItem ? (
                <AddOrEditDialog
                    open={!!clickedItem}
                    petId={petId}
                    appointment={clickedItem}
                    onClose={closeDialog}
                />
            ) : null} */}
        </>
    );
};

export default AppointmentsList;
