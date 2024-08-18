"use client";

import Select from "@/components/hook-form/Select";
import { CAT_RACE_OPTIONS, DOG_RACE_OPTIONS } from "@/types/options";
import { useFormContext } from "react-hook-form";

const RaceSelect = () => {
    const { watch } = useFormContext();

    const type = watch("type") || "DOG";

    return (
        <Select
            sx={{
                width: "120px",
            }}
            label="Race"
            name="race"
            options={type === "Dog" ? DOG_RACE_OPTIONS : CAT_RACE_OPTIONS}
        />
    );
};

export default RaceSelect;
