import DialogButton from "@/components/Dialog/Button";
import BookDialog from "./Book";
import Iconify from "@/components/iconify";
import getAppointmentsForPet from "./getAppointmentsForPet";

interface ActualProps {
    petId: number;
    vet: boolean;
}

const Actual = async ({ petId, vet }: ActualProps) => {
    const appointments = await getAppointmentsForPet(petId);

    return (
        <DialogButton
            disabled={vet}
            variant="outlined"
            label={`Appointments ${appointments.length}`}
            startIcon={<Iconify icon="tabler:sthetoscope" />}
        >
            <BookDialog petId={petId} />
        </DialogButton>
    );
};

export default Actual;
