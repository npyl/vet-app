import { IAppointment } from "./appointment";

export interface IExaminationHistory {
    id: number;

    date: string;

    findings: string;
    diagnosis: string;
    procedure: string;
    therapy: string;
    notes: string;

    weight: number;
    apot_swmatos: string;
    temperature: number;
    heartrate: number;
    CRT: string; // χρώμα βλεννογόνου / C.R.T.
    tummy: string; // ψιλάφηση κοιλιάς
    thorax: string;
    ears_eyes_mouth: string;
    lymphNodes: string;
    penis_vulva_breast: string;

    appointment: IAppointment;
}

export interface IExaminationHistoryPOST
    extends Omit<IExaminationHistory, "id" | "appointment"> {
    id?: number;
}
