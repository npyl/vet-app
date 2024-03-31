"use client";

import { ReactNode } from "react";

// Mui & Theme
import { SettingsConsumer, SettingsProvider } from "@/contexts/settings";
import IsInitialisedGuard from "@/guards/is-initialised";
import { createTheme } from "@/theme";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { ThemeProvider } from "@mui/material/styles";
// SWR
import { SWRProvider } from "./swr";
// AUTH
import { ApiProvider } from "@/contexts/api";
import { AuthProvider } from "@/contexts/jwt-context";
// DatePicker
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

interface ProvidersProps {
    children: ReactNode;
}

const Providers = ({ children }: ProvidersProps) => (
    // Material UI
    <AppRouterCacheProvider>
        {/* Theming */}
        <SettingsProvider>
            <SettingsConsumer>
                {() => (
                    <ThemeProvider
                        theme={createTheme({
                            mode: "light",
                        })}
                    >
                        {/* API */}
                        <ApiProvider>
                            {/* SWR */}
                            <SWRProvider>
                                {/* Authentication */}
                                <AuthProvider>
                                    {/* Authentication Loading Splash Screen */}
                                    <IsInitialisedGuard>
                                        <LocalizationProvider
                                            dateAdapter={AdapterDayjs}
                                        >
                                            {children}
                                        </LocalizationProvider>
                                    </IsInitialisedGuard>
                                </AuthProvider>
                            </SWRProvider>
                        </ApiProvider>
                    </ThemeProvider>
                )}
            </SettingsConsumer>
        </SettingsProvider>
    </AppRouterCacheProvider>
);

export default Providers;
