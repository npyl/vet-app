"use client";

import { ReactNode } from "react";

// Mui & Theme
import { SettingsConsumer, SettingsProvider } from "@/contexts/settings";
import { createTheme } from "@/theme";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

interface ProvidersProps {
    session?: Session | null;
    children: ReactNode;
}

const Providers = ({ session, children }: ProvidersProps) => (
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
                        <SessionProvider session={session}>
                            {children}
                        </SessionProvider>
                    </ThemeProvider>
                )}
            </SettingsConsumer>
        </SettingsProvider>
    </AppRouterCacheProvider>
);

export default Providers;
