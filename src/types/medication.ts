import { IProduct } from "./products";

export type TMedicationFrequency = "3_TIMES_A_DAY" | "2_TIMES_A_DAY";

export interface IMedication {
    id: number;

    medicine: IProduct;

    duration: string;
    frequency: TMedicationFrequency;
    quantity: string;
}

export interface IMedicationPOST {
    id?: number;

    medicineId: number;

    duration: string;
    frequency: TMedicationFrequency;
    quantity: string;
}

export const Medication2MedicationPOST = ({
    medicine,
    ...m
}: IMedication): IMedicationPOST => ({
    ...m,
    medicineId: medicine.id,
});
