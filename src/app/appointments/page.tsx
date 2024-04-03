"use client";
import {
    IconButton,
    Stack,
    Typography,
    Popper as MuiPopper,
    PopperProps as MuiPopperProps,
    Paper,
    Button,
} from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { MouseEvent, useCallback, useMemo, useState } from "react";
import { Close as CloseIcon } from "@mui/icons-material";
import { SpaceBetween } from "@/components/styled";
import { TimePicker } from "@mui/x-date-pickers";
import {
    Controller,
    FormProvider,
    useForm,
    useFormContext,
} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import IVetWorkingHours from "@/types/workingHours";
import * as yup from "yup";
import dayjs from "dayjs";
import Calendar from "./Calendar";

// ----------------------------------------------

const minTime = dayjs().hour(8).minute(0); // 8 AM
const maxTime = dayjs().hour(22).minute(0); // 10 PM

interface CustomTimePickerProps {
    day: string;
    name1: string;
    name2: string;
}

const CustomTimePicker = ({ day, name1, name2 }: CustomTimePickerProps) => {
    const { control } = useFormContext();

    return (
        <SpaceBetween alignItems="center">
            <Typography mr={2}>{day}</Typography>
            <Stack direction="row" spacing={1} alignItems="center">
                <Controller
                    name={name1}
                    control={control}
                    render={({ field }) => (
                        <TimePicker
                            {...field}
                            // renderInput={(params) => <TextField {...params} />}
                            minutesStep={5}
                            minTime={minTime}
                            maxTime={maxTime}
                            value={field.value ? dayjs(field.value) : null}
                            onChange={(newValue) => {
                                field.onChange(newValue?.format());
                            }}
                        />
                    )}
                />
                <Typography variant="body2">to</Typography>
                <Controller
                    name={name2}
                    control={control}
                    render={({ field }) => (
                        <TimePicker
                            {...field}
                            // renderInput={(params) => <TextField {...params} />}
                            minutesStep={5}
                            minTime={minTime}
                            maxTime={maxTime}
                            value={field.value ? dayjs(field.value) : null}
                            onChange={(newValue) => {
                                field.onChange(newValue?.format());
                            }}
                        />
                    )}
                />
            </Stack>
        </SpaceBetween>
    );
};

// ----------------------------------------------

const Schema = yup.object<IVetWorkingHours>().shape({
    monday: yup
        .tuple([yup.number().required(), yup.number().required()])
        .required(),
    tuesday: yup
        .tuple([yup.number().required(), yup.number().required()])
        .required(),
    wednesday: yup
        .tuple([yup.number().required(), yup.number().required()])
        .required(),
    thursday: yup
        .tuple([yup.number().required(), yup.number().required()])
        .required(),
    friday: yup
        .tuple([yup.number().required(), yup.number().required()])
        .required(),
});

interface PopperProps extends MuiPopperProps {
    onClose: VoidFunction;
}

const Popper = ({ onClose, ...props }: PopperProps) => {
    const methods = useForm<IVetWorkingHours>({
        resolver: yupResolver(Schema),
        values: {
            // 9am-5pm
            monday: [9, 17],
            tuesday: [9, 17],
            wednesday: [9, 17],
            thursday: [9, 17],
            friday: [9, 17],
        },
    });

    const handleSubmit = useCallback((d: IVetWorkingHours) => {
        console.log("d: ", d);
    }, []);

    return (
        <MuiPopper {...props}>
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(handleSubmit)}>
                    <Paper sx={{ p: 2, position: "relative" }}>
                        <IconButton
                            onClick={onClose}
                            sx={{
                                position: "absolute",
                                top: 10,
                                right: 2,
                            }}
                        >
                            <CloseIcon />
                        </IconButton>

                        <Typography variant="h6" mt={5}>
                            Enter working ours of each day of the week
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
                            <Button type="submit" variant="contained">
                                Done
                            </Button>
                        </Stack>
                    </Paper>
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
            >
                <Typography>Working Ours</Typography>
                <IconButton onClick={openPopper}>
                    <CalendarTodayIcon />
                </IconButton>
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
