import { IAppointment } from "@/types/appointment";

// see: https://fullcalendar.io/docs/event-object

const IAppointmentToCalendarEvent = ({
    id,
    date,
    pet,
    examination,
}: IAppointment) => ({
    id: `${id}`,
    start: date,
    title: pet.name,

    extendedProps: {
        avatar: pet.photo,
        completed: !!examination,
        petId: pet.id,
    },
});

export default IAppointmentToCalendarEvent;
