import OnlyVetGuard from "@/guards/is-vet";
import { ReactNode } from "react";

interface LayoutProps {
    children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => (
    // Prevent page from being accessed by a normal user
    <OnlyVetGuard>{children}</OnlyVetGuard>
);

export default Layout;
