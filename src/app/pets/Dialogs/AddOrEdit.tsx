import Dialog from "@/components/Dialog";
import { IPet, IPetGender, IPetPOST } from "@/types/pet";
import {
    Box,
    Checkbox,
    FormControlLabel,
    MenuItem,
    Stack,
    Typography,
} from "@mui/material";
import { useCallback, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
    RHFDatePicker,
    RHFTextField,
    RHFCheckbox,
    RHFUploadPhoto,
    RHFSelect,
    RHFMultiline,
} from "@/components/hook-form";
import useApiContext from "@/contexts/api";
import dayjs from "dayjs";
import useMutateTable from "@/hooks/useMutateTable";
import { LoadingButton } from "@mui/lab";

interface Props {
    open: boolean;
    onClose: () => void;
    // ...
    pet?: IPet;
}

const Schema = yup.object<IPetPOST>().shape({
    name: yup.string().required(),
    photo: yup.string().required(),
    age: yup.number().required(),
    weight: yup.number().required(),
    gender: yup.string().oneOf<IPetGender>(["MALE", "FEMALE"]).required(),
    type: yup.string().required(),
    race: yup.string().required(),
    birthday: yup.string().required(),
    color: yup.string().required(),
    secondary_color: yup.string().required(),
    microchip_date: yup.string().required(),
    neutered: yup.boolean().required(),
    dead: yup.boolean().required(),
    blood_type: yup.string().required(),
    passport: yup.boolean().required(),
    notes: yup.string().required(),
    therapy_notes: yup.string().required(),
});

const AddPetDialog = ({ pet, ...props }: Props) => {
    const { post, put } = useApiContext();
    const { mutateTable } = useMutateTable();

    const [isLoading, setIsLoading] = useState(false);

    const methods = useForm<IPetPOST>({
        resolver: yupResolver(Schema),
        values: {
            name: pet?.name || "",
            photo: pet?.photo || "",
            age: pet?.age ?? 0,
            weight: pet?.weight ?? 0,
            gender: pet?.gender || "MALE",
            type: pet?.type || "",
            race: pet?.race || "",
            birthday: pet?.birthday ? dayjs(pet.birthday).toISOString() : "",
            color: pet?.color || "",
            secondary_color: pet?.secondary_color || "",
            microchip_date: pet?.microchip_date
                ? dayjs(pet.microchip_date).toISOString()
                : "",
            neutered: !!pet?.neutered,
            dead: !!pet?.dead,
            blood_type: pet?.blood_type || "",
            passport: !!pet?.passport,
            notes: pet?.notes || "",
            therapy_notes: pet?.therapy_notes || "",
        },
    });

    const [chipped, setChipped] = useState(false);

    const mutate = useCallback(() => {
        mutateTable("/api/pets");
        props.onClose();
    }, []);

    const handleSubmit = useCallback((d: IPetPOST) => {
        console.log("got: ", d);

        if (pet) {
            // update
            setIsLoading(true);

            put("/api/pets", {
                body: JSON.stringify({ ...d, id: pet?.id }),
            })
                .then(mutate)
                .finally(() => setIsLoading(false));
        } else {
            setIsLoading(true);

            // create
            post("/api/pets", {
                body: JSON.stringify(d),
            })
                .then(mutate)
                .finally(() => setIsLoading(false));
        }
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
                title={<Typography variant="h6">Add Pet</Typography>}
                content={
                    <Stack mt={2} spacing={1} alignItems="center" width={1}>
                        <RHFUploadPhoto name="photo" />

                        <Stack direction="row" spacing={1}>
                            <RHFTextField label="Name" name="name" />
                            <RHFTextField label="Age" name="age" />
                            <RHFTextField label="Weight" name="weight" />
                        </Stack>

                        <Box width={1} borderBottom="1px solid #ddd" />

                        <Stack direction="row" spacing={1} width={1}>
                            <RHFSelect
                                sx={{
                                    width: "120px",
                                }}
                                label="Gender"
                                name="gender"
                            >
                                <MenuItem value="FEMALE">Female</MenuItem>
                                <MenuItem value="MALE">Male</MenuItem>
                            </RHFSelect>
                            <RHFSelect
                                sx={{
                                    width: "120px",
                                }}
                                fullWidth
                                label="Type"
                                name="type"
                            >
                                <MenuItem value="CAT">Cat</MenuItem>
                                <MenuItem value="DOG">Dog</MenuItem>
                            </RHFSelect>
                            <RHFSelect
                                sx={{
                                    width: "120px",
                                }}
                                fullWidth
                                label="Race"
                                name="race"
                            >
                                <MenuItem value="CAT">Half-Bred</MenuItem>
                                <MenuItem value="DOG">Wtvr</MenuItem>
                            </RHFSelect>
                            <RHFSelect
                                sx={{
                                    width: "120px",
                                }}
                                label="Blood Type"
                                name="blood_type"
                            >
                                <MenuItem value="CAT">Cat</MenuItem>
                                <MenuItem value="DOG">Dog</MenuItem>
                            </RHFSelect>
                        </Stack>

                        <Stack direction="row" spacing={1} width={1}>
                            <RHFTextField
                                fullWidth
                                label="Color"
                                name="color"
                            />
                            <RHFTextField
                                fullWidth
                                label="Second Color"
                                name="secondary_color"
                            />
                        </Stack>

                        {/* TODO: only number */}
                        <Stack width={1}>
                            <RHFDatePicker label="Birthday" name="birthday" />
                        </Stack>

                        <Box width={1} borderBottom="1px solid #ddd" />

                        <Stack spacing={1} width={1}>
                            <RHFCheckbox label="Passport" name="passport" />

                            <Stack
                                direction="row"
                                spacing={1}
                                flexGrow={1}
                                alignItems="flex-end"
                            >
                                <FormControlLabel
                                    control={<Checkbox />}
                                    label="Chipped"
                                    value={chipped}
                                    onChange={(e, b) => setChipped(b)}
                                />

                                {chipped ? (
                                    <RHFDatePicker
                                        label="Microchip Date"
                                        name="microchip_date"
                                    />
                                ) : null}
                            </Stack>
                        </Stack>

                        <Stack direction="row" spacing={1} width={1}>
                            <RHFCheckbox label="Neutered" name="neutered" />
                            <RHFCheckbox label="Dead" name="dead" />
                        </Stack>

                        <Box width={1} borderBottom="1px solid #ddd" />

                        <Stack width={1} spacing={1}>
                            <RHFMultiline
                                label="Notes"
                                name="notes"
                                multiline
                                rows={5}
                            />
                            <RHFMultiline
                                label="Therapy Notes"
                                name="therapy_notes"
                                multiline
                                rows={5}
                            />
                        </Stack>
                    </Stack>
                }
                actions={
                    <LoadingButton
                        type="submit"
                        variant="contained"
                        disabled={isLoading}
                        loading={isLoading}
                    >
                        {pet ? "Update" : "Add"}
                    </LoadingButton>
                }
            />
        </FormProvider>
    );
};

export default AddPetDialog;
