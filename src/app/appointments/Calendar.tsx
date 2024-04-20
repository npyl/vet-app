"use client";

import FullCalendar from "@fullcalendar/react"; // EventInput, // EventDropArg, // DateSelectArg, // => request placed at the top
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import timelinePlugin from "@fullcalendar/timeline";
//
import { useState, useRef, useMemo, useCallback } from "react";
// next
import Head from "next/head";
// @mui
import { Card, Container } from "@mui/material";

// sections
import { StyledCalendar, CalendarToolbar } from "@/components/Calendar";

import ICalendarEvent2EventSourceInput from "./constants";
import useSWR from "swr";
import useAuth from "@/hooks/useAuth";
import { EventClickArg } from "@fullcalendar/common";
import { IAppointment } from "@/types/appointment";

// ----------------------------------------------------------------------

const view = "timeGridWeek";

interface CalendarProps {
    onEventClick: (id: number) => void;
}

export default function Calendar({ onEventClick }: CalendarProps) {
    const { user } = useAuth();

    const calendarRef = useRef<FullCalendar>(null);

    const [date, setDate] = useState(new Date());

    const { data } = useSWR<IAppointment[]>(
        user?.id ? `/api/vets/${user.id}/appointments` : null,
    );

    const events = useMemo(
        () => data?.map(ICalendarEvent2EventSourceInput) || [],
        [data],
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

    return (
        <>
            <Head>
                <title> Calendar</title>
            </Head>

            <Container>
                <Card
                    sx={{
                        my: 4,
                    }}
                >
                    <StyledCalendar>
                        <CalendarToolbar
                            onNextDate={handleClickDateNext}
                            onPrevDate={handleClickDatePrev}
                        />

                        <FullCalendar
                            weekends
                            editable
                            droppable
                            selectable
                            allDayMaintainDuration
                            eventResizableFromStart
                            events={events}
                            initialEvents={[]}
                            ref={calendarRef}
                            initialDate={date}
                            initialView={view}
                            dayMaxEventRows={3}
                            eventDisplay="block"
                            headerToolbar={false}
                            // select={handleSelectRange}
                            // eventDrop={handleDropEvent}
                            eventClick={handleEventClick as any}
                            eventResize={() => {}}
                            height={720}
                            plugins={[
                                listPlugin,
                                dayGridPlugin,
                                timelinePlugin,
                                timeGridPlugin,
                                interactionPlugin,
                            ]}
                        />
                    </StyledCalendar>
                </Card>
            </Container>
        </>
    );
}
