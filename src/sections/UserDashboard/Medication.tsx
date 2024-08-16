import { IMedication } from "@/types/medication";
import { use } from "react";
import MedicationItem from "@/components/MedicationItem";
import NoMedication from "./NoMedication";

interface Props {
    data: Promise<IMedication[]>;
}

const Medication: React.FC<Props> = ({ data }) => {
    const medication = use(data);

    if (medication?.length === 0) {
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
