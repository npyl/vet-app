import Dialog from "@/components/Dialog";
import { RHFDatePicker, RHFSelect } from "@/components/hook-form";
import { SpaceBetween } from "@/components/styled";
import useApiContext from "@/contexts/api";
import IBookAppointment from "@/types/book";
import IUser from "@/types/user";
import { IVetWorkingHours } from "@/types/workingHours";
import { yupResolver } from "@hookform/resolvers/yup";
import LoadingButton from "@mui/lab/LoadingButton";
import { MenuItem, Skeleton } from "@mui/material";
import Typography from "@mui/material/Typography";
import { TimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { useCallback, useMemo } from "react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import useSWR from "swr";
import * as yup from "yup";

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
        vetId ? `/api/vets/workingHours/${vetId}` : null,
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

            <TimePicker
                name="date"
                disableFuture
                minTime={minDate}
                maxTime={maxDate}
            />
        </>
    ) : null;
};

// ----------------------------------------------------------------

const Schema = yup.object<IBookAppointment>().shape({
    vetId: yup.number().required(),
    petId: yup.number().required(),
    date: yup.string().required(),
});

interface Props {
    open: boolean;
    onClose: VoidFunction;

    petId: number;
}

const BookDialog = ({ petId, ...props }: Props) => {
    const { post } = useApiContext();

    const methods = useForm<IBookAppointment>({
        resolver: yupResolver(Schema),
        values: {
            vetId: -1,
            petId,
            date: "",
        },
    });

    const handleSubmit = useCallback((d: IBookAppointment) => {
        console.log("d: ", d);

        post("/api/book", { body: JSON.stringify(d) });
    }, []);

    return (
        <FormProvider {...methods}>
            <Dialog
                {...props}
                // ...
                submit
                onSubmit={methods.handleSubmit(handleSubmit)}
                // ...
                maxWidth="sm"
                title={<Typography variant="h6">Book Appointment</Typography>}
                content={
                    <SpaceBetween
                        mt={2}
                        spacing={1}
                        alignItems="center"
                        width={1}
                    >
                        <SelectVet />
                        <DateSelect />
                    </SpaceBetween>
                }
                actions={
                    <LoadingButton
                        type="submit"
                        variant="contained"
                        disabled={false}
                        loading={false}
                    >
                        Book
                    </LoadingButton>
                }
            />
        </FormProvider>
    );
};

export default BookDialog;
