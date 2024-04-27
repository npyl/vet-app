import useAuth from "@/hooks/useAuth";
import { IAppointment } from "@/types/appointment";
import { useMemo } from "react";
import useSWR from "swr";

export const useGetAppointments = () => {
    const { user } = useAuth();

    const { data, isLoading, mutate } = useSWR<IAppointment[]>(
        user?.id ? `/api/vets/${user.id}/appointments` : null,
    );

    const appointments = useMemo(
        () => (Array.isArray(data) ? data : []),
        [data],
    );

    return { appointments, isLoading, mutate };
};
