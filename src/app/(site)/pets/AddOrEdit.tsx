import Dialog from "@/components/Dialog";
import { IPet, IPetGender, IPetPOST, IPetType } from "@/types/pet";
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
} from "@/components/hook-form";
import Select from "@/components/hook-form/Select";
import useApiContext from "@/contexts/api";
import dayjs from "dayjs";
import { LoadingButton } from "@mui/lab";
import useAuth from "@/hooks/useAuth";
import {
    CAT_RACE_OPTIONS,
    DOG_RACE_OPTIONS,
    PET_TYPE_OPTIONS,
    DOG_BLOOD_OPTIONS,
    CAT_BLOOD_OPTIONS,
} from "@/types/options";

interface Props {
    open: boolean;
    onMutate: () => void;
    onClose: () => void;
    // ...
    pet?: IPet;
}

interface IPetPOSTYup extends Partial<IPetPOST> {
    name: string;
    photo: string;
    age: number;
    weight: number;
    gender: IPetGender;
    type: IPetType;
    race: string;
    color: string;
    blood_type: string;
    ownerId: number;
}

const Schema = yup
    .object<IPetPOSTYup>()
    .shape({
        name: yup.string().required(),
        photo: yup.string().required(),
        age: yup.number().required(),
        weight: yup.number().required(),
        gender: yup.string().oneOf<IPetGender>(["MALE", "FEMALE"]).required(),
        type: yup
            .string()
            .oneOf<IPetType>(["Cat", "Dog"])
            .required("Please enter type"),
        race: yup.string().required("Please enter race"),
        color: yup.string().required("Please enter pet color"),
        blood_type: yup.string().required("Please enter pet blood type"),
        ownerId: yup.number().required(),

        // INFO: Required if user has set microchip_date
        microchip_code: yup.string().when("microchip_date", {
            is: (value: any) => !!value,
            then: () => yup.string().required(),
        }),

        // birthday: yup.string().required(),
        // secondary_color: yup.string().required(),
        // microchip_date: yup.string().required(),
        // neutered: yup.boolean().required(),
        // dead: yup.boolean().required(),
        // passport: yup.boolean().required(),
        // notes: yup.string().required(),
        // therapy_notes: yup.string().required(),
    })
    .required();

const AddPetDialog = ({ pet, onMutate, ...props }: Props) => {
    const { user } = useAuth();
    const { post, put } = useApiContext();

    const [isLoading, setIsLoading] = useState(false);

    const methods = useForm<IPetPOSTYup>({
        resolver: yupResolver(Schema),
        values: {
            name: pet?.name || "",
            photo: pet?.photo || "",
            age: pet?.age ?? 0,
            weight: pet?.weight ?? 0,
            gender: pet?.gender || "MALE",
            type: pet?.type || "Dog",
            race: pet?.race || "",
            birthday: pet?.birthday ? dayjs(pet.birthday).toISOString() : "",
            color: pet?.color || "",
            secondary_color: pet?.secondary_color || "",
            microchip_date: pet?.microchip_date
                ? dayjs(pet.microchip_date).toISOString()
                : "",
            microchip_code: pet?.microchip_code || "",
            neutered: !!pet?.neutered,
            dead: !!pet?.dead,
            blood_type: pet?.blood_type || "",
            passport: !!pet?.passport,
            ownerId: -1,
        },
    });

    const [chipped, setChipped] = useState(!!pet?.microchip_date);

    const type = methods.watch("type") || "DOG";

    const handleMutate = useCallback(() => {
        onMutate();
        props.onClose();
    }, [user?.id]);

    const handleSubmit = useCallback(
        (d: IPetPOSTYup) => {
            console.log("d: ", d);

            if (pet) {
                // update
                setIsLoading(true);

                put("/api/pets", {
                    body: JSON.stringify({
                        ...d,
                        ownerId: pet?.owner?.id,
                        id: pet?.id,
                    }),
                })
                    .then(handleMutate)
                    .finally(() => setIsLoading(false));
            } else {
                setIsLoading(true);

                // create
                post("/api/pets", {
                    body: JSON.stringify({ ...d, ownerId: user?.id }),
                })
                    .then(handleMutate)
                    .finally(() => setIsLoading(false));
            }
        },
        [pet?.owner?.id, user?.id],
    );

    return (
        <FormProvider {...methods}>
            <Dialog
                {...props}
                // ...
                submit
                onSubmit={methods.handleSubmit(handleSubmit)}
                // ...
                maxWidth="sm"
                title={
                    <Typography variant="h6">
                        {pet ? `Edit ${pet.name}` : "Add Pet"}
                    </Typography>
                }
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

                            <Select
                                sx={{
                                    width: "120px",
                                }}
                                fullWidth
                                label="Type"
                                name="type"
                                options={PET_TYPE_OPTIONS}
                            />

                            <Select
                                sx={{
                                    width: "120px",
                                }}
                                label="Race"
                                name="race"
                                options={
                                    type === "Dog"
                                        ? DOG_RACE_OPTIONS
                                        : CAT_RACE_OPTIONS
                                }
                            />

                            <Select
                                sx={{
                                    width: "120px",
                                }}
                                label="Blood Type"
                                name="blood_type"
                                options={
                                    type === "Dog"
                                        ? DOG_BLOOD_OPTIONS
                                        : CAT_BLOOD_OPTIONS
                                }
                            />
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

                        <Stack>
                            <RHFDatePicker label="Birthday" name="birthday" />
                        </Stack>

                        <Box width={1} borderBottom="1px solid #ddd" />

                        <Stack width={1}>
                            <RHFCheckbox label="Passport" name="passport" />
                        </Stack>

                        <Stack
                            direction="row"
                            spacing={1}
                            flexGrow={1}
                            alignItems="flex-end"
                        >
                            <FormControlLabel
                                control={<Checkbox />}
                                label="Chipped"
                                checked={chipped}
                                onChange={(e, b) => setChipped(b)}
                            />

                            {chipped ? (
                                <>
                                    <RHFDatePicker
                                        label="Microchip Date"
                                        name="microchip_date"
                                    />

                                    <RHFTextField
                                        fullWidth
                                        label="Chip Code"
                                        name="microchip_code"
                                    />
                                </>
                            ) : null}
                        </Stack>

                        <Stack direction="row" spacing={1} width={1}>
                            <RHFCheckbox label="Neutered" name="neutered" />
                            <RHFCheckbox label="Dead" name="dead" />
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
