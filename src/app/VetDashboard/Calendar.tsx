"use client";
import FullCalendar from "@fullcalendar/react"; // EventInput, // EventDropArg, // DateSelectArg, // => request placed at the top
import timeGridPlugin from "@fullcalendar/timegrid";
import { useState, useRef, useCallback } from "react";
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

    const [date, setDate] = useState(new Date());

    const events: any[] = [];

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
            <StyledCalendar
                sx={{
                    position: "relative",
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
