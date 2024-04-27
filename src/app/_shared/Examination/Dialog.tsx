import Stack from "@mui/material/Stack";
import { useCallback, useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import Content from "./Content";
import { IExaminationHistoryPOST } from "@/types/examination";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { CircularProgress, Typography } from "@mui/material";
import Dialog from "@/components/Dialog";
import { LoadingButton } from "@mui/lab";
import useApiContext from "@/contexts/api";
import { useGetAppointments } from "./hook";

// ----------------------------------------------------------------

const Schema = yup.object<IExaminationHistoryPOST>().shape({
    // required
    date: yup.string().required(),
    weight: yup.number().required(),
    temperature: yup.number().required(),
    heartrate: yup.number().required(),

    // non-required
    findings: yup.string().notRequired(),
    diagnosis: yup.string().notRequired(),
    procedure: yup.string().notRequired(),
    therapy: yup.string().notRequired(),
    notes: yup.string().notRequired(),
    apot_swmatos: yup.string().notRequired(),
    CRT: yup.string().notRequired(),
    tummy: yup.string().notRequired(),
    thorax: yup.string().notRequired(),
    ears_eyes_mouth: yup.string().notRequired(),
    lymphNodes: yup.string().notRequired(),
    penis_vulva_breast: yup.string().notRequired(),
});

// ----------------------------------------------------------------

const useGetAppointmentById = (eventId: number) => {
    const { appointments, isLoading } = useGetAppointments();

    const appointment = useMemo(
        () => appointments.find(({ id }) => id === eventId),
        [appointments],
    );

    return { appointment, isLoading };
};

// ----------------------------------------------------------------

interface ExaminationDialogProps {
    appointmentId: number;
    onMutate: VoidFunction;
    open: boolean;
    onClose: VoidFunction;
}

const ExaminationDialog = ({
    appointmentId,
    onMutate,
    ...props
}: ExaminationDialogProps) => {
    const { post, put } = useApiContext();

    const { appointment, isLoading } = useGetAppointmentById(appointmentId);
    const { examination } = appointment || {};

    const methods = useForm<IExaminationHistoryPOST>({
        resolver: yupResolver(Schema) as any,
        values: {
            date: appointment?.date || new Date().toISOString(),

            findings: examination?.findings || "",
            diagnosis: examination?.diagnosis || "",
            procedure: examination?.procedure || "",
            therapy: examination?.therapy || "",
            notes: examination?.notes || "",
            weight: examination?.weight ?? -1,
            apot_swmatos: examination?.apot_swmatos || "",
            temperature: examination?.temperature ?? -1,
            heartrate: examination?.heartrate ?? -1,
            CRT: examination?.CRT || "",
            tummy: examination?.tummy || "",
            thorax: examination?.thorax || "",
            ears_eyes_mouth: examination?.ears_eyes_mouth || "",
            lymphNodes: examination?.lymphNodes || "",
            penis_vulva_breast: examination?.penis_vulva_breast || "",
        },
    });

    const handleSubmit = useCallback(
        async (d: IExaminationHistoryPOST) => {
            if (examination) {
                // update
                await put(`/api/examination`, {
                    body: JSON.stringify({ ...d, id: examination?.id }),
                }).then(onMutate);
            } else {
                // create
                await post(
                    `/api/examination?appointmentId=${appointment?.id}`,
                    {
                        body: JSON.stringify(d),
                    },
                ).then(onMutate);
            }

            props.onClose();
        },
        [appointment?.id, examination],
    );

    if (isLoading) {
        return (
            <Stack mt={4} alignItems="center">
                <CircularProgress />
            </Stack>
        );
    }

    if (!appointment) {
        return null;
    }

    return (
        <FormProvider {...methods}>
            <Dialog
                {...props}
                // ...
                submit
                onSubmit={methods.handleSubmit(handleSubmit)}
                // ...
                maxWidth="lg"
                title={
                    <Stack spacing={1} alignItems="center">
                        <Typography variant="h6">{`${appointment?.pet?.name}'s Examination`}</Typography>
                        <Typography variant="subtitle1" color="text.secondary">
                            {new Date(appointment?.date).toDateString()}
                        </Typography>
                    </Stack>
                }
                content={<Content />}
                actions={
                    <>
                        <LoadingButton
                            type="submit"
                            variant="contained"
                            loading={methods.formState.isSubmitting}
                        >
                            {examination ? "Update" : "Save"}
                        </LoadingButton>
                    </>
                }
            />
        </FormProvider>
    );
};

export default ExaminationDialog;
