import Dialog from "@/components/Dialog";
import { RHFSelect } from "@/components/hook-form";
import useApiContext from "@/contexts/api";
import IBookAppointment from "@/types/book";
import IUser from "@/types/user";
import { yupResolver } from "@hookform/resolvers/yup";
import LoadingButton from "@mui/lab/LoadingButton";
import { MenuItem } from "@mui/material";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useCallback, useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import useSWR from "swr";
import * as yup from "yup";

const SelectVet = () => {
    const { data } = useSWR<IUser[]>("/api/vets");

    const vets = useMemo(
        () => (Array.isArray(data) && data.length > 0 ? data : []),
        [data],
    );

    return (
        <RHFSelect label="Available vets" name="vetId">
            {vets.map(({ email, id }, i) => (
                <MenuItem key={i} value={id}>
                    {email}
                </MenuItem>
            ))}
        </RHFSelect>
    );
};

const Schema = yup.object<IBookAppointment>().shape({
    vetId: yup.number().required(),
    petId: yup.number().required(),
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
                    <Stack mt={2} spacing={1} alignItems="center" width={1}>
                        <SelectVet />
                    </Stack>
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
