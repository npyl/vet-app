"use client";
import FullCalendar from "@fullcalendar/react"; // EventInput, // EventDropArg, // DateSelectArg, // => request placed at the top
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import timelinePlugin from "@fullcalendar/timeline";
//
import { useState, useRef, useCallback, useMemo } from "react";
// next
import Head from "next/head";
// @mui
import {
    Avatar,
    Button,
    Stack,
    Tooltip,
    Typography,
    alpha,
} from "@mui/material";

// sections
import { StyledCalendar, CalendarToolbar } from "@/components/Calendar";

import { EventClickArg, EventContentArg } from "@fullcalendar/common";
import { useTheme } from "@mui/material";
import Iconify from "@/components/iconify";
import { useGetAppointments } from "../../../components/Examination/hook";
import ICalendarEvent2EventSourceInput from "./constants";

// ----------------------------------------------------------------------

const RenderEvent = (e: EventContentArg) => {
    const { avatar, completed, petId } = e?.event?.extendedProps || {};

    return (
        <Tooltip
            title={
                <Stack>
                    <Typography>Want to see this pet?</Typography>
                    <Button variant="contained" href={`/pets/${petId}`}>
                        Go
                    </Button>
                </Stack>
            }
        >
            <Stack
                direction="row"
                spacing={1}
                py={0.2}
                position="relative"
                sx={{
                    cursor: "pointer",
                }}
            >
                <Avatar
                    src={avatar || ""}
                    sx={{
                        width: 35,
                        height: 35,
                    }}
                />

                <Typography fontWeight="bold" overflow="hidden">
                    {e?.event?.title}
                </Typography>

                {completed ? (
                    <Iconify
                        icon="carbon:task-complete"
                        height={30}
                        width={30}
                        position="absolute"
                        top={-8}
                        right={-2}
                    />
                ) : null}
            </Stack>
        </Tooltip>
    );
};

// ----------------------------------------------------------------------

const view = "timeGridWeek";

interface CalendarProps {
    onEventClick: (id: number) => void;
}

export default function Calendar({ onEventClick }: CalendarProps) {
    const calendarRef = useRef<FullCalendar>(null);

    const [date, setDate] = useState(new Date());

    const { appointments } = useGetAppointments();

    const events = useMemo(
        () =>
            Array.isArray(appointments)
                ? appointments.map(ICalendarEvent2EventSourceInput)
                : [],
        [appointments],
    );

    const handleClickDatePrev = () => {
        const calendarEl = calendarRef.current;
        if (calendarEl) {
            const calendarApi = calendarEl.getApi();
            calendarApi.prev();
            setDate(calendarApi.getDate());
        }
    };

    const handleClickDateNext = () => {
        const calendarEl = calendarRef.current;
        if (calendarEl) {
            const calendarApi = calendarEl.getApi();
            calendarApi.next();
            setDate(calendarApi.getDate());
        }
    };

    const handleEventClick = useCallback(
        (e: EventClickArg) => onEventClick(+e.event.id),
        [],
    );

    const theme = useTheme();

    return (
        <>
            <Head>
                <title> Calendar</title>
            </Head>

            <StyledCalendar
                sx={{
                    position: "relative",
                    my: 1,
                }}
            >
                <CalendarToolbar
                    position="absolute"
                    left={2}
                    top={2}
                    zIndex={10}
                    onNextDate={handleClickDateNext}
                    onPrevDate={handleClickDatePrev}
                />

                <FullCalendar
                    // ---
                    height="auto"
                    allDaySlot={false}
                    weekends={false}
                    editable={false}
                    droppable={false}
                    selectable
                    // ---
                    ref={calendarRef}
                    initialDate={date}
                    initialView={view}
                    dayMaxEventRows={3}
                    headerToolbar={false}
                    plugins={[
                        listPlugin,
                        dayGridPlugin,
                        timelinePlugin,
                        timeGridPlugin,
                        interactionPlugin,
                    ]}
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
                    slotMaxTime="21:00:00"
                />
            </StyledCalendar>
        </>
    );
}
