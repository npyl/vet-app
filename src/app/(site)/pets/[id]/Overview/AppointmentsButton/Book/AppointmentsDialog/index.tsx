import Stack from "@mui/material/Stack";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import { Toaster } from "react-hot-toast";
import { IAppointment } from "@/types/appointment";
import { DialogProps } from "@/components/Dialog/types";
import SubmitButton from "./SubmitButton";
import DateSelect from "./DateSelect";
import VetSelect from "./VetSelect";
import DialogForm from "@/components/Dialog/Form";
import createOrUpdate from "@/app/actions/appointment/createOrUpdate";
import Schema from "./Schema";
import { Suspense } from "react";

// ----------------------------------------------------------------

const SelectSkeleton = () => (
    <Skeleton width={100} height={50} animation="pulse" />
);

// ----------------------------------------------------------------

const getValues = (petId: number, appointment?: IAppointment) => ({
    id: appointment?.id,
    petId,
    vetId: appointment?.vet?.id ?? -1,
    date: appointment?.date || "",
});

interface Props extends DialogProps {
    petId: number;
    appointment?: IAppointment;
}

const AddOrEditAppointmentDialog = ({
    petId,
    appointment,
    ...props
}: Props) => {
    const values = getValues(petId, appointment);

    return (
        <DialogForm
            {...props}
            // ...
            schema={Schema}
            values={values}
            submitAction={createOrUpdate}
            // ...
            maxWidth="xs"
            title={
                <Typography>
                    {appointment
                        ? `Update appointment for ${appointment?.date ? new Date(appointment?.date).toDateString() : "..."}`
                        : "New Appointment"}
                </Typography>
            }
            content={
                <Stack mt={2} alignItems="center" width={1}>
                    <Suspense fallback={<SelectSkeleton />}>
                        <VetSelect />
                    </Suspense>
                    <DateSelect />

                    <Toaster />
                </Stack>
            }
            actions={<SubmitButton />}
        />
    );
};

export default AddOrEditAppointmentDialog;
