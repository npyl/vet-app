import Providers from "@/hooks/providers";
import type { Metadata } from "next";
import "./global.css";

import { AuthGuard } from "@/guards/is-authenticated";

export const metadata: Metadata = {
    title: "V0.93",
    description: "V0.93!",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body style={{ backgroundColor: "#F5F5F5" }}>
                <Providers>
                    <AuthGuard>{children}</AuthGuard>
                </Providers>
            </body>
        </html>
    );
}
