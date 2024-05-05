"use client";
import FullCalendar from "@fullcalendar/react"; // EventInput, // EventDropArg, // DateSelectArg, // => request placed at the top
import timeGridPlugin from "@fullcalendar/timegrid";
import { useRef, useCallback, useMemo } from "react";
// @mui
import { alpha } from "@mui/material";

// sections
import { StyledCalendar } from "@/components/Calendar";

import { EventClickArg } from "@fullcalendar/common";
import { useTheme } from "@mui/material";
import ICalendarEvent2EventSourceInput from "./constants";
import useGetTodaysAppointments from "./hook";
import RenderEvent from "./Event";

// ----------------------------------------------------------------------

export type ICalendarView =
    | "dayGridMonth"
    | "timeGridWeek"
    | "timeGridDay"
    | "listWeek";

const view: ICalendarView = "timeGridDay";

interface CalendarProps {
    onEventClick: (id: number) => void;
}

export default function Calendar({ onEventClick }: CalendarProps) {
    const calendarRef = useRef<FullCalendar>(null);

    const { appointments } = useGetTodaysAppointments();

    const events = useMemo(
        () =>
            Array.isArray(appointments)
                ? appointments.map(ICalendarEvent2EventSourceInput)
                : [],
        [appointments],
    );

    const handleEventClick = useCallback(
        (e: EventClickArg) => onEventClick(+e.event.id),
        [],
    );

    const theme = useTheme();

    return (
        <>
            <StyledCalendar>
                <FullCalendar
                    // ---
                    height="auto"
                    allDaySlot={false}
                    // weekends={false}
                    editable={false}
                    droppable={false}
                    selectable
                    // ---
                    ref={calendarRef}
                    initialView={view}
                    dayMaxEventRows={3}
                    headerToolbar={false}
                    plugins={[timeGridPlugin]}
                    // ---
                    eventResizableFromStart
                    initialEvents={[]}
                    events={events}
                    eventDisplay="block"
                    eventColor="transparent"
                    eventTextColor={theme.palette.primary.main}
                    eventBackgroundColor={alpha(
                        theme.palette.primary.main,
                        0.3,
                    )}
                    eventContent={RenderEvent}
                    eventClick={handleEventClick as any}
                    eventResize={() => {}}
                    // ---
                    slotMinTime="08:00:00"
                    slotMaxTime="23:00:00"
                />
            </StyledCalendar>
        </>
    );
}
