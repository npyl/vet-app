"use client";

import {
    IconButton,
    Stack,
    Typography,
    Popper as MuiPopper,
    PopperProps as MuiPopperProps,
    Paper,
    Skeleton,
    Button,
} from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { MouseEvent, useCallback, useMemo, useState } from "react";
import { Close as CloseIcon } from "@mui/icons-material";
import { SpaceBetween } from "@/components/styled";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { IVetWorkingHours, IVetWorkingHoursPOST } from "@/types/workingHours";
import * as yup from "yup";
import Calendar from "./Calendar";
import { RHFOnlyNumbers } from "@/components/hook-form";
import useApiContext from "@/contexts/api";
import useSWR from "swr";
import useAuth from "@/hooks/useAuth";
import useMutateTable from "@/hooks/useMutateTable";
import { LoadingButton } from "@mui/lab";
import toast, { Toaster } from "react-hot-toast";

// ----------------------------------------------

interface CustomTimePickerProps {
    day: string;
    name1: string;
    name2: string;
}

const CustomTimePicker = ({ day, name1, name2 }: CustomTimePickerProps) => (
    <SpaceBetween alignItems="center">
        <Typography mr={2}>{day}</Typography>
        <Stack direction="row" spacing={1} alignItems="center">
            <RHFOnlyNumbers name={name1} />
            <Typography variant="body2">to</Typography>
            <RHFOnlyNumbers name={name2} />
        </Stack>
    </SpaceBetween>
);

// ----------------------------------------------

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

interface PopperProps extends MuiPopperProps {
    onClose: VoidFunction;
}

const Popper = ({ onClose, ...props }: PopperProps) => {
    const { user } = useAuth();
    const { post, put } = useApiContext();
    const { mutateTable } = useMutateTable();

    // Get user working hours
    const { data: workingHours, isLoading: isGetLoading } =
        useSWR<IVetWorkingHours>(`/api/vets/workingHours/${user?.id}`);

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

// -----------------------------------------------------------------------

const Appointments = () => {
    const [anchorEl, setAnchorEl] = useState<HTMLElement>();
    const isOpen = useMemo(() => Boolean(anchorEl), [anchorEl]);
    const openPopper = useCallback(
        (e: MouseEvent<HTMLElement>) => setAnchorEl(e.currentTarget),
        [],
    );
    const closePopper = useCallback(() => setAnchorEl(undefined), []);

    return (
        <>
            <Stack
                direction="row"
                alignItems="center"
                justifyContent="flex-end"
                spacing={1}
                mt={1}
            >
                <Button
                    variant="outlined"
                    endIcon={<CalendarTodayIcon />}
                    onClick={openPopper}
                >
                    Working Hours
                </Button>
            </Stack>

            <Calendar />

            {isOpen ? (
                <Popper
                    open={isOpen}
                    anchorEl={anchorEl}
                    onClose={closePopper}
                />
            ) : null}
        </>
    );
};

export default Appointments;
