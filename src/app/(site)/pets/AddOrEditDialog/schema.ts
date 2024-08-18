"use client";

import { IPetGender, IPetPOST, IPetType } from "@/types/pet";
import * as yup from "yup";

const Schema = yup
    .object<IPetPOST>()
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

export default Schema;
