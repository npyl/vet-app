import { Suspense } from "react";
import AppointmentsButtonSkeleton from "./Skeleton";
import Actual from "./actual";

interface Props {
    petId: number;
    vet: boolean;
}

const AppointmentsButton = ({ petId, vet }: Props) => (
    <Suspense fallback={<AppointmentsButtonSkeleton />}>
        <Actual petId={petId} vet={vet} />
    </Suspense>
);

export default AppointmentsButton;
