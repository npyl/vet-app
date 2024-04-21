"use client";

import { useMemo, useState } from "react";
import Calendar from "./Calendar";
import WorkingHours from "./WorkingHours";
import ExaminationDialog from "../_shared/Examination";
import useAuth from "@/hooks/useAuth";
import useSWR from "swr";
import { IAppointment } from "@/types/appointment";
import ICalendarEvent2EventSourceInput from "./constants";

const Appointments = () => {
    const { user } = useAuth();

    // a.k.a. appointmentId
    const [clickedEvent, setClickedEvent] = useState(-1);

    const { data, mutate } = useSWR<IAppointment[]>(
        user?.id ? `/api/vets/${user.id}/appointments` : null,
    );

    const events = useMemo(
        () =>
            Array.isArray(data)
                ? data.map(ICalendarEvent2EventSourceInput)
                : [],
        [data],
    );

    return (
        <>
            <WorkingHours />

            <Calendar events={events} onEventClick={setClickedEvent} />

            {/* Examination Record */}
            {clickedEvent !== -1 ? (
                <ExaminationDialog
                    open={clickedEvent !== -1}
                    appointmentId={clickedEvent}
                    onClose={() => setClickedEvent(-1)}
                    onMutate={mutate}
                />
            ) : null}
        </>
    );
};

export default Appointments;
