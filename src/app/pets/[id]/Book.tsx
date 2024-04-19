import Dialog from "@/components/Dialog";
import { Box, Button, CircularProgress, Stack } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useCallback, useState } from "react";
import { useAppointments } from "./hook";
import { List, ListItem } from "@/components/List";
import { styled, alpha } from "@mui/material/styles";
import useDialog from "@/hooks/useDialog";
import AddOrEditDialog from "./AddOrEdit";
import { IAppointment } from "@/types/appointment";

// ----------------------------------------------------------------

const StyledListItem = styled(ListItem)(({ theme }) => ({
    borderRadius: "15px",
    "&:hover": {
        backgroundColor: alpha(theme.palette.primary.main, 0.1),
        color: theme.palette.primary.main,
        cursor: "pointer",
    },
}));

const StyledList = styled(List)(({ theme }) => ({
    borderRadius: "15px",
    border: "1px solid",
    borderColor: alpha(theme.palette.primary.main, 0.4),
}));

// ----------------------------------------------------------------

interface AppointmentsListProp {
    petId: number;
}

const AppointmentsList = ({ petId }: AppointmentsListProp) => {
    const { appointments, isLoading } = useAppointments(petId);

    const [clickedItem, setClickedItem] = useState<IAppointment>();
    const closeDialog = useCallback(() => setClickedItem(undefined), []);

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

            <StyledList>
                {appointments.map((a, i) => (
                    <StyledListItem
                        key={i}
                        label={`${i + 1}.`}
                        value={new Date(a.date).toDateString()}
                        onClick={() => setClickedItem(a)}
                    />
                ))}
            </StyledList>

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
                                // TODO: all these are hardcoded...
                                position: "absolute",
                                mr: 10,
                                top: 15,
                                right: 0,
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
