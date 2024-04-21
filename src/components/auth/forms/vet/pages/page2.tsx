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

        <RHFTextField label="Region" name="region" />
        <RHFTextField label="City" name="city" />
        <RHFTextField label="Neighbourhood" name="complex" />
        <RHFTextField label="Telephone" name="telephone" />
    </>
);

export default Page2;
