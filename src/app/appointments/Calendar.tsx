import FullCalendar from "@fullcalendar/react"; // EventInput, // EventDropArg, // DateSelectArg, // => request placed at the top
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import timelinePlugin from "@fullcalendar/timeline";
//
import { useState, useRef, useMemo } from "react";
// next
import Head from "next/head";
// @mui
import { Card, Container } from "@mui/material";

// sections
import { StyledCalendar, CalendarToolbar } from "@/components/Calendar";

import ICalendarEvent2EventSourceInput from "./constants";

// ----------------------------------------------------------------------

const view = "timeGridWeek";

export default function Events() {
    const calendarRef = useRef<FullCalendar>(null);

    const [date, setDate] = useState(new Date());

    const data: any[] = [];

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
                            // eventClick={handleSelectEvent}
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
