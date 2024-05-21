import useAuth from "@/hooks/useAuth";
import { IMedication } from "@/types/medication";
import { useMemo } from "react";
import useSWR from "swr";
import MedicationItem from "../_shared/MedicationItem";

const useCurrentMedication = () => {
    const { user } = useAuth();

    const { data, isLoading } = useSWR<IMedication[]>(
        user?.id ? `/api/user/${user.id}/medication` : null,
    );

    const medication = useMemo(() => (Array.isArray(data) ? data : []), [data]);

    return { medication, isLoading };
};

const Medication = () => {
    const { medication, isLoading } = useCurrentMedication();

    if (isLoading) {
        return null;
    }

    if (!isLoading && medication.length === 0) {
        return null;
    }

    return (
        <>
            {medication.map((m) => (
                <MedicationItem
                    key={m.id}
                    m={{ ...m, medicineId: m.medicine.id }}
                />
            ))}
        </>
    );
};

export default Medication;
