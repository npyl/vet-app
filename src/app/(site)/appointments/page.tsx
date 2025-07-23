"use client";

import { useState } from "react";
import Calendar from "./Calendar";
import WorkingHours from "./WorkingHours";
import ExaminationDialog from "../../../components/Examination";
import { useGetAppointments } from "../../../components/Examination/hook";
import WithAuth from "@/guards/WithAuth";

const Appointments = () => {
    const { mutate } = useGetAppointments();

    // a.k.a. appointmentId
    const [clickedEvent, setClickedEvent] = useState(-1);

    return (
        <>
            <WorkingHours />

            <Calendar onEventClick={setClickedEvent} />

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

export default WithAuth(Appointments);
