import Providers from "@/providers";
import type { Metadata } from "next";
import { PropsWithChildren } from "react";
import "./global.css";

export const metadata: Metadata = {
    title: "V0.94",
    description: "V0.94!",
};

const RootLayout: React.FC<PropsWithChildren> = async ({ children }) => (
    <html lang="en">
        <body style={{ backgroundColor: "#F5F5F5" }}>
            <Providers>{children}</Providers>
        </body>
    </html>
);

export default RootLayout;
