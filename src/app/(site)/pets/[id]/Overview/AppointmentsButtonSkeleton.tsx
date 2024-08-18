import Iconify from "@/components/iconify";
import Button from "@mui/material/Button";
import Skeleton from "@mui/material/Skeleton";

const AppointmentsButtonSkeleton = () => (
    <Button
        variant="outlined"
        startIcon={<Iconify icon="tabler:sthetoscope" />}
    >
        Appointments
        <Skeleton
            sx={{
                width: "100px",
            }}
            animation="wave"
        />
    </Button>
);

export default AppointmentsButtonSkeleton;
