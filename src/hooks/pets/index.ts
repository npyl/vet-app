import { IExaminationHistory } from "@/types/examination";
import { useMemo } from "react";
import useSWR from "swr";

export const useExaminations = (petId: number) => {
    const { data, mutate, isLoading } = useSWR<IExaminationHistory[]>(
        `/api/pets/${petId}/examinations`,
    );

    const examinations = useMemo(
        () => (Array.isArray(data) ? data : []),
        [data],
    );

    return { examinations, isLoading, mutate };
};
