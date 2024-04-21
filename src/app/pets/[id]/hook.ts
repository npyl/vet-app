import { IAppointment } from "@/types/appointment";
import { IExaminationHistory } from "@/types/examination";
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

export const useExaminations = (petId: number) => {
    const { data: examinations, isLoading } = useSWR<IExaminationHistory[]>(
        `/api/pets/${petId}/examinations`,
    );

    return { examinations, isLoading };
};
