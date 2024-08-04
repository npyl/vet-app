import Providers from "@/app/providers";
import type { Metadata } from "next";
import { PropsWithChildren } from "react";
import { getServerSession } from "next-auth";
import "./global.css";

export const metadata: Metadata = {
    title: "V0.94",
    description: "V0.94!",
};

const RootLayout: React.FC<PropsWithChildren> = async ({ children }) => {
    const session = await getServerSession();

    return (
        <html lang="en">
            <body style={{ backgroundColor: "#F5F5F5" }}>
                <Providers session={session}>{children}</Providers>
            </body>
        </html>
    );
};

export default RootLayout;
