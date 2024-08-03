import { PropsWithChildren } from "react";
import handleSubmit from "./handleSubmit";
import ErrorAlert from "./ErrorAlert";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";

const Form: React.FC<PropsWithChildren> = ({ children }) => (
    <ErrorBoundary errorComponent={ErrorAlert}>
        <form action={handleSubmit}>{children}</form>
    </ErrorBoundary>
);

export default Form;
