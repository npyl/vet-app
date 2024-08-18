import Dialog from "@/components/Dialog";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import { Suspense } from "react";
import AddOrEditDialog from "./AppointmentsDialog";
import { DialogProps } from "@/components/Dialog/types";
import AppointmentsList from "./AppointmentsList";
import DialogButton from "@/components/Dialog/Button";

// ----------------------------------------------------------------

interface Props extends DialogProps {
    petId: number;
}

const BookDialog = ({ petId, ...props }: Props) => (
    <Dialog
        {...props}
        // ...
        maxWidth="md"
        title={
            <>
                <Typography variant="h6">Appointments</Typography>

                <DialogButton
                    variant="contained"
                    sx={{
                        position: "absolute",
                        transform: "translateY(-50%)",
                        top: "50%",
                        right: 10,
                    }}
                    label="Add"
                >
                    <AddOrEditDialog petId={petId} />
                </DialogButton>
            </>
        }
        content={
            <Suspense
                fallback={
                    <Stack mt={4} alignItems="center">
                        <CircularProgress />
                    </Stack>
                }
            >
                <AppointmentsList petId={petId} />
            </Suspense>
        }
    />
);

export default BookDialog;
