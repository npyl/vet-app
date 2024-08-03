"use client";
import { ReactNode } from "react";

// Mui & Theme
import { SettingsConsumer, SettingsProvider } from "@/contexts/settings";
import { createTheme } from "@/theme";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import { SessionProvider } from "next-auth/react";

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
                        <SessionProvider>{children}</SessionProvider>
                    </ThemeProvider>
                )}
            </SettingsConsumer>
        </SettingsProvider>
    </AppRouterCacheProvider>
);

export default Providers;
