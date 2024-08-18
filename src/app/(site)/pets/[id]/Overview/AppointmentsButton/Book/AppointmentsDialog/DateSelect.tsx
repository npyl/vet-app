"use client";

import { RHFDatePicker, RHFTimePicker } from "@/components/hook-form";
import { IVetWorkingHours } from "@/types/workingHours";
import { Skeleton } from "@mui/lab";
import dayjs from "dayjs";
import { useMemo } from "react";
import { useFormContext } from "react-hook-form";
import useSWR from "swr";

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
        vetId && vetId > -1 ? `/api/vets/${vetId}/workingHours` : null,
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

export default DateSelect;
