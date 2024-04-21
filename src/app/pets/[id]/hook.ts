import { IAppointment } from "@/types/appointment";
import { IPet } from "@/types/pet";
import { useMemo } from "react";
import useSWR from "swr";

export const useAppointments = (id: number) => {
    const { data: appointmentsData, isLoading } = useSWR<IAppointment[]>(
        `/api/pets/${id}/appointments`,
    );

    const appointments = useMemo(
        () => (Array.isArray(appointmentsData) ? appointmentsData : []),
        [appointmentsData],
    );

    return { appointments, isLoading };
};

export const usePetById = (id: number) => {
    const { data: pet } = useSWR<IPet>(`/api/pets/${id}`);
    return { pet };
};
