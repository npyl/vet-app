import { IAppointment } from "@/types/appointment";

// see: https://fullcalendar.io/docs/event-object

const IAppointmentToCalendarEvent = ({ id, date, pet }: IAppointment) => ({
    id: `${id}`,
    start: date,
    title: pet.name,

    extendedProps: {
        avatar: pet.photo,
    },
});

export default IAppointmentToCalendarEvent;
