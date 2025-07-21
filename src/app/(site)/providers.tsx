"use client";

import { ApiProvider } from "@/contexts/api";
import { SWRProvider } from "@/providers/swr";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { PropsWithChildren } from "react";

const Providers: React.FC<PropsWithChildren> = ({ children }) => (
    <ApiProvider>
        {/* SWR */}
        <SWRProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                {children}
            </LocalizationProvider>
        </SWRProvider>
    </ApiProvider>
);

export default Providers;
