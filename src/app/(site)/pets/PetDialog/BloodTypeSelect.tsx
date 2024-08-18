"use client";

import Select from "@/components/hook-form/Select";
import { CAT_BLOOD_OPTIONS, DOG_BLOOD_OPTIONS } from "@/types/options";
import { useFormContext } from "react-hook-form";

const BloodTypeSelect = () => {
    const { watch } = useFormContext();

    const type = watch("type") || "DOG";

    return (
        <Select
            sx={{
                width: "120px",
            }}
            label="Blood Type"
            name="blood_type"
            options={type === "Dog" ? DOG_BLOOD_OPTIONS : CAT_BLOOD_OPTIONS}
        />
    );
};

export default BloodTypeSelect;
