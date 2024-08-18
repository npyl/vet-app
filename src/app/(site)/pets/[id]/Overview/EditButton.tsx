import DialogButton from "@/components/Dialog/Button";
import { ReactNode } from "react";

interface Props {
    vet: boolean;
    children: ReactNode;
}

const EditButton = ({ vet, children }: Props) => (
    <DialogButton label="Edit" disabled={!vet} variant="contained">
        {children}
    </DialogButton>
);

export default EditButton;
