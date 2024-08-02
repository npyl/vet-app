import useAuth from "@/hooks/useAuth";
import { IAppointment } from "@/types/appointment";
import { useMemo } from "react";
import useSWR from "swr";

const useGetAppointments = () => {
    const { user } = useAuth();

    // INFO: get future or today's appointments
    const { data, isLoading } = useSWR<IAppointment[]>(
        user?.type === "VET"
            ? `/api/vets/${user?.id}/appointments/today`
            : `/api/user/${user?.id}/appointments/future`,
    );

    const appointments = useMemo(
        () => (Array.isArray(data) ? data : []),
        [data],
    );

    return { appointments, isLoading };
};

export default useGetAppointments;
