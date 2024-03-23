import { IEmployee } from "./employees";
import { IProject } from "./projects";

export type IClientAccountGeneral = {
    id: string;
    avatarUrl: string;
    name: string;
    phoneNumber: string;
    assignedEmployees: IEmployee[];
    timeline: string;
    businessEmail: string;
    contractDetails: string; // URL to contract details
    billingHistory: string; // URL to billing history
    projects: IProject[]; // URL to projects
    pendingPayments: string; // 'NIL' or other value
    website: string;
};

export type IClientAccountGeneralPOST = Omit<
    IClientAccountGeneral,
    "id" | "assignedEmployees"
> & {
    id?: string;
    assignedEmployees: number[]; // ids
};
