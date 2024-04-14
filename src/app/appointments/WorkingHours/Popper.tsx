import {
    IconButton,
    Stack,
    Typography,
    Popper as MuiPopper,
    PopperProps as MuiPopperProps,
    Paper,
    Skeleton,
} from "@mui/material";
import { useCallback, useState } from "react";
import { Close as CloseIcon } from "@mui/icons-material";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { IVetWorkingHoursPOST } from "@/types/workingHours";
import * as yup from "yup";
import useApiContext from "@/contexts/api";
import useAuth from "@/hooks/useAuth";
import useMutateTable from "@/hooks/useMutateTable";
import { LoadingButton } from "@mui/lab";
import toast, { Toaster } from "react-hot-toast";
import useWorkingHours from "./hook";
import CustomTimePicker from "./CustomTimePicker";

// -------------------------------------------------------------------------------

const Schema = yup.object<IVetWorkingHoursPOST>().shape({
    monday: yup
        .tuple([
            yup
                .number()
                .min(8, "must be more than / or 8")
                .max(22, "must be less than / or 22")
                .required(),
            yup.number().min(8).max(22).required(),
        ])
        .required(),
    tuesday: yup
        .tuple([
            yup
                .number()
                .min(8, "must be more than / or 8")
                .max(22, "must be less than / or 22")
                .required(),
            yup
                .number()
                .min(8, "must be more than / or 8")
                .max(22, "must be less than / or 22")
                .required(),
        ])
        .required(),
    wednesday: yup
        .tuple([
            yup
                .number()
                .min(8, "must be more than / or 8")
                .max(22, "must be less than / or 22")
                .required(),
            yup
                .number()
                .min(8, "must be more than / or 8")
                .max(22, "must be less than / or 22")
                .required(),
        ])
        .required(),
    thursday: yup
        .tuple([
            yup
                .number()
                .min(8, "must be more than / or 8")
                .max(22, "must be less than / or 22")
                .required(),
            yup
                .number()
                .min(8, "must be more than / or 8")
                .max(22, "must be less than / or 22")
                .required(),
        ])
        .required(),
    friday: yup
        .tuple([
            yup
                .number()
                .min(8, "must be more than / or 8")
                .max(22, "must be less than / or 22")
                .required(),
            yup
                .number()
                .min(8, "must be more than / or 8")
                .max(22, "must be less than / or 22")
                .required(),
        ])
        .required(),

    vetId: yup.number().required(),
});

// -------------------------------------------------------------------------------

interface PopperProps extends MuiPopperProps {
    onClose: VoidFunction;
}

const Popper = ({ onClose, ...props }: PopperProps) => {
    const { user } = useAuth();
    const { post, put } = useApiContext();
    const { mutateTable } = useMutateTable();

    // Get user working hours
    const { workingHours, isLoading: isGetLoading } = useWorkingHours();

    // --------------------------------------------------------------
    const [isMutating, setMutating] = useState(false);
    const mutate = useCallback(() => {
        mutateTable(`/api/vets/workingHours/${user?.id}`);
        toast.success("Successfully updated working hours!");
    }, [user?.id]);
    const stopLoading = useCallback(() => setMutating(false), []);
    // --------------------------------------------------------------

    const methods = useForm<IVetWorkingHoursPOST>({
        resolver: yupResolver(Schema),
        values: {
            // 9am-5pm
            monday: workingHours?.monday || [9, 17],
            tuesday: workingHours?.tuesday || [9, 17],
            wednesday: workingHours?.wednesday || [9, 17],
            thursday: workingHours?.thursday || [9, 17],
            friday: workingHours?.friday || [9, 17],

            vetId: user?.id ?? -1,
        },
    });

    const handleSubmit = useCallback(
        (d: IVetWorkingHoursPOST) => {
            setMutating(true);

            if (!workingHours) {
                // create
                post("/api/vets/workingHours", {
                    body: JSON.stringify(d),
                })
                    .then(mutate)
                    .finally(stopLoading);
            } else {
                // update
                put("/api/vets/workingHours", {
                    body: JSON.stringify({ ...d, id: workingHours.id }),
                })
                    .then(mutate)
                    .finally(stopLoading);
            }
        },
        [workingHours],
    );

    return (
        <MuiPopper
            sx={{
                zIndex: 100,
            }}
            keepMounted
            {...props}
        >
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(handleSubmit)}>
                    <Paper
                        sx={{
                            p: 2,
                            position: "relative",
                            border: "1px solid #ddd",
                            mt: 1,
                            mr: 3,
                        }}
                    >
                        <IconButton
                            onClick={onClose}
                            sx={{
                                position: "absolute",
                                top: 3,
                                right: 3,
                            }}
                        >
                            <CloseIcon />
                        </IconButton>

                        {isGetLoading ? (
                            <Stack spacing={1} width="150px">
                                <Skeleton height="30px" animation="pulse" />
                                <Skeleton height="30px" animation="pulse" />
                                <Skeleton height="30px" animation="pulse" />
                            </Stack>
                        ) : (
                            <>
                                <Typography variant="h6" mb={2}>
                                    {!workingHours
                                        ? "No working hours are set up yet!"
                                        : "These are your working hours! Do you want to update them?"}
                                </Typography>

                                <CustomTimePicker
                                    day="Monday"
                                    name1="monday.0"
                                    name2="monday.1"
                                />
                                <CustomTimePicker
                                    day="Tuesday"
                                    name1="tuesday.0"
                                    name2="tuesday.1"
                                />
                                <CustomTimePicker
                                    day="Wednesday"
                                    name1="wednesday.0"
                                    name2="wednesday.1"
                                />
                                <CustomTimePicker
                                    day="Thursday"
                                    name1="thursday.0"
                                    name2="thursday.1"
                                />
                                <CustomTimePicker
                                    day="Friday"
                                    name1="friday.0"
                                    name2="friday.1"
                                />

                                <Stack
                                    mt={2}
                                    width={1}
                                    justifyContent="flex-end"
                                    direction="row"
                                >
                                    <LoadingButton
                                        loading={isMutating}
                                        type="submit"
                                        variant="contained"
                                    >
                                        {workingHours ? "Update" : "Set"}
                                    </LoadingButton>
                                </Stack>
                            </>
                        )}
                    </Paper>

                    <Toaster />
                </form>
            </FormProvider>
        </MuiPopper>
    );
};

export default Popper;
