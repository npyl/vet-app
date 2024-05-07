import useAuth from "@/hooks/useAuth";
import { IAppointment } from "@/types/appointment";
import { useMemo } from "react";
import useSWR from "swr";

const useGetTodaysAppointments = () => {
    const { user } = useAuth();
    const { data, isLoading } = useSWR<IAppointment[]>(
        `/api/vets/${user?.id}/appointments/today`,
    );
    const appointments = useMemo(
        () => (Array.isArray(data) ? data : []),
        [data],
    );

    return { appointments, isLoading };
};

export default useGetTodaysAppointments;
