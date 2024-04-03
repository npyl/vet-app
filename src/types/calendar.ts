import { EventInput } from "@fullcalendar/common";

// ----------------------------------------------------------------------

export type ICalendarViewValue =
    | "dayGridMonth"
    | "timeGridWeek"
    | "timeGridDay"
    | "listWeek";

export type ICalendarEvent = {
    id?: number;
    title: string;
    description: string;
    color: string;
    startDate: string;
    endDate: string;
};

export type ICalendarState = {
    isLoading: boolean;
    error: Error | string | null;
    events: EventInput[];
    openModal: boolean;
    selectedEventId: string | null;
    selectedRange: {
        start: Date;
        end: Date;
    } | null;
};
