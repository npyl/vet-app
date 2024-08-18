import { IPet, IPetPOST } from "@/types/pet";
import { Box, MenuItem, Stack, Typography } from "@mui/material";
import { FC } from "react";
import {
    RHFDatePicker,
    RHFTextField,
    RHFCheckbox,
    RHFUploadPhoto,
    RHFSelect,
} from "@/components/hook-form";
import Select from "@/components/hook-form/Select";
import { PET_TYPE_OPTIONS } from "@/types/options";
import { DialogFormProps } from "@/components/Dialog/types";
import DialogForm from "@/components/Dialog/Form";
import Schema from "./schema";
import RaceSelect from "./RaceSelect";
import BloodTypeSelect from "./BloodTypeSelect";
import MicrochipSelect from "./MicrochipSelect";
import dayjs from "dayjs";
import SubmitButton from "./SubmitButton";
import createOrUpdate from "@/app/actions/pet/createOrUpdate";

export interface PetDialogProps
    extends Omit<DialogFormProps, "schema" | "values" | "submitAction"> {
    pet?: IPet;
}

const getValues = (pet?: IPet): IPetPOST => ({
    id: pet?.id,
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
    ownerId: pet?.owner?.id || -1,
});

const AddPetDialog: FC<PetDialogProps> = ({ pet, ...props }) => {
    const values = getValues(pet);

    return (
        <DialogForm
            {...props}
            schema={Schema}
            values={values}
            submitAction={createOrUpdate}
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

                        <RaceSelect />

                        <BloodTypeSelect />
                    </Stack>

                    <Stack direction="row" spacing={1} width={1}>
                        <RHFTextField fullWidth label="Color" name="color" />
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

                    <MicrochipSelect pet={pet} />

                    <Stack direction="row" spacing={1} width={1}>
                        <RHFCheckbox label="Neutered" name="neutered" />
                        <RHFCheckbox label="Dead" name="dead" />
                    </Stack>
                </Stack>
            }
            actions={<SubmitButton pet={pet} />}
        />
    );
};

export default AddPetDialog;
