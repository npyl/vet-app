import Dialog from "@/components/Dialog";
import { Button } from "@mui/material";
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
    "&:hover": {
        backgroundColor: alpha(theme.palette.primary.main, 0.3),
        borderRadius: "15px",
        cursor: "pointer",
    },
}));

// ----------------------------------------------------------------

interface AppointmentsListProp {
    petId: number;
}

const AppointmentsList = ({ petId }: AppointmentsListProp) => {
    const { appointments } = useAppointments(petId);

    const [clickedItem, setClickedItem] = useState<IAppointment>();
    const closeDialog = useCallback(() => setClickedItem(undefined), []);

    return (
        <>
            <List>
                {appointments.map((a, i) => (
                    <StyledListItem
                        key={i}
                        label={`${i + 1}.`}
                        value={new Date(a.date).toDateString()}
                        onClick={() => setClickedItem(a)}
                    />
                ))}
            </List>

            {clickedItem ? (
                <AddOrEditDialog
                    open={!!clickedItem}
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
                <AddOrEditDialog open={isAddOpen} onClose={closeAdd} />
            ) : null}
        </>
    );
};

export default BookDialog;
