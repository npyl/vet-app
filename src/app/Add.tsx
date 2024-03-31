import Dialog from "@/components/Dialog";
import { IPet, IPetGender, IPetPOST } from "@/types/pet";
import { Button, Typography } from "@mui/material";
import { useCallback } from "react";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
    RHFDatePicker,
    RHFTextField,
    RHFCheckbox,
} from "@/components/hook-form";

interface Props {
    open: boolean;
    onClose: () => void;
    // ...
    pet?: IPet;
}

const Schema = yup.object<IPetPOST>().shape({
    name: yup.string().required(),
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
    pet;

    const methods = useForm<IPetPOST>({
        resolver: yupResolver(Schema),
        values: {
            name: "",
            age: 0,
            weight: 0,
            gender: "MALE",
            type: "",
            race: "",
            birthday: "",
            color: "",
            secondary_color: "",
            microchip_date: "",
            neutered: false,
            dead: false,
            blood_type: "",
            passport: false,
            notes: "",
            therapy_notes: "",
        },
    });

    const handleSubmit = useCallback((d: IPetPOST) => {
        d;
    }, []);

    return (
        <FormProvider {...methods}>
            <Dialog
                {...props}
                title={<Typography variant="h6">Add Pet</Typography>}
                content={
                    <>
                        {/* RHFSelect: gender, type, race, blood_type
                         */}

                        <RHFTextField label="Name" name="name" />
                        <RHFTextField label="Color" name="color" />
                        <RHFTextField
                            label="Second Color"
                            name="secondary_color"
                        />
                        {/* TODO: only number */}
                        <RHFTextField label="Age" name="age" />
                        <RHFTextField label="Weight" name="weight" />
                        <RHFDatePicker label="Birthday" name="birthday" />
                        <RHFDatePicker
                            label="Microchip Date"
                            name="microchip_date"
                        />
                        <RHFCheckbox label="Neutered" name="neutered" />
                        <RHFCheckbox label="Dead" name="dead" />
                        <RHFCheckbox label="Passport" name="passport" />
                        <RHFTextField label="Notes" name="notes" />
                        <RHFTextField
                            label="Therapy Notes"
                            name="therapy_notes"
                        />
                    </>
                }
                actions={<Button variant="contained">Add</Button>}
                // ...
                submit
                onSubmit={methods.handleSubmit(handleSubmit)}
            />
        </FormProvider>
    );
};

export default AddPetDialog;
