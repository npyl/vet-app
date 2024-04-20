import useAuth from "@/hooks/useAuth";
import { IVetWorkingHours } from "@/types/workingHours";
import useSWR from "swr";

const useWorkingHours = () => {
    const { user } = useAuth();

    // Get user working hours
    const { data: workingHours, isLoading } = useSWR<IVetWorkingHours>(
        `/api/vets/${user?.id}/workingHours`,
    );

    return { workingHours, isLoading };
};

export default useWorkingHours;
