import { PropsWithChildren } from "react";
import ErrorAlert from "./ErrorAlert";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import { signIn } from "@/Auth";

const Form: React.FC<PropsWithChildren> = ({ children }) => (
    <ErrorBoundary errorComponent={ErrorAlert}>
        <form
            action={async (formData) => {
                "use server";
                await signIn("credentials", formData);
            }}
        >
            {children}
        </form>
    </ErrorBoundary>
);

export default Form;
