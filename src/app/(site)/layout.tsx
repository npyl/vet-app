"use client";

import React, { PropsWithChildren } from "react";
import Providers from "./providers";
import DashboardLayout from "@/components/NavigationBar/DashboardLayout";

const Layout: React.FC<PropsWithChildren> = ({ children }) => (
    <Providers>
        <DashboardLayout>{children}</DashboardLayout>
    </Providers>
);

export default Layout;
