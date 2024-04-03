import { ICalendarEvent } from "@/types/calendar";

const ICalendarEvent2EventSourceInput = ({
    id,
    color,
    description,
    startDate,
    endDate,
    title,
}: ICalendarEvent) => ({
    id: `${id}`,
    color,
    description,
    start: startDate,
    end: endDate,
    title,
});

export default ICalendarEvent2EventSourceInput;
