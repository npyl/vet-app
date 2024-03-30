import Providers from "@/hooks/providers";
import type { Metadata } from "next";
import "./global.css";

import DashboardLayout from "@/components/NavigationBar";
import { AuthGuard } from "@/guards/is-authenticated";
import AuthPage from "@/components/auth";

export const metadata: Metadata = {
    title: "Hello!",
    description: "Hello!",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>
                <Providers>
                    <AuthGuard alternative={<AuthPage />}>
                        <DashboardLayout>{children}</DashboardLayout>
                    </AuthGuard>
                </Providers>
            </body>
        </html>
    );
}
