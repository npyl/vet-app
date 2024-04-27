// Map

import { RHFTextField } from "@/components/hook-form";
import Typography from "@mui/material/Typography";

const Page2 = () => (
    <>
        <Typography
            variant="h5"
            color="text.secondary"
            textAlign="center"
            mb={2}
        >
            Office
        </Typography>

        <RHFTextField fullWidth label="Region" name="region" />
        <RHFTextField fullWidth label="City" name="city" />
        <RHFTextField fullWidth label="Neighbourhood" name="complex" />
        <RHFTextField fullWidth label="Telephone" name="telephone" />
    </>
);

export default Page2;
