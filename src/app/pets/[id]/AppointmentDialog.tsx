import Dialog from "@/components/Dialog";
import {
    RHFDatePicker,
    RHFSelect,
    RHFTimePicker,
} from "@/components/hook-form";
import { SpaceBetween } from "@/components/styled";
import useApiContext from "@/contexts/api";
import IBookAppointment from "@/types/book";
import IUser from "@/types/user";
import { IVetWorkingHours } from "@/types/workingHours";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton, Skeleton } from "@mui/lab";
import { Typography } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import dayjs from "dayjs";
import { useCallback, useMemo, useState } from "react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import useSWR, { useSWRConfig } from "swr";
import * as yup from "yup";
import { IAppointment } from "@/types/appointment";

// ----------------------------------------------------------------

const SelectVet = () => {
    const { data, isLoading } = useSWR<IUser[]>("/api/vets");

    const vets = useMemo(
        () => (Array.isArray(data) && data.length > 0 ? data : []),
        [data],
    );

    return isLoading ? (
        <Skeleton width={100} height={50} animation="pulse" />
    ) : (
        <RHFSelect label="Available vets" name="vetId">
            {vets.map(({ email, id }, i) => (
                <MenuItem key={i} value={id}>
                    {email}
                </MenuItem>
            ))}
        </RHFSelect>
    );
};

// ----------------------------------------------------------------

function disableWeekends(date: dayjs.Dayjs) {
    // 0 -> sunday, 6 -> saturday
    return date.day() === 0 || date.day() === 6;
}

const minMaxForDay = (w: IVetWorkingHours, day: number) => {
    if (day === 1) {
        return w.monday;
    } else if (day === 2) {
        return w.tuesday;
    } else if (day === 3) {
        return w.wednesday;
    } else if (day === 4) {
        return w.thursday;
    } else if (day === 5) {
        return w.friday;
    } else return [-1, -1];
};

const getSafeRange = (date: string) => [
    dayjs(date).hour(9),
    dayjs(date).hour(17),
];

const DateSelect = () => {
    const { watch } = useFormContext();

    const vetId = watch("vetId");
    const date = watch("date");

    const { data: workingHours, isLoading } = useSWR<IVetWorkingHours>(
        vetId ? `/api/vets/${vetId}/workingHours` : null,
    );

    const [minDate, maxDate] = useMemo(() => {
        if (!workingHours) return getSafeRange(date);

        const currentDay = date ? dayjs(date).day() : -1;
        if (currentDay === -1) return getSafeRange(date);

        console.log("currentDay: ", currentDay);

        const [minTime, maxTime] = minMaxForDay(workingHours, currentDay);
        if (minTime === -1 || maxTime === -1) return getSafeRange(date);

        const minDate = dayjs(date).hour(minTime);
        const maxDate = dayjs(date).hour(maxTime);

        console.log("minDate: ", minDate, " maxDate: ", maxDate);

        return [minDate, maxDate];
    }, [workingHours, date]);

    return isLoading ? (
        <Skeleton width={100} height={50} animation="pulse" />
    ) : vetId > 0 ? (
        <>
            {/* is a vet selected? */}
            <RHFDatePicker
                label="Available Dates"
                name="date"
                disablePast
                shouldDisableDate={disableWeekends}
            />

            <RHFTimePicker
                label="Time"
                name="date"
                disableFuture
                minTime={minDate}
                maxTime={maxDate}
                skipDisabled
                ampm={false}
            />
        </>
    ) : null;
};

// ----------------------------------------------------------------

const Schema = yup.object<IBookAppointment>().shape({
    vetId: yup.number().required(),
    petId: yup.number().required(),
    date: yup.string().required(),
    id: yup.number(),
});

interface Props {
    open: boolean;
    onClose: VoidFunction;

    petId: number;
    appointment?: IAppointment;
}

const AddOrEditAppointmentDialog = ({
    petId,
    appointment,
    ...props
}: Props) => {
    const { post, put } = useApiContext();
    const { mutate } = useSWRConfig();

    const [isSubmitting, setSubmitting] = useState(false);

    const methods = useForm<IBookAppointment>({
        resolver: yupResolver(Schema),
        values: {
            vetId: appointment?.vet?.id ?? -1,
            petId,
            date: appointment?.date || "",
        },
    });

    const ok = useCallback(() => {
        toast.success("Success!");
        mutate(`/api/pets/${petId}/appointments`);
    }, []);

    const handleSubmit = useCallback((d: IBookAppointment) => {
        console.log("d: ", d);

        setSubmitting(true);

        if (appointment) {
            put("/api/book", {
                body: JSON.stringify({ ...d, id: appointment.id }),
            })
                .then(ok)
                .finally(() => setSubmitting(false));
        } else {
            post("/api/book", { body: JSON.stringify(d) })
                .then(ok)
                .finally(() => setSubmitting(false));
        }
    }, []);

    return (
        <FormProvider {...methods}>
            <Dialog
                {...props}
                // ...
                submit
                onSubmit={methods.handleSubmit(handleSubmit)}
                // ...
                maxWidth="md"
                title={
                    <Typography>
                        {appointment
                            ? `Update appointment for ${appointment?.date ? new Date(appointment?.date).toDateString() : "..."}`
                            : "New Appointment"}
                    </Typography>
                }
                content={
                    <SpaceBetween mt={2} alignItems="center" width={1}>
                        <SelectVet />
                        <DateSelect />

                        <Toaster />
                    </SpaceBetween>
                }
                actions={
                    <LoadingButton
                        type="submit"
                        loading={isSubmitting}
                        variant="contained"
                    >
                        Book
                    </LoadingButton>
                }
            />
        </FormProvider>
    );
};

export default AddOrEditAppointmentDialog;
