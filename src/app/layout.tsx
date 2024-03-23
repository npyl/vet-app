import Providers from "@/hooks/providers";
import type { Metadata } from "next";
import "./global.css";

import DashboardLayout from "@/components/NavigationBar";
import { AuthGuard } from "@/guards/is-authenticated";
import Login from "@/components/auth/login";

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
            <body
                style={{
                    minHeight: "100vh",
                }}
            >
                <Providers>
                    <AuthGuard alternative={<Login />}>
                        <DashboardLayout>{children}</DashboardLayout>
                    </AuthGuard>
                </Providers>
            </body>
        </html>
    );
}
