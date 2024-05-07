import { IProduct } from "@/types/products";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import { alpha } from "@mui/material/styles";
import useSWR from "swr";

interface MedicineNameProps {
    id: number;
}

const MedicineName = ({ id }: MedicineNameProps) => {
    const { data: medicine, isLoading } = useSWR<IProduct>(`/api/stock/${id}`);

    if (isLoading) {
        return <Skeleton animation="wave" width={70} />;
    }

    return (
        <>
            <Typography
                p={1}
                bgcolor={(theme) => alpha(theme.palette.primary.main, 0.1)}
                color="primary.main"
                borderRadius="15px"
                sx={{
                    cursor: "pointer",
                }}
            >
                {medicine?.name}
            </Typography>
        </>
    );
};

export default MedicineName;
