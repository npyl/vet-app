import useAuth from "@/hooks/useAuth";
import { IAppointment } from "@/types/appointment";
import Stack from "@mui/material/Stack";
import { useCallback, useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import useSWR from "swr";
import Content from "./Content";
import { IExaminationHistoryPOST } from "@/types/examination";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { CircularProgress, Typography } from "@mui/material";
import Dialog from "@/components/Dialog";
import { LoadingButton } from "@mui/lab";
import useApiContext from "@/contexts/api";

// ----------------------------------------------------------------

const Schema = yup.object<IExaminationHistoryPOST>().shape({
    date: yup.string().required(),

    findings: yup.string().notRequired(),
    diagnosis: yup.string().notRequired(),
    procedure: yup.string().notRequired(),
    therapy: yup.string().notRequired(),
    notes: yup.string().notRequired(),

    weight: yup.number().required(),
    apot_swmatos: yup.string().notRequired(),
    temperature: yup.number().required(),
    heartrate: yup.number().required(),
    CRT: yup.string().notRequired(),
    tummy: yup.string().notRequired(),
    thorax: yup.string().notRequired(),
    ears_eyes_mouth: yup.string().notRequired(),
    lymphNodes: yup.string().notRequired(),
    penis_vulva_breast: yup.string().notRequired(),
});

// ----------------------------------------------------------------

const useGetAppointment = (eventId: number) => {
    const { user } = useAuth();

    const { data, isLoading } = useSWR<IAppointment[]>(
        user?.id ? `/api/vets/${user.id}/appointments` : null,
    );

    const appointment = useMemo(
        () => data?.find(({ id }) => id === eventId),
        [data],
    );

    return { appointment, isLoading };
};

// ----------------------------------------------------------------

interface ExaminationDialogProps {
    eventId: number;
    open: boolean;
    onClose: VoidFunction;
}

const ExaminationDialog = ({ eventId, ...props }: ExaminationDialogProps) => {
    const { post } = useApiContext();

    const { appointment, isLoading } = useGetAppointment(eventId);

    const methods = useForm<IExaminationHistoryPOST>({
        resolver: yupResolver(Schema) as any,
        values: {
            date: appointment?.date || new Date().toISOString(),

            findings: "",
            diagnosis: "",
            procedure: "",
            therapy: "",
            notes: "",

            weight: -1,
            apot_swmatos: "",
            temperature: -1,
            heartrate: -1,
            CRT: "",
            tummy: "",
            thorax: "",
            ears_eyes_mouth: "",
            lymphNodes: "",
            penis_vulva_breast: "",
        },
    });

    const handleSubmit = useCallback(
        (d: IExaminationHistoryPOST) => {
            console.log("got: ", d);
            post(`/api/examination?appointmentId=${appointment?.id}`, {
                body: JSON.stringify(d),
            });
        },
        [appointment?.id],
    );

    console.log("errors: ", methods.formState.errors);

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
                            Save
                        </LoadingButton>
                    </>
                }
            />
        </FormProvider>
    );
};

export default ExaminationDialog;
