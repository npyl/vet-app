import { IAppointment } from "@/types/appointment";

const IAppointmentToCalendarEvent = ({ id, date, pet }: IAppointment) => ({
    id: `${id}`,
    color: "primary.main",
    start: date,
    title: pet.name,

    // description: "example",
    // end: dayjs(date).minute(30),
});

export default IAppointmentToCalendarEvent;
