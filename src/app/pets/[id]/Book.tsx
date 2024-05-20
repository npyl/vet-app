import Dialog from "@/components/Dialog";
import { Box, Button, CircularProgress, Stack } from "@mui/material";
import Pagination from "@/components/Pagination";
import Typography from "@mui/material/Typography";
import { useCallback, useState } from "react";
import { useAppointments } from "./hook";
import { styled, alpha } from "@mui/material/styles";
import useDialog from "@/hooks/useDialog";
import AddOrEditDialog from "./AppointmentDialog";
import { IAppointment } from "@/types/appointment";
import { AppointmentItem } from "@/app/_shared/Appointments";

// ----------------------------------------------------------------

const StyledList = styled(Stack)(({ theme }) => ({
    borderRadius: "15px",
    border: "1px solid",
    borderColor: alpha(theme.palette.primary.main, 0.4),
}));

// ----------------------------------------------------------------

const PAGE_SIZE = 5;

interface AppointmentsListProp {
    petId: number;
}

const AppointmentsList = ({ petId }: AppointmentsListProp) => {
    const { appointments, isLoading } = useAppointments(petId);

    const [clickedItem, setClickedItem] = useState<IAppointment>();
    const closeDialog = useCallback(() => setClickedItem(undefined), []);

    const [page, setPage] = useState(1);
    const handlePageChange = useCallback((_: any, p: number) => setPage(p), []);

    if (isLoading) {
        return (
            <Stack mt={4} alignItems="center">
                <CircularProgress />
            </Stack>
        );
    }

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

interface Props {
    open: boolean;
    onClose: VoidFunction;

    petId: number;
}

const BookDialog = ({ petId, ...props }: Props) => {
    const [isAddOpen, openAdd, closeAdd] = useDialog();

    return (
        <>
            <Dialog
                {...props}
                // ...
                maxWidth="md"
                title={
                    <>
                        <Typography variant="h6">Appointments</Typography>

                        <Button
                            variant="contained"
                            sx={{
                                position: "absolute",
                                transform: "translateY(-50%)",
                                top: "50%",
                                right: 10,
                            }}
                            onClick={openAdd}
                        >
                            Add
                        </Button>
                    </>
                }
                content={<AppointmentsList petId={petId} />}
            />

            {isAddOpen ? (
                <AddOrEditDialog
                    open={isAddOpen}
                    petId={petId}
                    onClose={closeAdd}
                />
            ) : null}
        </>
    );
};

export default BookDialog;
