import useAuth from "@/hooks/useAuth";
import { IMedication } from "@/types/medication";
import { useMemo } from "react";
import useSWR from "swr";
import MedicationItem from "../_shared/MedicationItem";
import SkeletonItem from "../_shared/Appointments/SkeletonItem";
import NoMedication from "./NoMedication";

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
        return (
            <>
                <SkeletonItem variant="VET" />
                <SkeletonItem variant="VET" />
                <SkeletonItem variant="VET" />
            </>
        );
    }

    if (!isLoading && medication.length === 0) {
        return <NoMedication />;
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
