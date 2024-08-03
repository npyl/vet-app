"use client";

import React, { PropsWithChildren } from "react";
import Providers from "./providers";

const Layout: React.FC<PropsWithChildren> = ({ children }) => (
    <Providers>{children}</Providers>
);

export default Layout;
