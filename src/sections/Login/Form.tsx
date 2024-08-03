import { PropsWithChildren } from "react";
import handleSubmit from "./handleSubmit";

const Form: React.FC<PropsWithChildren> = ({ children }) => (
    <form action={handleSubmit}>{children}</form>
);

export default Form;
