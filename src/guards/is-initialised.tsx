import { AuthConsumer } from "@/contexts/jwt-context";
import { ReactNode } from "react";
import { SplashScreen } from "@/components/splash-screen";

interface IsInitialisedGuardProps {
    children: ReactNode;
}

// Show Splash Screen until Auth Context has initialised
const IsInitialisedGuard = ({ children }: IsInitialisedGuardProps) => (
    <AuthConsumer>
        {(auth) => (!auth.isInitialized ? <SplashScreen /> : <>{children}</>)}
    </AuthConsumer>
);

export default IsInitialisedGuard;
