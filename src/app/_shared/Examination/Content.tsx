import { RHFOnlyNumbers, RHFTextField } from "@/components/hook-form";
import RHFMultilineTextField from "@/components/hook-form/RHFMultiline";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";

const Content = () => (
    <Grid container py={1} spacing={1}>
        <Grid item xs={6}>
            <Stack spacing={1} width="50%">
                <RHFOnlyNumbers label="Weight" name="weight" />
                <RHFOnlyNumbers label="Temperature" name="temperature" />
                <RHFOnlyNumbers label="Heart Rate" name="heartrate" />
            </Stack>
        </Grid>

        <Grid item xs={6}>
            <Stack spacing={1} direction="row">
                <RHFTextField label="C.R.T." name="CRT" />
                <RHFTextField label="Tummy" name="tummy" />
                <RHFTextField label="Thorax" name="thorax" />
            </Stack>

            <Stack spacing={1} direction="row" mt={1}>
                <RHFTextField
                    label="Ears / Eyes / Mouth"
                    name="ears_eyes_mouth"
                />
                <RHFTextField label="Lymph Nodes" name="lymphNodes" />
                <RHFTextField
                    label="Penis / Vulva / Breast"
                    name="penis_vulva_breast"
                />
            </Stack>
        </Grid>

        <Grid item xs={12}>
            <Stack gap={1} direction="row" flexWrap="wrap">
                <RHFMultilineTextField
                    multiline
                    rows={5}
                    label="Findings"
                    name="findings"
                />
                <RHFMultilineTextField
                    multiline
                    rows={5}
                    label="Diagnosis"
                    name="diagnosis"
                />
                <RHFMultilineTextField
                    multiline
                    rows={5}
                    label="Procedure"
                    name="procedure"
                />
            </Stack>
            <Stack gap={1} direction="row" flexWrap="wrap" mt={1}>
                <RHFMultilineTextField
                    multiline
                    rows={5}
                    label="Therapy"
                    name="therapy"
                />
                <RHFMultilineTextField
                    multiline
                    rows={5}
                    label="Notes"
                    name="notes"
                />
            </Stack>
        </Grid>
    </Grid>
);

export default Content;
