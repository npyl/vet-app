// Map

import { RHFTextField } from "@/components/hook-form";
import { Stack } from "@mui/material";
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
        <Stack direction="row" spacing={1}>
            <RHFTextField fullWidth label="Telephone" name="telephone" />
            <RHFTextField fullWidth label="AFM" name="afm" />
        </Stack>
    </>
);

export default Page2;
