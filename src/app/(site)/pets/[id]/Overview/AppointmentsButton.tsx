import Iconify from "@/components/iconify";
import getAppointmentsForPet from "./getAppointmentsForPet";
import { ReactNode } from "react";
import DialogButton from "@/components/Dialog/Button";

interface AppointmentsButtonProps {
    petId: number;
    vet: boolean;
    children: ReactNode;
}

const AppointmentsButton = async ({
    petId,
    vet,
    children,
}: AppointmentsButtonProps) => {
    const appointments = await getAppointmentsForPet(petId);

    return (
        <DialogButton
            disabled={vet}
            variant="outlined"
            label={`Appointments ${appointments.length}`}
            startIcon={<Iconify icon="tabler:sthetoscope" />}
        >
            {children}
        </DialogButton>
    );
};

export default AppointmentsButton;
