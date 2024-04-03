import Dialog from "@/components/Dialog";
import { RHFSelect } from "@/components/hook-form";
import { SpaceBetween } from "@/components/styled";
import useApiContext from "@/contexts/api";
import IBookAppointment from "@/types/book";
import IUser from "@/types/user";
import IVetWorkingHours from "@/types/workingHours";
import { yupResolver } from "@hookform/resolvers/yup";
import LoadingButton from "@mui/lab/LoadingButton";
import { MenuItem, Skeleton } from "@mui/material";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useCallback, useMemo } from "react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import useSWR from "swr";
import * as yup from "yup";

const SelectVet = () => {
    const { data, isLoading } = useSWR<IUser[]>("/api/vets");

    const vets = useMemo(
        () => (Array.isArray(data) && data.length > 0 ? data : []),
        [data],
    );

    return isLoading ? (
        <Skeleton width={100} height={50} animation="pulse" />
    ) : (
        <RHFSelect label="Available vets" name="vetId">
            {vets.map(({ email, id }, i) => (
                <MenuItem key={i} value={id}>
                    {email}
                </MenuItem>
            ))}
        </RHFSelect>
    );
};

const HourSelect = () => {
    const { watch } = useFormContext();

    const vetId = watch("vetId");

    const { data, isLoading } = useSWR<IVetWorkingHours>(
        vetId ? `/api/vets/workingHours/${vetId}` : null,
    );

    return isLoading ? (
        <Skeleton width={100} height={50} animation="pulse" />
    ) : (
        JSON.stringify(data)
    );
};

const Schema = yup.object<IBookAppointment>().shape({
    vetId: yup.number().required(),
    petId: yup.number().required(),
    date: yup.string().required(),
});

interface Props {
    open: boolean;
    onClose: VoidFunction;

    petId: number;
}

const BookDialog = ({ petId, ...props }: Props) => {
    const { post } = useApiContext();

    const methods = useForm<IBookAppointment>({
        resolver: yupResolver(Schema),
        values: {
            vetId: -1,
            petId,
            date: "",
        },
    });

    const handleSubmit = useCallback((d: IBookAppointment) => {
        console.log("d: ", d);

        post("/api/book", { body: JSON.stringify(d) });
    }, []);

    return (
        <FormProvider {...methods}>
            <Dialog
                {...props}
                // ...
                submit
                onSubmit={methods.handleSubmit(handleSubmit)}
                // ...
                maxWidth="sm"
                title={<Typography variant="h6">Book Appointment</Typography>}
                content={
                    <SpaceBetween
                        mt={2}
                        spacing={1}
                        alignItems="center"
                        width={1}
                    >
                        <SelectVet />
                        <HourSelect />
                    </SpaceBetween>
                }
                actions={
                    <LoadingButton
                        type="submit"
                        variant="contained"
                        disabled={false}
                        loading={false}
                    >
                        Book
                    </LoadingButton>
                }
            />
        </FormProvider>
    );
};

export default BookDialog;
