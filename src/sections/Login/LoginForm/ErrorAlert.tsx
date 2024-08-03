"use client";

import { SoftAlert } from "@/components/styled";

const ErrorAlert: React.FC<any> = ({ error }) => (
    <SoftAlert severity="error">{error?.message || ""}</SoftAlert>
);

export default ErrorAlert;
