"use client";
import { useState } from "react";
import Calendar from "./Calendar";
import WorkingHours from "./WorkingHours";
import ExaminationDialog from "../_shared/Examination";

const Appointments = () => {
    const [clickedEvent, setClickedEvent] = useState(-1);

    return (
        <>
            <WorkingHours />
            <Calendar onEventClick={setClickedEvent} />

            {/* Examination Record */}
            {clickedEvent !== -1 ? (
                <ExaminationDialog
                    open={clickedEvent !== -1}
                    eventId={clickedEvent}
                    onClose={() => setClickedEvent(-1)}
                />
            ) : null}
        </>
    );
};

export default Appointments;
