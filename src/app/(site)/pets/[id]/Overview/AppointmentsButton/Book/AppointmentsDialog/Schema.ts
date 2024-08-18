"use client";

import IBookAppointment from "@/types/book";
import * as yup from "yup";

const Schema = yup.object<IBookAppointment>().shape({
    vetId: yup.number().required(),
    petId: yup.number().required(),
    date: yup.string().required(),
    id: yup.number(),
});

export default Schema;
